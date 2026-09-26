import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PathScreen from './components/PathScreen';
import SyllabusPage from './components/SyllabusPage';
import Playground from './components/Playground';
import Exams from './components/Exams';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import VerifyCertificate from './components/VerifyCertificate';
import LessonScreen from './components/LessonScreen';

function App() {
  const location = useLocation();
  const isLessonMode = location.pathname.startsWith('/level/');

  if (isLessonMode) {
    return (
      <Routes>
        <Route path="/level/:id" element={<LessonScreen />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Desktop Left Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
          <Routes>
            <Route path="/" element={<PathScreen />} />
            <Route path="/learn" element={<PathScreen />} />
            <Route path="/map" element={<PathScreen />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/practice" element={<Playground />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/verify/:certId" element={<VerifyCertificate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-slate-200 px-4 py-2 flex justify-around items-center">
        <a href="#/" className="flex flex-col items-center gap-0.5 text-xs font-bold text-duo-green">
          <span className="material-symbols-outlined text-2xl">school</span>
          <span>Learn</span>
        </a>
        <a href="#/syllabus" className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <span className="material-symbols-outlined text-2xl">menu_book</span>
          <span>Syllabus</span>
        </a>
        <a href="#/playground" className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <span className="material-symbols-outlined text-2xl">science</span>
          <span>Playground</span>
        </a>
        <a href="#/exams" className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <span className="material-symbols-outlined text-2xl">assignment</span>
          <span>Exams</span>
        </a>
        <a href="#/profile" className="flex flex-col items-center gap-0.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <span className="material-symbols-outlined text-2xl">account_circle</span>
          <span>Profile</span>
        </a>
      </div>
    </div>
  );
}

export default App;
