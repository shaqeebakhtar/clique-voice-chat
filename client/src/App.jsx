import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Rooms from "./pages/rooms/Rooms";
import Authenticate from "./pages/authenticate/Authenticate";
import Activate from "./pages/activate/Activate";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/authenticate"
          exact
          element={
            <PublicRoute>
              <Authenticate />
            </PublicRoute>
          }
        />
        <Route
          path="/activate"
          exact
          element={
            <SemiRestrictedRoute>
              <Activate />
            </SemiRestrictedRoute>
          }
        />
        <Route
          path="/rooms"
          exact
          element={
            <RestrictedRoute>
              <Rooms />
            </RestrictedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const isAuth = false;
const user = {
  activated: true,
};

const PublicRoute = ({ children }) => {
  return isAuth ? <Navigate to="/rooms" replace /> : children;
};

const SemiRestrictedRoute = ({ children }) => {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate to="/rooms" replace />
  );
};

const RestrictedRoute = ({ children }) => {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" replace />
  ) : (
    children
  );
};

export default App;
