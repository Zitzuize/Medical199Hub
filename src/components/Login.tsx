import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Shield, User, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Login() {
  const navigate = useNavigate();
  const [cccd, setCccd] = useState('');
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [sentCodeValue, setSentCodeValue] = useState('');
  const [errors, setErrors] = useState({ cccd: '', phone: '', smsCode: '' });

  const validateAndSend = () => {
    const newErrors = { cccd: '', phone: '', smsCode: '' };
    if (!/^[0-9A-Za-z-]{6,20}$/.test(cccd)) newErrors.cccd = 'Vui lòng nhập CCCD hợp lệ';
    if (!/^0\d{9}$/.test(phone)) newErrors.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    setErrors(newErrors);
    if (newErrors.cccd || newErrors.phone) return;

    // Mock sending SMS code (fixed demo code)
    const code = '170905';
    setSentCodeValue(code);
    setCodeSent(true);
    // In real app send code to phone here
    console.log('Demo SMS code set to:', code);
  };

  const verifyAndLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newErrors = { cccd: '', phone: '', smsCode: '' };
    if (!smsCode.trim()) newErrors.smsCode = 'Vui lòng nhập mã xác thực';
    if (smsCode !== sentCodeValue) newErrors.smsCode = 'Mã xác thực không đúng';
    setErrors(newErrors);
    if (newErrors.smsCode) return;

    // Mock successful login
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', cccd); // use cccd as username
    sessionStorage.setItem('cccd', cccd);
    sessionStorage.setItem('phone', phone);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-[#0077B6] to-[#00B4D8] rounded-3xl mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">199</span>
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">Đăng Nhập bằng CCCD</h1>
          <p className="text-gray-600">Nhập CCCD và số điện thoại để nhận mã xác thực</p>
        </div>

        <Card className="shadow-2xl border-none rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 justify-center">
              <LogIn className="w-6 h-6 text-[#0077B6]" />
              Đăng Nhập
            </CardTitle>
          </CardHeader>

          <CardContent>
            {!codeSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Số CMND/CCCD *</Label>
                  <Input
                    type="text"
                    placeholder="VD: 001234567890"
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value)}
                    className={`rounded-xl ${errors.cccd ? 'border-red-500' : ''}`}
                  />
                  {errors.cccd && <p className="text-red-500 text-sm">{errors.cccd}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Số Điện Thoại *</Label>
                  <Input
                    type="tel"
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <Button onClick={validateAndSend} className="w-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white py-4 rounded-xl">Gửi mã SMS</Button>
              </div>
            ) : (
              <form onSubmit={verifyAndLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nhập mã xác thực</Label>
                  <Input
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    placeholder="6 chữ số"
                    className={`rounded-xl ${errors.smsCode ? 'border-red-500' : ''}`}
                  />
                  {errors.smsCode && <p className="text-red-500 text-sm">{errors.smsCode}</p>}
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white py-4 rounded-xl">Xác thực và đăng nhập</Button>

                <div className="text-center text-sm text-gray-500">Mã gửi tới {phone}</div>
              </form>
            )}

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-[#0077B6] hover:underline">Đăng ký ngay</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-[#0077B6]/10 to-[#00B4D8]/10 border-[#0077B6]/20 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#0077B6] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Thông tin đăng nhập của bạn được mã hóa và bảo mật tuyệt đối.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
