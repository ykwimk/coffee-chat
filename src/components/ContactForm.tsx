import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  selectedDate?: Date;
  selectedTime: string;
}

export default function ContactForm({ selectedDate, selectedTime }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">신청자 정보</h2>
      <div className="mt-4">
        <label className="text-sm text-gray-600">
          이름(회사명) <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          className="mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름(회사명)을 입력하세요"
        />
      </div>
      <div className="mt-4">
        <label className="text-sm text-gray-600">전화번호</label>
        <Input
          type="tel"
          className="mt-1"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-0000-0000"
        />
      </div>
      <div className="mt-4">
        <label className="text-sm text-gray-600">
          이메일 <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          className="mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
        />
      </div>
      <div className="mt-4">
        <label className="text-sm text-gray-600">하고 싶은 말</label>
        <Textarea
          className="mt-1 h-36 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="전달하고 싶은 내용을 간단하게 작성해주세요."
        />
      </div>
      <Button className="mt-4 w-full">신청하기</Button>
    </section>
  );
}
