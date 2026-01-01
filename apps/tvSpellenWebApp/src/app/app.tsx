// eslint-disable-next-line @nx/enforce-module-boundaries
import { SpelList } from '@org/frontfeatures';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <div className='container mt-3'>
        <Routes>
          <Route index element={<div id="test" />} />
          <Route path="/spellen" element={<SpelList />} />
          {/* <Route path="spellen/{:id}" element={<SpelDetail} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
