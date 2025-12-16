import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './components/pages/main-page/MainPage.js';
import { AuthProvider } from './providers/auth/AuthProvider.tsx';
import ProtectedRoute from './routes/protected-route/ProtectedRoute.tsx';
import LoginPage from './components/pages/login-page/LoginPage.tsx';
import { RootRedirect } from './routes/root-redirect/RootRedirect.tsx';
import { RegisterPage } from './components/pages/register-page/RegisterPage.tsx';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
