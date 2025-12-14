import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './components/pages/main-page/MainPage.js';
import { AuthProvider } from './providers/auth/AuthProvider.tsx';
import ProtectedRoute from './routes/protected-route/ProtectedRoute.tsx';
import LoginPage from './components/pages/login-page/LoginPage.tsx';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
