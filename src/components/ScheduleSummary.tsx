import { useCoffeeChatContext } from './HomeContainer';

export default function ScheduleSummary() {
  const { selectedDate, selectedTime } = useCoffeeChatContext();

  const formatDateWithDay = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const formatTimeWithMeridiem = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">선택한 일정</h2>
      <ul className="mt-2 text-gray-600">
        <li className="mb-1">
          📅 날짜:{' '}
          {selectedDate ? (
            <span className="font-semibold underline">
              {formatDateWithDay(selectedDate)}
            </span>
          ) : (
            '-'
          )}
        </li>
        <li>
          🕒 시간:{' '}
          {selectedTime ? (
            <span className="font-semibold underline">
              {formatTimeWithMeridiem(selectedTime)}
            </span>
          ) : (
            '-'
          )}
        </li>
      </ul>
    </section>
  );
}
