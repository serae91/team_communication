import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/main-page/MainPage.js';
import { AuthProvider } from './providers/auth/AuthProvider.tsx';
import ProtectedRoute from './routes/protected-route/ProtectedRoute.tsx';
import LoginPage from './components/pages/login-page/LoginPage.tsx';
import RootRedirect from './routes/root-redirect/RootRedirect.tsx';
import RegisterPage from './components/pages/register-page/RegisterPage.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/queryClient.ts';

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={ queryClient }>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={ <LoginPage/> }/>
            <Route path="/register" element={ <RegisterPage/> }/>
            <Route
              path="/mainpage"
              element={
                <ProtectedRoute>
                  <MainPage/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={ <RootRedirect/> }/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
