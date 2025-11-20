import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { QrCode, CheckCircle, Clock, MapPin, ArrowRight, Scan } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

export function CheckIn() {
  const navigate = useNavigate();
  const [qrInput, setQrInput] = useState('');
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [queueInfo] = useState({
    queueNumber: 'A-12',
    position: 3,
    estimatedWait: 15,
    department: 'Tim Mạch',
    doctor: 'BS. Nguyễn Văn A',
    room: 'Phòng 203',
  });

  const handleScan = () => {
    setCheckInStatus('scanning');
    
    // Simulate QR scanning
    setTimeout(() => {
      setCheckInStatus('success');
    }, 2000);
  };

  const handleManualCheckIn = () => {
    if (qrInput.trim()) {
      handleScan();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5]">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#0077B6]/10 rounded-2xl mb-4">
            <Scan className="w-10 h-10 text-[#0077B6]" />
          </div>
          <h1 className="text-gray-900 mb-2">Check-In Nhanh</h1>
          <p className="text-gray-600">Quét mã QR hoặc nhập mã đặt lịch của bạn</p>
        </div>

        {checkInStatus === 'idle' && (
          <>
            {/* QR Scanner Card */}
            <Card className="mb-6 shadow-xl border-none rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-[#0077B6]" />
                  Quét Mã QR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock QR Scanner */}
                <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 aspect-square max-w-md mx-auto relative overflow-hidden">
                  <div className="absolute inset-8 border-4 border-[#00B4D8] rounded-2xl"></div>
                  <div className="absolute inset-8 flex items-center justify-center">
                    <div className="w-full h-1 bg-[#00B4D8] animate-pulse"></div>
                  </div>
                  <QrCode className="w-32 h-32 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                <Button
                  onClick={handleScan}
                  className="w-full bg-[#0077B6] hover:bg-[#005a8c] text-white py-6 rounded-xl"
                >
                  <Scan className="mr-2 w-5 h-5" />
                  Bắt Đầu Quét Camera
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-gray-500">hoặc</span>
                  </div>
                </div>

                {/* Manual Input */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={qrInput}
                      onChange={(e) => setQrInput(e.target.value)}
                      placeholder="Nhập mã đặt lịch (vd: QR-123456789)"
                      className="flex-1 rounded-xl"
                      onKeyPress={(e) => e.key === 'Enter' && handleManualCheckIn()}
                    />
                    <Button
                      onClick={handleManualCheckIn}
                      disabled={!qrInput.trim()}
                      className="bg-[#00B4D8] hover:bg-[#0096b8] text-white px-6 rounded-xl"
                    >
                      Check In
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-gradient-to-r from-[#00B4D8]/10 to-[#0077B6]/10 border-[#0077B6]/20 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">Cách Check-In</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[#0077B6] flex-shrink-0">1.</span>
                    <span>Sử dụng camera để quét mã QR từ xác nhận đặt lịch của bạn</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#0077B6] flex-shrink-0">2.</span>
                    <span>Hoặc nhập thủ công mã đặt lịch nếu không thể quét</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#0077B6] flex-shrink-0">3.</span>
                    <span>Chờ xác nhận và tiến vào khoa của bạn</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </>
        )}

        {checkInStatus === 'scanning' && (
          <Card className="shadow-xl border-none rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-[#0077B6]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Scan className="w-12 h-12 text-[#0077B6]" />
              </div>
              <h2 className="text-gray-900 mb-2">Đang Xác Minh...</h2>
              <p className="text-gray-600">Vui lòng chờ trong khi chúng tôi xử lý check-in của bạn</p>
            </CardContent>
          </Card>
        )}

        {checkInStatus === 'success' && (
          <div className="space-y-6">
            {/* Success Message */}
            <Card className="shadow-xl border-none rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h2 className="mb-2">Check-In Thành Công!</h2>
                <p className="text-green-50">Chào mừng đến 199 Smart Health Hub</p>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Queue Information */}
                  <div className="bg-[#F5F5F5] rounded-2xl p-6">
                    <div className="text-center mb-4">
                      <div className="text-gray-600 mb-2">Số Thứ Tự Của Bạn</div>
                      <div className="text-5xl text-[#0077B6] mb-2">{queueInfo.queueNumber}</div>
                      <div className="text-gray-500">Vui lòng nhớ số này</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-white rounded-xl">
                        <div className="text-gray-600 text-sm mb-1">Vị Trí Trong Hàng</div>
                        <div className="text-2xl text-[#0077B6]">{queueInfo.position}</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl">
                        <div className="text-gray-600 text-sm mb-1">Thời Gian Chờ Dự Kiến</div>
                        <div className="text-2xl text-[#0077B6]">{queueInfo.estimatedWait} phút</div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl">
                      <div className="w-10 h-10 bg-[#0077B6]/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#0077B6]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-600 text-sm">Khoa</div>
                        <div className="text-gray-900">{queueInfo.department}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-xl">
                      <div className="w-10 h-10 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-[#00B4D8]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-600 text-sm">Bác Sĩ</div>
                        <div className="text-gray-900">{queueInfo.doctor}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#0077B6] to-[#00B4D8] rounded-xl text-white">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white/80 text-sm">Vị Trí</div>
                        <div className="text-white">{queueInfo.room} - Tầng 2</div>
                      </div>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-to-r from-[#00B4D8]/10 to-[#0077B6]/10 border-[#0077B6]/20 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-4">Các Bước Tiếp Theo</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#0077B6] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                      1
                    </div>
                    <span>Tiến đến <span className="text-[#0077B6]">{queueInfo.room}</span> ở tầng 2</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#0077B6] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                      2
                    </div>
                    <span>Chờ trong khu vực chỉ định cho đến khi số của bạn được gọi</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#0077B6] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                      3
                    </div>
                    <span>Bạn sẽ nhận được thông báo khi gần đến lượt của bạn</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons to view tasks/results */}
            <div className="flex gap-4">
              <Button onClick={() => navigate('/tasks')} className="flex-1 bg-[#0077B6] hover:bg-[#005a8c] text-white py-4 rounded-xl">
                Xem Danh Sách Xét Nghiệm
              </Button>
              <Button onClick={() => window.location.href = '#/results'} variant="outline" className="flex-1 rounded-xl border-[#0077B6] text-[#0077B6]">
                Xem Kết Quả
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
