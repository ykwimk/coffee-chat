import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  const { name, phone, email, message, selectedDate, selectedTime } =
    await request.json();

  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `[커피챗 신청] ${name}님의 신청`,
      text: `
        📅 신청 날짜: ${selectedDate}
        🕒 신청 시간: ${selectedTime}

        👤 이름: ${name}
        📧 이메일: ${email}
        📞 전화번호: ${phone || '입력되지 않음'}

        📝 하고 싶은 말:
        ${message || '없음'}
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    return NextResponse.json({
      success: '이메일이 성공적으로 전송되었습니다!',
    });
  } catch (error) {
    console.error('메일 전송 오류:', error);
    return NextResponse.json({
      ok: false,
      error: '이메일 전송에 실패했습니다.',
    });
  }
}
