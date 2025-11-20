import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from './Navigation';
import { MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface TestTask {
  id: string;
  name: string;
  type: string;
  department: string;
  room: string;
  avgMinutes: number;
  status: 'assigned' | 'arrived' | 'sampled' | 'waiting' | 'ready';
  remainingMs?: number;
}

export function TestChecklist() {
  const { patientId } = useParams<{ patientId?: string }>();
  const navigate = useNavigate();
  const [localId, setLocalId] = useState<string>(patientId || '');
  const [tasks, setTasks] = useState<TestTask[]>([]);
  const [activeTask, setActiveTask] = useState<TestTask | null>(null);
  const [showMapFor, setShowMapFor] = useState<string | null>(null);

  // Generate tasks scoped to patientId
  useEffect(() => {
    const id = patientId || localId;
    if (!id) return;

    const initial: TestTask[] = [
      { id: `${id}-t1`, name: 'Xét nghiệm máu toàn bộ', type: 'lab', department: 'Huyết học', room: 'Phòng XN-1', avgMinutes: 30, status: 'assigned' },
      { id: `${id}-t2`, name: 'Phân tích nước tiểu', type: 'lab', department: 'Vi sinh', room: 'Phòng XN-2', avgMinutes: 20, status: 'assigned' },
      { id: `${id}-t3`, name: 'X-Quang ngực', type: 'imaging', department: 'Chẩn đoán hình ảnh', room: 'Phòng XQ-1', avgMinutes: 45, status: 'assigned' },
    ];

    setTasks(initial);
  }, [patientId, localId]);

  // Timer to update waiting tasks
  useEffect(() => {
    const id = setInterval(() => {
      setTasks(prev =>
        prev.map(t => {
          if (t.status === 'waiting' && t.remainingMs && t.remainingMs > 0) {
            const next = { ...t, remainingMs: t.remainingMs - 1000 };
            if (next.remainingMs! <= 0) {
              next.status = 'ready';
              next.remainingMs = 0;
            }
            return next;
          }
          return t;
        })
      );
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const openMap = (task: TestTask) => {
    setActiveTask(task);
    setShowMapFor(task.id);
  };

  const closeMap = () => setShowMapFor(null);

  const handleArrived = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'arrived' } : t));
    const t = tasks.find(x => x.id === taskId) || null;
    if (t) openMap(t);
  };

  const handleSampled = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== taskId) return t;
        const accelerateFactorMsPerMinute = 5000; // demo: 1 minute = 5s
        const remainingMs = t.avgMinutes * accelerateFactorMsPerMinute;
        return { ...t, status: 'waiting', remainingMs };
      })
    );
    setShowMapFor(null);
  };

  const getStatusBadge = (t: TestTask) => {
    switch (t.status) {
      case 'assigned':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 border">Chưa đến</Badge>;
      case 'arrived':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 border">Đã đến</Badge>;
      case 'waiting': {
        const secs = t.remainingMs ? Math.ceil(t.remainingMs / 1000) : undefined;
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border">Đang chờ {secs ? `${secs}s` : ''}</Badge>
        );
      }
      case 'ready':
        return <Badge className="bg-green-100 text-green-700 border-green-200 border">Sẵn sàng</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 border">Không xác định</Badge>;
    }
  };

  if (!patientId && !localId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5]">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Card className="shadow-xl border-none rounded-2xl p-6 text-center">
            <CardTitle>
              Nhập ID bệnh nhân để xem danh sách xét nghiệm
            </CardTitle>
            <CardContent>
              <div className="space-y-4">
                <input
                  value={localId}
                  onChange={(e) => setLocalId(e.target.value)}
                  placeholder="VD: A-12 hoặc 12345"
                  className="w-full rounded-xl p-3 border border-gray-300"
                />
                <div className="flex gap-3">
                  <Button onClick={() => { if (localId.trim()) navigate(`/tasks/${localId.trim()}`); }} className="flex-1 bg-[#0077B6] text-white rounded-xl">Xem</Button>
                  <Button variant="outline" onClick={() => navigate('/')} className="flex-1 rounded-xl">Về Trang Chủ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5]">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-gray-900 mb-2">Danh Sách Xét Nghiệm - Bệnh nhân: {patientId || localId}</h1>
        <p className="text-gray-600 mb-6">Các xét nghiệm theo đơn của bác sĩ. Mỗi task gắn với ID bệnh nhân.</p>

        <Card className="shadow-lg border-none rounded-2xl mb-6">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F5F5F5]">
                  <tr>
                    <th className="p-4">Xét nghiệm</th>
                    <th className="p-4">Khoa / Phòng</th>
                    <th className="p-4">Thời gian trung bình</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(t => (
                    <tr key={t.id} className="border-t">
                      <td className="p-4">{t.name}</td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">{t.department}</div>
                        <div className="text-xs text-gray-400 mt-1">{t.room}</div>
                      </td>
                      <td className="p-4">{t.avgMinutes} phút (tb)</td>
                      <td className="p-4">{getStatusBadge(t)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button onClick={() => openMap(t)} variant="outline" className="rounded-xl"> <MapPin className="w-4 h-4 mr-2" /> Chỉ đường</Button>

                          {t.status === 'assigned' && (
                            <Button onClick={() => handleArrived(t.id)} className="bg-[#0077B6] text-white rounded-xl">Đã Đến</Button>
                          )}

                          {(t.status === 'arrived' || t.status === 'assigned') && (
                            <Button onClick={() => handleSampled(t.id)} className="bg-[#00B4D8] text-white rounded-xl">Lấy Mẫu</Button>
                          )}

                          {t.status === 'waiting' && (
                            <Button disabled variant="outline" className="rounded-xl"> <Clock className="w-4 h-4 mr-2" /> Đang chờ kết quả</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {showMapFor && activeTask && (
          <Card className="shadow-xl border-none rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="w-6 h-6 text-[#0077B6]" /> Chỉ đường tới {activeTask.room}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">BẢN ĐỒ ẢO / CHỈ ĐƯỜNG (thay bằng map thật sau)</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Phòng</div>
                    <div className="text-gray-900">{activeTask.room}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Khoa</div>
                    <div className="text-gray-900">{activeTask.department}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => { handleArrived(activeTask.id); }} className="bg-[#0077B6] text-white rounded-xl">Đã Đến</Button>
                    <Button onClick={() => { handleSampled(activeTask.id); }} className="bg-[#00B4D8] text-white rounded-xl">Lấy Mẫu</Button>
                    <Button variant="outline" onClick={closeMap} className="rounded-xl">Đóng</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default TestChecklist;
