'use client';

import { useState } from 'react';
import ScheduleSummary from '@/components/ScheduleSummary';
import CalendarSection from '@/components/CalendarSection';
import TimeSelectSection from '@/components/TimeSelectSection';
import ContactForm from '@/components/ContactForm';

export default function HomeContainer() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-2xl items-start justify-center gap-3">
        <div className="w-full rounded-lg bg-white p-8 shadow">
          <CalendarSection
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <TimeSelectSection
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </div>
        <div className="w-full rounded-lg bg-white p-8 shadow">
          <ScheduleSummary
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
          <ContactForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      </div>
    </main>
  );
}
