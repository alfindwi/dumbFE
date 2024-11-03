import Cookies from "js-cookie";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { CategoryAdmin } from "../features/app/adminPage/category/category";
import { ComplainAdmin } from "../features/app/adminPage/complain/admin-complain";
import { HomeAdmin } from "../features/app/adminPage/home/home-admin";
import { ProductAdmin } from "../features/app/adminPage/product/product";
import { Complain } from "../features/app/userPage/Complain/complain";
import { Home } from "../features/app/userPage/Home/home";
import { Chart } from "../features/app/userPage/cart/chart";
import { Detail } from "../features/app/userPage/detailProduct/detailProduct";
import { ErrorRoute } from "../features/app/userPage/errorRoute";
import { Checkout } from "../features/app/userPage/order/checkout";
import { Profile } from "../features/app/userPage/profile/profile";
import { LoginForm } from "../features/auth/login/login";
import { RegisterForm } from "../features/auth/register/register";
import AuthLayout from "../layouts/authLayout";
import RootLayout from "../layouts/rootLayout";
import { TransactionAdmin } from "../features/app/adminPage/transaction/transaction";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRole.includes(userRole || "")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "complain", element: <Complain /> },
      { path: "chart", element: <Chart /> },
      { path: "detail/:id", element: <Detail /> },
      {path: "checkout", element: <Checkout />},
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
  { path: "*", element: <ErrorRoute /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <HomeAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/complain",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <ComplainAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/category",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <CategoryAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/product",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <ProductAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/transaction",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <TransactionAdmin />
      </ProtectedRoute>
    ),
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}
