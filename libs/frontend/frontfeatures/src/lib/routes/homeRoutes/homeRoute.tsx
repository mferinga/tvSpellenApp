import { Route } from 'react-router-dom';
import { About, Home, Login, Register } from '@org/frontfeatures';
import ProtectedRoute from '../ProtectedRoute';

export const homeRoutes = (
  <>
    {/* Route Logins */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes */}
    <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

    
  </>
);
