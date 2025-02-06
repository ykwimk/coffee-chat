import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormField from './FormField';
import { useCoffeeChatContext } from './HomeContainer';
import { sendGAEvent } from '@next/third-parties/google';

interface FormData {
  name: string;
  phone?: string;
  email: string;
  message?: string;
}

const initialFormData = { name: '', phone: '', email: '', message: '' };

export default function ContactForm() {
  const {
    selectedDate,
    selectedTime,
    errors,
    setSelectedDate,
    setSelectedTime,
    setErrors,
  } = useCoffeeChatContext();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    let { name, value } = e.target;

    if (name === 'phone') {
      value = value.replace(/[^0-9-]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validationForm = (): boolean => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      selectedDate: !!!selectedDate,
      selectedTime: !!!selectedTime,
    };

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.selectedDate ||
      newErrors.selectedTime
    ) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    sendGAEvent('event', '신청하기_버튼_클릭');

    const isValid = validationForm();

    if (!isValid) return;

    setIsLoading(true);

    try {
      const { name, phone, email, message } = formData;

      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          selectedDate: selectedDate?.toLocaleDateString(),
          selectedTime,
        }),
      });

      if (response.ok) {
        alert('신청이 완료되었습니다! 🎉');
        setFormData(initialFormData);
        setSelectedDate(undefined);
        setSelectedTime('');
      } else {
        alert('❌ 이메일 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">신청자 정보</h2>
      <FormField label="이름(회사명)" required>
        <Input
          type="text"
          className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름(회사명)을 입력하세요"
        />
      </FormField>
      <FormField label="전화번호">
        <Input
          type="tel"
          className="mt-1"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
        />
      </FormField>
      <FormField label="이메일" required>
        <Input
          type="email"
          className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
        />
      </FormField>
      <FormField label="하고 싶은 말">
        <Textarea
          className="mt-1 h-36 resize-none"
          value={formData.message}
          name="message"
          onChange={handleChange}
          placeholder="전달하고 싶은 내용을 간단하게 작성해주세요."
        />
      </FormField>
      <Button
        className="mt-4 w-full"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? '전송 중...' : '신청하기'}
      </Button>
      <p className="mt-2 text-xs text-gray-500">
        * 입력하신 개인정보는 저장되지 않으며, 신청 확인 메일 전송 후 즉시
        폐기됩니다.
      </p>
    </section>
  );
}
