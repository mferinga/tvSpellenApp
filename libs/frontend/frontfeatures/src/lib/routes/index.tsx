import { Routes } from 'react-router-dom';
import { homeRoutes } from './homeRoutes/homeRoute';
import { spelRoutes } from './spelRoutes/spelRoute';
import { spellijstRoutes } from './spellijstRoutes/spellijstRoute';

export function AppRoutes() {
  return (
    <Routes>
      {homeRoutes}
      {spelRoutes}
      {spellijstRoutes}
    </Routes>
  );
}
