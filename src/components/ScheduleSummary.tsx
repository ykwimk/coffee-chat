import { useCoffeeChatContext } from './HomeContainer';

export default function ScheduleSummary() {
  const { selectedDate, selectedTime } = useCoffeeChatContext();

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">선택한 일정</h2>
      <ul className="mt-2 text-gray-600">
        <li className="mb-1">
          • 날짜: {selectedDate ? selectedDate.toLocaleDateString() : '-'}
        </li>
        <li>• 시간: {selectedTime || '-'}</li>
      </ul>
    </section>
  );
}
