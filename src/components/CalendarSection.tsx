import { Calendar } from '@/components/ui/calendar';
import { useCoffeeChatContext } from './HomeContainer';

export default function CalendarSection() {
  const { selectedDate, errors, setSelectedDate } = useCoffeeChatContext();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">날짜 선택</h2>
      <p className="mt-1 text-sm text-gray-500">
        오늘 이후 날짜만 선택할 수 있습니다.
      </p>
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
        disabled={{ before: tomorrow }}
        selected={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
      />
      {errors.selectedDate && (
        <p className="mt-1 text-sm text-red-500">날짜를 선택해주세요.</p>
      )}
    </section>
  );
}
