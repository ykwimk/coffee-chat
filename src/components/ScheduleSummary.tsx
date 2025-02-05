import { Button } from '@/components/ui/button';

interface Props {
  selectedDate?: Date;
  selectedTime: string;
}

export default function ScheduleSummary({ selectedDate, selectedTime }: Props) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800">선택한 일정</h2>
      <ul className="mt-2 text-gray-600">
        <li className="mb-1">
          • 날짜: {selectedDate ? selectedDate.toLocaleDateString() : '-'}
        </li>
        <li>• 시간: {selectedTime || '-'}</li>
      </ul>
      <Button className="mt-4 w-full">신청하기</Button>
    </section>
  );
}
