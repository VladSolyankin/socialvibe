import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from './context/AuthContext';
import './globals.css';
import { AIBot } from './pages/AIBot';
import { Chats } from './pages/Chats';
import { Music } from './pages/Music';
import { Photos } from './pages/Photos';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const routes = [
  { path: '/sign_in', element: <SignIn /> },
  { path: '/sign_up', element: <SignUp /> },
  { path: '/', element: <Music /> },
  { path: '/chats', element: <Chats /> },
  { path: '/photos', element: <Photos /> },
  { path: '/music', element: <Music /> },
  { path: '/ai_bot', element: <AIBot /> },
];

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? element : <Navigate to='/sign_in' />;
};

function App() {
  return (
    <div>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute element={element} />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
