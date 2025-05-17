import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import Help from '@/pages/Help';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={
          <ProtectedRoute redirectTo="/" showPrompt={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute redirectTo="/" showPrompt={true}>
            <Create />
          </ProtectedRoute>
        } />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
