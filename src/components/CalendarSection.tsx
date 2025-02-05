import { Calendar } from '@/components/ui/calendar';

interface Props {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export default function CalendarSection({ selectedDate, onSelectDate }: Props) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">날짜 선택</h2>
      <Calendar
        className="flex h-full w-full"
        classNames={{
          months:
            'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
          month: 'space-y-4 w-full flex flex-col',
          table: 'w-full h-full border-collapse space-y-1',
          head_row: '',
          row: 'w-full mt-2',
        }}
        mode="single"
        selected={selectedDate}
        onSelect={(date) => onSelectDate(date)}
      />
    </section>
  );
}
