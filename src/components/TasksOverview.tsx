import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Users } from 'lucide-react';
import { useState } from 'react';

export function TasksOverview() {
  const navigate = useNavigate();
  const savedId = sessionStorage.getItem('patientId') || '';
  const [patientIdInput, setPatientIdInput] = useState(savedId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5]">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-gray-900 mb-4">Theo dõi hành trình khám</h1>
        <p className="text-gray-600 mb-6">Bạn chỉ có thể xem hành trình của chính mình. Nhập mã bệnh nhân của bạn hoặc dùng ID đã lưu.</p>

        <Card className="shadow-lg rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                value={patientIdInput}
                onChange={(e) => setPatientIdInput(e.target.value)}
                placeholder="Nhập ID bệnh nhân (vd: A-12)"
                className="col-span-2 rounded-xl p-3 border border-gray-300"
                aria-label="patient-id-input"
              />
              <div className="flex gap-2">
                <Button onClick={() => {
                  if (!patientIdInput.trim()) return;
                  // store as current patient session (only patient can set their own id)
                  sessionStorage.setItem('patientId', patientIdInput.trim());
                  navigate(`/tasks/${encodeURIComponent(patientIdInput.trim())}`);
                }} className="bg-[#0077B6] text-white rounded-xl">Xem hành trình</Button>
                <Button variant="outline" onClick={() => { sessionStorage.removeItem('patientId'); setPatientIdInput(''); }} className="rounded-xl">Đăng xuất ID</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Show only current patient's quick card if set */}
        {savedId && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0077B6] rounded-lg flex items-center justify-center text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-medium">Bệnh nhân</div>
                    <div className="text-sm text-gray-600">{savedId}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={() => navigate(`/tasks/${encodeURIComponent(savedId)}`)} className="w-full bg-[#0077B6] text-white rounded-xl">Xem hành trình của tôi</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}

export default TasksOverview;
