import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { RoleSelection } from './components/RoleSelection';
import { AIDepartmentSuggestion } from './components/AIDepartmentSuggestion';
import { AppointmentBooking } from './components/AppointmentBooking';
import { CheckIn } from './components/CheckIn';
import { FeedbackRating } from './components/FeedbackRating';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { TestChecklist } from './components/TestChecklist';
import { TasksOverview } from './components/TasksOverview';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/ai-suggestion" element={<AIDepartmentSuggestion />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/tasks" element={<TasksOverview />} />
        <Route path="/tasks/:patientId" element={<TestChecklist />} />
        <Route path="/feedback" element={<FeedbackRating />} />
      </Routes>
    </Router>
  );
}