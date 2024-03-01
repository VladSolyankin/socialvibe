import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <main className="h-screen">
      <Routes>

        <Route path="/sign_in" element={<SignIn />}></Route>
        <Route path="/sign_up" element={<SignUp />}></Route>

      </Routes>
    </main>
  );
}

export default App;
