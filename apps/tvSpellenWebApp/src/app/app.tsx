
// import { Route, Routes, Link } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SpelList } from '@org/frontfeatures';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route index element={<div id="test" />} />
          <Route path="/test" element={<SpelList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
