import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAuth } from './lib/auth';

// الصفحات
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrganizationalChart from './pages/OrganizationalChart';
import UserManagement from './pages/UserManagement';
import PoliciesProcedures from './pages/PoliciesProcedures';
import AuditPlanning from './pages/AuditPlanning';
import RiskManagement from './pages/RiskManagement';
import FindingsTracking from './pages/FindingsTracking';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// مكون حماية الصفحات
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* الصفحات المحمية */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/organizational-chart" element={
            <ProtectedRoute>
              <OrganizationalChart />
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/policies" element={
            <ProtectedRoute>
              <PoliciesProcedures />
            </ProtectedRoute>
          } />
          
          <Route path="/audit-planning" element={
            <ProtectedRoute>
              <AuditPlanning />
            </ProtectedRoute>
          } />
          
          <Route path="/risk-management" element={
            <ProtectedRoute>
              <RiskManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/findings" element={
            <ProtectedRoute>
              <FindingsTracking />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;