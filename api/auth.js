export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  const { password } = req.body || {};
  const teamPassword = process.env.TEAM_PASSWORD || '';
  if (!teamPassword) {
    return res.status(500).json({ success: false, message: '서버에 비밀번호가 설정되지 않았습니다.' });
  }
  if (password && String(password).trim() === String(teamPassword).trim()) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
}
