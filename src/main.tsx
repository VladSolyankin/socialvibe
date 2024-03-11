import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './components/providers/ThemeProvider.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from './components/ui/toaster.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <App />
      </ThemeProvider>
    </AuthProvider>
    <Toaster />
  </BrowserRouter>
);
