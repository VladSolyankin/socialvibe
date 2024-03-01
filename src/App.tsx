import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import './globals.css';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Home } from './pages/Home';

const routes = [
  { path: '/sign_in', element: <SignIn /> },
  { path: '/sign_up', element: <SignUp /> },
  { path: '/', element: <Home /> },
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
