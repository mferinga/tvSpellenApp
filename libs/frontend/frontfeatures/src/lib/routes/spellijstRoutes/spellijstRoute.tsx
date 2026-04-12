import { Route } from "react-router-dom";
import { SpelDetail } from "../../spel/spel-detail/spel-detail";
import SpellijstDetail from "../../spellijst/spellijst-detail/spellijst-detail";
import SpellijstList from "../../spellijst/spellijst-list/spellijst-list";
import ProtectedRoute from "../ProtectedRoute";

export const spellijstRoutes = (
  <>
    <Route path="/spellijsten" element={<ProtectedRoute><SpellijstList /></ProtectedRoute>} />
    <Route path="/spellijsten/:id" element={<ProtectedRoute><SpellijstDetail /></ProtectedRoute>} />
    <Route path="/spellen/:id" element={<ProtectedRoute><SpelDetail /></ProtectedRoute>} />
  </>
);

