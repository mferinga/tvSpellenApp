import { Route } from 'react-router-dom';
import { About, Home } from '@org/frontfeatures';

export const homeRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </>
);
