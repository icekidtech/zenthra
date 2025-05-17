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
// Import the new page
import ListNFT from '@/pages/ListNFT';

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
        {/* Add the new route */}
        <Route path="/create/list/:id" element={
          <ProtectedRoute redirectTo="/" showPrompt={true}>
            <ListNFT />
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
