import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import './globals.css';
import { DesktopLayout } from './layout/DesktopLayout';
import { MobileLayout } from './layout/MobileLayout';
import { AIBot } from './pages/AIBot';
import { Chats } from './pages/Chats';
import { Music } from './pages/Music';
import { News } from './pages/News';
import { Photos } from './pages/Photos';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { Friends } from './pages/Friends';

const routes = [
  { path: '/sign_in', element: <SignIn /> },
  { path: '/sign_up', element: <SignUp /> },
  { path: '/', element: <Music /> },
  { path: '/chats', element: <Chats /> },
  { path: '/photos', element: <Photos /> },
  { path: '/music', element: <Music /> },
  { path: '/ai_bot', element: <AIBot /> },
];

function App() {
  return (
    <Routes>
      <Route>
        <Route path='sign_in' element={<SignIn />} />
        <Route path='sign_up' element={<SignUp />} />
      </Route>

      <Route element={window.innerWidth ? <DesktopLayout /> : <MobileLayout />}>
        <Route index element={<News />} />
        <Route path='/photos' element={<Photos />} />
        <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/ai' element={<AIBot />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/friends' element={<Friends />} />
      </Route>
    </Routes>
  );
}

export default App;
