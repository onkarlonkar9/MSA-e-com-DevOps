// import required modules
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SignUpPage from "./Pages/SignUpPage";
import DemoPage from "./Pages/DemoPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/AccountPage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ScrollToTop from "./Components/ScrollToTop";
import AuthGate from "./Components/AuthGate";
import CartPage from "./Pages/CartPage";
import AddressPage from "./Pages/AddressPage";
import PageNotFoundPage from "./Pages/PageNotFoundPage";
import AboutPage from "./Pages/AboutPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage";
import PaymentFailedPage from "./Pages/PaymentFailedPage";
import OrdersPage from "./Pages/OrdersPage";
import usePageTitle from "./hooks/usePageTitle";

// create queryClient instance
const queryClient = new QueryClient();

// create a component 
function TitleManager() {
  usePageTitle();
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TitleManager/>
        <MantineProvider>
          <AuthGate />
          <ScrollToTop />
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/demo/:pageName" element={<DemoPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/address"
              element={
                <ProtectedRoute>
                  <AddressPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paymentsuccess"
              element={
                <ProtectedRoute>
                  <PaymentSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paymentfailed"
              element={
                <ProtectedRoute>
                  <PaymentFailedPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFoundPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </MantineProvider>
        <Toaster
          toastOptions={{
            success: {
              style: {
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "18px",
              },
            },
            error: {
              style: {
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "18px",
              },
            },
            loading: {
              style: {
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "18px",
              },
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
