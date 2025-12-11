// import required files
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import DemoComponent from "./components/DemoComponent";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";

import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/demo" element={<DemoComponent />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
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
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
