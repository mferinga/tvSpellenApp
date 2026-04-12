import { Route } from 'react-router-dom';
import { SpelList, SpelDetail } from '@org/frontfeatures';
import ProtectedRoute from '../ProtectedRoute';

export const spelRoutes = (
  <>
    <Route path="/spellen" element={<ProtectedRoute><SpelList /></ProtectedRoute>} />
    <Route path="/spellen/:id" element={<ProtectedRoute><SpelDetail /></ProtectedRoute>} />
  </>
);
