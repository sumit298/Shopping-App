import Product from "./components/Products";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import UserRegister from "./components/Users/UserRegister";
import UserLogin from "./components/Users/UserLogin";
import NotFound from "./components/NotFound";
import Auth0Login from "./Auth0/Auth0Login";
import Success from "./Auth0/Success";
import PrivateRoute from "./components/Users/PrivateRoutes";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<UserLogin />} />
      <Route
        path="/product"
        element={<PrivateRoute Component={Product} />}
      />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
