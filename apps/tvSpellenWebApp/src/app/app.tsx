// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRoutes } from '@org/frontfeatures';
import {
  BrowserRouter,
} from 'react-router-dom';
import { NavBarComponent } from './components/navbar.component';

export function App() {
  return (
    <>
      <NavBarComponent />
      <div className="container mt-3">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
