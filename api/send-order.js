const nodemailer = require('nodemailer');

const STORE_NAME = '도미노피자';
const SENDER_EMAIL = 'liszzmword@gmail.com';

function buildItemList(items) {
  if (!Array.isArray(items) || items.length === 0) return '(없음)';
  return items
    .map(
      (i) =>
        `  - ${i.재료명 || ''} (${i.규격 || ''}${i.단위 || '개'}): ${i.발주권장수량 ?? 0}${i.단위 || '개'}`
    )
    .join('\n');
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const password = process.env.GMAIL_APP_PASSWORD || '';
  if (!password) {
    return res.status(500).json({
      success: false,
      message: 'Gmail 앱 비밀번호가 설정되지 않았습니다. Vercel 환경변수에 GMAIL_APP_PASSWORD를 추가해주세요.',
    });
  }

  const { supplier_name, to_email, items } = req.body || {};
  const name = (supplier_name || '').trim();
  const to = (to_email || '').trim();

  if (!name || !to) {
    return res.status(400).json({
      success: false,
      message: '거래처명과 수신 이메일이 필요합니다.',
    });
  }

  const orderDate = new Date().toISOString().slice(0, 10);
  const subject = `[발주요청] ${STORE_NAME} / ${name} / ${orderDate}`;
  const itemList = buildItemList(items || []);
  const body = `안녕하세요 ${name} 담당자님.

${STORE_NAME}입니다.
아래 품목에 대해 발주 요청드립니다.

${itemList}

첨부한 발주서 확인 부탁드립니다.
감사합니다.
점포 운영매니저`;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: password,
      },
    });

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject,
      text: body,
    });

    return res.status(200).json({ success: true, message: '이메일이 발송되었습니다.' });
  } catch (err) {
    console.error('Send mail error:', err);
    const msg =
      err.response || err.message || '이메일 발송에 실패했습니다. Gmail 앱 비밀번호를 확인해주세요.';
    return res.status(500).json({ success: false, message: String(msg) });
  }
}
