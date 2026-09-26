import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import Map from './components/Map';
import Level from './components/Level';
import BasicsIntro from './components/BasicsIntro';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Practice from './components/Practice';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import AITutor from './components/AITutor';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFullScreen = location.pathname === '/' || location.pathname === '/intro';

  if (isFullScreen) {
    return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/intro" element={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
              <BasicsIntro onDone={() => navigate('/map')} />
            </div>
          } />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/level/:id" element={<Level />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Map />} />
          </Routes>
        </div>
      </div>
      <AITutor />
    </div>
  );
}

export default App;
