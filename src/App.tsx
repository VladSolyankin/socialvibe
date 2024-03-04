import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import './globals.css';
import { News } from './pages/News';
import { Chats } from './pages/Chats';
import { Photos } from './pages/Photos';
import { Music } from './pages/Music';
import { AIBot } from './pages/AIBot';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const routes = [
  { path: '/sign_in', element: <SignIn /> },
  { path: '/sign_up', element: <SignUp /> },
  { path: '/', element: <News /> },
  { path: '/chats', element: <Chats /> },
  { path: '/photos', element: <Photos /> },
  { path: '/music', element: <Music /> },
  { path: '/ai_bot', element: <AIBot /> },
];

function App() {
  return (
    <div className='flex min-h-screen dark'>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
