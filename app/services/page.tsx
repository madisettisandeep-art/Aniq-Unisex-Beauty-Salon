import { salonDb } from '@/lib/db';
import { SERVICE_CATALOG } from '@/lib/data/service-catalog';
import { SalonService } from '@/lib/types/booking';
import { ServicesPageClient } from './ServicesPageClient';

export const revalidate = 60;

export default function ServicesPage() {
  let initialServices: SalonService[] = SERVICE_CATALOG;
  try {
    const dbServices = salonDb.getServices();
    if (dbServices && Array.isArray(dbServices) && dbServices.length > 0) {
      initialServices = dbServices;
    }
  } catch (error) {
    console.warn('Failed to load services from DB in ServicesPage, using catalog default', error);
  }

  return <ServicesPageClient initialServices={initialServices} />;
}
