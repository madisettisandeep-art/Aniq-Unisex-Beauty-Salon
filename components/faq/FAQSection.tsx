'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: 'How does appointment booking work at ANIQ Salon?',
    answer: 'You can book directly through our 7-step online scheduler by selecting your desired services, preferred master, and time slot. Once submitted, your appointment is generated with a unique reference code (e.g., ANIQ-26-XXXX) and can be confirmed instantly via WhatsApp with our reception desk.'
  },
  {
    question: 'Can I choose a specific master or stylist for my service?',
    answer: 'Yes! You can choose any of our resident masters (such as Sameer Khan for precision hair styling, Priya Sharma for facials, Karthik Reddy for hair colour, or Arjun V. for tattoos) or select "No Preference" to be assigned to the best available specialist.'
  },
  {
    question: 'What are your hygiene and sterilization protocols?',
    answer: 'Hygiene is our highest priority. All metal hair and facial instruments undergo medical autoclave sterilization between clients. We use fresh disposable aprons, sanitized salon capes, and single-use sealed tattoo needles.'
  },
  {
    question: 'What is your rescheduling and cancellation policy?',
    answer: 'We kindly request that any rescheduling or cancellation requests be made at least 2 hours prior to your scheduled slot. You can look up your appointment using your booking reference or message us directly on WhatsApp at +91 99124 17109.'
  },
  {
    question: 'How do tattoo consultations work?',
    answer: 'We offer dedicated 1-on-1 design consultations for tattoos. You can consult with our tattoo artist regarding size, placement, stencil designs, and aftercare. A consultation booking can be placed through the booking portal or via WhatsApp.'
  },
  {
    question: 'Are walk-ins accepted without an appointment?',
    answer: 'Walk-ins are always welcomed based on chair availability. However, we strongly recommend booking in advance, especially during weekends and evening hours (5:00 PM – 9:00 PM), to avoid waiting times.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-cream-50 border-t border-ivory-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
            Everything you need to know about our salon services, masters, and booking policies.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-cream-100/40 transition-colors"
                >
                  <h3 className="font-serif font-bold text-sm sm:text-base text-charcoal">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-ivory-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

