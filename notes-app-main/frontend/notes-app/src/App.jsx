import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotesDashboard from "./pages/NotesDashboard";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  // agar user login hai, dashboard par redirect
  return user ? <Navigate to="/" /> : element;
};

const router = createBrowserRouter([
  { path: "/login", element: <PublicRoute element={<Login />} /> },
  { path: "/signup", element: <PublicRoute element={<Signup />} /> },
  { path: "/", element: <PrivateRoute element={<NotesDashboard />} /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
