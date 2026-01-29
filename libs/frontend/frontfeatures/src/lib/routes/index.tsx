import { Routes } from 'react-router-dom';
import { homeRoutes } from './homeRoutes/homeRoute';
import { spelRoutes } from './spelRoutes/spelRoute';

export function AppRoutes() {
  return (
    <Routes>
      {homeRoutes}
      {spelRoutes}
    </Routes>
  );
}
