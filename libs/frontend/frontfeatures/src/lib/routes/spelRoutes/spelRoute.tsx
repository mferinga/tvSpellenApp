import { Route } from 'react-router-dom';
import { SpelList, SpelDetail } from '@org/frontfeatures';

export const spelRoutes = (
  <>
    <Route path="/spellen" element={<SpelList />} />
    <Route path="/spellen/:id" element={<SpelDetail />} />
  </>
);
