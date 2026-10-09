import { salonDb } from '../lib/db';
import { generateBookingConfirmationWhatsAppUrl, buildWhatsAppUrl, WhatsAppTemplates } from '../lib/whatsapp';
import { Appointment } from '../lib/types/booking';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failCount++;
  }
}

async function runTests() {
  console.log('\n========================================');
  console.log('ANIQ SALON AUTOMATED QA TEST SUITE');
  console.log('========================================\n');

  // Test 1: Service Catalog & Price Integrity
  console.log('[Test Group 1: Service Catalog & Prices]');
  const services = salonDb.getServices();
  assert(services.length >= 40, 'Services catalog loaded with all categories', `Found ${services.length} items`);
  
  const haircut = services.find(s => s.id === 'g-02');
  assert(haircut?.price === 199, 'Any Hair Cut (Men) verified at ₹199', `Price: ${haircut?.price}`);

  const combo = services.find(s => s.id === 'g-04');
  assert(combo?.price === 249, 'Haircut & Trimming Combo verified at ₹249', `Price: ${combo?.price}`);

  const hydraFacial = services.find(s => s.id === 'f-15');
  assert(hydraFacial?.price === 3999, 'Special Hydra Facial verified at ₹3,999', `Price: ${hydraFacial?.price}`);

  const goldFacial = services.find(s => s.id === 'f-08');
  assert(goldFacial?.price === 1499, 'Gold Facial verified at ₹1,499', `Price: ${goldFacial?.price}`);

  // Test 2: Single Service Booking
  console.log('\n[Test Group 2: Single Service Booking]');
  const booking1 = salonDb.createAppointment({
    customerType: 'men',
    customerName: 'Rahul Verma',
    customerPhone: '+91 98765 43210',
    serviceIds: ['g-02'],
    masterId: 'master-01',
    appointmentDate: '2026-10-15',
    appointmentTime: '11:00'
  });

  assert('appointment' in booking1, 'Single service appointment created successfully');
  if ('appointment' in booking1) {
    assert(booking1.appointment.totalPrice === 199, 'Total price equals ₹199', `Got: ${booking1.appointment.totalPrice}`);
    assert(booking1.appointment.totalDurationMinutes === 30, 'Duration equals 30 mins', `Got: ${booking1.appointment.totalDurationMinutes}`);
    assert(booking1.appointment.status === 'PENDING_CONFIRMATION', 'Initial status is PENDING_CONFIRMATION');
    assert(booking1.appointment.bookingReference.startsWith('ANIQ-'), 'Reference code has ANIQ prefix');
  }

  // Test 3: Multiple Service Booking Calculation
  console.log('\n[Test Group 3: Multiple Service Booking Calculation]');
  const booking2 = salonDb.createAppointment({
    customerType: 'women',
    customerName: 'Meera Rao',
    customerPhone: '+91 98765 43211',
    serviceIds: ['f-08', 'm-03'], // Gold Facial (1499, 60m) + Crystal Manicure (699, 45m)
    masterId: 'master-02',
    appointmentDate: '2026-10-15',
    appointmentTime: '14:00'
  });

  assert('appointment' in booking2, 'Multiple services appointment created');
  if ('appointment' in booking2) {
    assert(booking2.appointment.totalPrice === 2198, 'Total price is exact sum (₹1499 + ₹699 = ₹2198)', `Got: ${booking2.appointment.totalPrice}`);
    assert(booking2.appointment.totalDurationMinutes === 105, 'Duration is exact sum (60m + 45m = 105m)', `Got: ${booking2.appointment.totalDurationMinutes}`);
  }

  // Test 4: Conflict Prevention (Same Master & Overlapping Slot)
  console.log('\n[Test Group 4: Conflict Prevention]');
  // Try booking master-01 at 11:15 when he is already booked 11:00-11:30
  const conflictBooking = salonDb.createAppointment({
    customerType: 'men',
    customerName: 'Imran Ali',
    customerPhone: '+91 98765 43212',
    serviceIds: ['g-02'], // 30 mins
    masterId: 'master-01',
    appointmentDate: '2026-10-15',
    appointmentTime: '11:15'
  });

  assert('error' in conflictBooking, 'Overlapping appointment was blocked by server conflict check');

  // Test 5: "No Preference" Master Assignment
  console.log('\n[Test Group 5: No-Preference Master Assignment]');
  const noPrefBooking = salonDb.createAppointment({
    customerType: 'men',
    customerName: 'Sanjay Gupta',
    customerPhone: '+91 98765 43213',
    serviceIds: ['g-03'],
    masterId: 'no-preference',
    appointmentDate: '2026-10-15',
    appointmentTime: '16:00'
  });

  assert('appointment' in noPrefBooking, 'No-preference booking succeeded');
  if ('appointment' in noPrefBooking) {
    assert(noPrefBooking.appointment.masterId !== 'no-preference', 'Eligible master automatically assigned');
  }

  // Test 6: WhatsApp Confirmation URL & Safe Encoding
  console.log('\n[Test Group 6: WhatsApp Click-to-Chat Generation]');
  if ('appointment' in booking1) {
    const waUrl = generateBookingConfirmationWhatsAppUrl(booking1.appointment);
    assert(waUrl.startsWith('https://wa.me/919912417109?text='), 'WhatsApp URL points to +91 99124 17109');
    assert(waUrl.includes(booking1.appointment.bookingReference), 'URL contains booking reference');
    assert(waUrl.includes('Rahul%20Verma') || waUrl.includes('Rahul+Verma'), 'Customer name is safely URL-encoded');
  }

  // Test 7: Booking Status Transitions
  console.log('\n[Test Group 7: Booking Status Transitions]');
  if ('appointment' in booking1) {
    const ref = booking1.appointment.bookingReference;
    const confirmed = salonDb.updateAppointmentStatus(ref, 'CONFIRMED', 'Customer confirmed slot via WhatsApp');
    assert(confirmed?.status === 'CONFIRMED', 'Status transitioned to CONFIRMED');

    const completed = salonDb.updateAppointmentStatus(ref, 'COMPLETED', 'Service finished at salon');
    assert(completed?.status === 'COMPLETED', 'Status transitioned to COMPLETED');
  }

  // Test 8: Rescheduling with Conflict Check
  console.log('\n[Test Group 8: Rescheduling]');
  if ('appointment' in booking2) {
    const ref = booking2.appointment.bookingReference;
    const res = salonDb.rescheduleAppointment(ref, '2026-10-16', '15:00');
    assert('appointment' in res && res.appointment.status === 'RESCHEDULED', 'Appointment rescheduled successfully');
  }

  // Summary
  console.log('\n========================================');
  console.log(`TOTAL TESTS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
  console.log('========================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests();

