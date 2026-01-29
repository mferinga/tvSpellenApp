// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRoutes } from '@org/frontfeatures';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <div className="container mt-3">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
