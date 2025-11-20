import { useState } from 'react';
import { Navigation } from './Navigation';
import { Users, Calendar, Clock, DollarSign, Activity, Plus, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DoctorSchedule {
  id: string;
  name: string;
  department: string;
  room: string;
  isActive: boolean;
  currentPatient: string;
  queueLength: number;
  status: 'available' | 'busy' | 'break' | 'offline';
}

export function AdminDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([
    {
      id: '1',
      name: 'BS. Nguyễn Văn A',
      department: 'Tim Mạch',
      room: 'Phòng 203',
      isActive: true,
      currentPatient: 'A-10',
      queueLength: 5,
      status: 'busy',
    },
    {
      id: '2',
      name: 'BS. Trần Thị B',
      department: 'Tim Mạch',
      room: 'Phòng 204',
      isActive: true,
      currentPatient: 'A-15',
      queueLength: 3,
      status: 'busy',
    },
    {
      id: '3',
      name: 'BS. Lê Văn C',
      department: 'Tiêu Hóa',
      room: 'Phòng 301',
      isActive: false,
      currentPatient: '-',
      queueLength: 0,
      status: 'offline',
    },
    {
      id: '4',
      name: 'BS. Phạm Thị D',
      department: 'Tiêu Hóa',
      room: 'Phòng 302',
      isActive: true,
      currentPatient: 'B-08',
      queueLength: 7,
      status: 'busy',
    },
    {
      id: '5',
      name: 'BS. Hoàng Văn E',
      department: 'Chấn Thương Chỉnh Hình',
      room: 'Phòng 401',
      isActive: true,
      currentPatient: '-',
      queueLength: 2,
      status: 'available',
    },
  ]);

  const stats = [
    {
      title: 'Tổng Bệnh Nhân Hôm Nay',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: '#0077B6',
    },
    {
      title: 'Lịch Hẹn Đang Hoạt Động',
      value: '87',
      change: '+5',
      icon: Calendar,
      color: '#00B4D8',
    },
    {
      title: 'Thời Gian Chờ Trung Bình',
      value: '15 phút',
      change: '-23%',
      icon: Clock,
      color: '#0077B6',
    },
    {
      title: 'Doanh Thu Hôm Nay',
      value: '45.2 triệu',
      change: '+18%',
      icon: DollarSign,
      color: '#00B4D8',
    },
  ];

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id 
        ? { ...schedule, isActive: !schedule.isActive, status: !schedule.isActive ? 'available' : 'offline' }
        : schedule
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'break': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'offline': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Sẵn Sàng';
      case 'busy': return 'Bận';
      case 'break': return 'Nghỉ';
      case 'offline': return 'Ngoại Tuyến';
      default: return status;
    }
  };

  const filteredSchedules = selectedDepartment === 'all' 
    ? schedules 
    : schedules.filter(s => s.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Bảng Điều Khiển Quản Trị</h1>
            <p className="text-gray-600">Quản lý lịch bác sĩ và theo dõi tình trạng hàng đợi</p>
          </div>
          <Button className="bg-[#0077B6] hover:bg-[#005a8c] text-white px-6 py-3 rounded-xl">
            <Plus className="mr-2 w-5 h-5" />
            Thêm Lịch Bác Sĩ
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-none shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                      <p className="text-gray-900 text-3xl mb-1">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} từ hôm qua
                      </p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Department Filter */}
        <div className="mb-6">
          <Label className="mb-2 block">Lọc Theo Khoa</Label>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full md:w-64 rounded-xl">
              <SelectValue placeholder="Chọn khoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất Cả Các Khoa</SelectItem>
              <SelectItem value="Tim Mạch">Tim Mạch</SelectItem>
              <SelectItem value="Tiêu Hóa">Tiêu Hóa</SelectItem>
              <SelectItem value="Chấn Thương Chỉnh Hình">Chấn Thương Chỉnh Hình</SelectItem>
              <SelectItem value="Thần Kinh">Thần Kinh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Doctor Schedules */}
        <Card className="shadow-xl border-none rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#0077B6]" />
              Lịch Bác Sĩ & Quản Lý Hàng Đợi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-6 bg-[#F5F5F5] rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Doctor Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-gray-900 mb-1">{schedule.name}</h3>
                          <p className="text-gray-600">{schedule.department}</p>
                        </div>
                        <Badge className={`${getStatusColor(schedule.status)} border`}>
                          {getStatusText(schedule.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#0077B6] rounded-full"></div>
                          {schedule.room}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#00B4D8] rounded-full"></div>
                          Hiện tại: {schedule.currentPatient}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#0077B6] rounded-full"></div>
                          Hàng đợi: {schedule.queueLength} bệnh nhân
                        </div>
                      </div>
                    </div>

                    {/* Queue Status */}
                    <div className="flex items-center gap-4">
                      <div className="text-center p-4 bg-white rounded-xl min-w-[100px]">
                        <div className="text-gray-600 text-sm mb-1">Trong Hàng</div>
                        <div className="text-2xl text-[#0077B6]">{schedule.queueLength}</div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={schedule.isActive}
                            onCheckedChange={() => toggleSchedule(schedule.id)}
                          />
                          <Label className="text-sm text-gray-600">
                            {schedule.isActive ? 'Hoạt động' : 'Tắt'}
                          </Label>
                        </div>
                        
                        <Button
                          variant="outline"
                          className="rounded-xl border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6]/5"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Xem Hàng
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Patient Queue Preview */}
                  {schedule.isActive && schedule.queueLength > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="text-sm text-gray-600 mb-2">Bệnh nhân tiếp theo:</div>
                      <div className="flex gap-2 flex-wrap">
                        {Array.from({ length: Math.min(schedule.queueLength, 5) }).map((_, i) => (
                          <div
                            key={i}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              i === 0 
                                ? 'bg-[#0077B6] text-white' 
                                : 'bg-white text-gray-700 border border-gray-300'
                            }`}
                          >
                            {schedule.currentPatient.split('-')[0]}-{parseInt(schedule.currentPatient.split('-')[1]) + i + 1}
                          </div>
                        ))}
                        {schedule.queueLength > 5 && (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            +{schedule.queueLength - 5} thêm
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Activity */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-xl border-none rounded-2xl">
            <CardHeader>
              <CardTitle>Check-In Gần Đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { patient: 'Bệnh nhân A-17', department: 'Tim Mạch', time: '2 phút trước', status: 'success' },
                  { patient: 'Bệnh nhân B-12', department: 'Tiêu Hóa', time: '5 phút trước', status: 'success' },
                  { patient: 'Bệnh nhân C-08', department: 'Chấn Thương Chỉnh Hình', time: '8 phút trước', status: 'success' },
                  { patient: 'Bệnh nhân A-16', department: 'Tim Mạch', time: '12 phút trước', status: 'success' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-gray-900 text-sm">{activity.patient}</div>
                        <div className="text-gray-600 text-xs">{activity.department}</div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-none rounded-2xl">
            <CardHeader>
              <CardTitle>Tình Trạng Thanh Toán</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { patient: 'Bệnh nhân A-15', amount: '200,000 VNĐ', status: 'Đã thanh toán', color: 'green' },
                  { patient: 'Bệnh nhân B-11', amount: '200,000 VNĐ', status: 'Đã thanh toán', color: 'green' },
                  { patient: 'Bệnh nhân C-09', amount: '200,000 VNĐ', status: 'Đang chờ', color: 'yellow' },
                  { patient: 'Bệnh nhân A-14', amount: '200,000 VNĐ', status: 'Đã thanh toán', color: 'green' },
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-xl">
                    <div>
                      <div className="text-gray-900 text-sm">{payment.patient}</div>
                      <div className="text-gray-600 text-xs">{payment.amount}</div>
                    </div>
                    <Badge className={`${
                      payment.color === 'green' 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    } border`}>
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
