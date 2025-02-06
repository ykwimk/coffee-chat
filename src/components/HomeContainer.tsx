'use client';

import { createContext, useContext, useState } from 'react';
import ScheduleSummary from '@/components/ScheduleSummary';
import CalendarSection from '@/components/CalendarSection';
import TimeSelectSection from '@/components/TimeSelectSection';
import ContactForm from '@/components/ContactForm';

interface RequiredValueType {
  name: boolean;
  email: boolean;
  selectedDate: boolean;
  selectedTime: boolean;
}

interface ContextType {
  selectedDate?: Date | undefined;
  selectedTime: string;
  errors: RequiredValueType;
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedTime: (time: string) => void;
  setErrors: (errors: RequiredValueType) => void;
}

const CoffeeChatContext = createContext<ContextType | undefined>(undefined);

export const useCoffeeChatContext = (): ContextType => {
  const context = useContext(CoffeeChatContext);
  if (!context) {
    throw new Error('useCoffeeChat must be used within a CoffeeChatProvider');
  }
  return context;
};

export default function HomeContainer() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [errors, setErrors] = useState<RequiredValueType>({
    name: false,
    email: false,
    selectedDate: false,
    selectedTime: false,
  });

  return (
    <CoffeeChatContext.Provider
      value={{
        selectedDate,
        selectedTime,
        errors,
        setSelectedDate,
        setSelectedTime,
        setErrors,
      }}
    >
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex w-full max-w-2xl items-start justify-center gap-3">
          <div className="w-full rounded-lg bg-white p-8 shadow">
            <CalendarSection />
            <TimeSelectSection />
          </div>
          <div className="w-full rounded-lg bg-white p-8 shadow">
            <ScheduleSummary />
            <ContactForm />
          </div>
        </div>
      </main>
    </CoffeeChatContext.Provider>
  );
}
