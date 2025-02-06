import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useCoffeeChatContext } from './HomeContainer';

export default function TimeSelectSection() {
  const { selectedTime, setSelectedTime } = useCoffeeChatContext();

  // 09:00 ~ 18:00까지 30분 간격 시간 목록
  const times = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">시간 선택</h2>
      <div className="mt-2">
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger className="w-full">
            {selectedTime ? selectedTime : '시간 선택'}
          </SelectTrigger>
          <SelectContent>
            {times.map((time) => (
              <SelectItem key={time} value={time} className="cursor-pointer">
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
