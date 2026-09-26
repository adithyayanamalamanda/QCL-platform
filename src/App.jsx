import { Routes, Route, Navigate } from 'react-router-dom';
import PathScreen from './components/PathScreen';
import LessonScreen from './components/LessonScreen';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Routes>
        <Route path="/" element={<PathScreen />} />
        <Route path="/path" element={<PathScreen />} />
        <Route path="/map" element={<PathScreen />} />
        <Route path="/level/:id" element={<LessonScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
