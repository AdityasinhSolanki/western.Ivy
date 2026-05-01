import { useState , useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

/* USER COMPONENTS */

import Navbar from "./User/components/Navbar";
import Footer from "./User/components/Footer";

/* USER PAGES */

import MainCollectionBanner from "./User/Pages/MainCollectionBanner";
import MainCollection from "./User/Pages/MainCollection";

import AboutUs from "./User/Pages/AboutUs";
import ContactUs from "./User/Pages/ContactUs";
import Login from "./User/Pages/Login";
import Signup from "./User/Pages/Signup";
import ReturnsExchange from "./User/Pages/ReturnsExchange";
import HelpSupport from "./User/Pages/HelpSupport";
import TermsConditions from "./User/Pages/TermsConditions";
import PrivacyPolicy from "./User/Pages/PrivacyPolicy";

import ProductDetails from "./User/Pages/ProductDetails";
import Profile from "./User/Pages/Profile";
import Cart from "./User/Pages/Cart";
import Checkout from "./User/Pages/Checkout";
import PaymentSuccess from "./User/Pages/PaymentSuccess";
import Orders from "./User/Pages/Orders";
import OrderDetails from "./User/Pages/OrderDetails";
import Premium from "./User/Pages/Premium";
import Wishlist from "./User/Pages/Wishlist";
/* CONTEXT PROVIDERS */
import { CartProvider } from "./Context/CartContext";
import { OrderProvider } from "./Context/OrderContext";
import { PremiumProvider } from "./Context/PremiumContext";
import { ToastProvider } from "./Context/ToastContext";
import WishlistProvider from "./Context/WishlistContext";
/* ADMIN PAGES */

import AdminDashboard from "./Admin/Pages/AdminDashboard";
import AdminProducts from "./Admin/Pages/AdminProducts";
import AdminOrders from "./Admin/Pages/AdminOrders";

/* STYLES */

import "./App.css";

/* TOAST */

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AppContent({ selectedCategory, setSelectedCategory }) {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  return (
    <>
      {!isAdminRoute && (
        <Navbar
          onCategorySelect={setSelectedCategory}
          products={products}
        />
      )}
     


      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <>
              {selectedCategory === "all" && <MainCollectionBanner />}
              <MainCollection selectedCategory={selectedCategory} />
            </>
          }
        />

        {/* USER ROUTES */}

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/returns-exchange" element={<ReturnsExchange />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/premium" element={<Premium />} />

        {/* ADMIN ROUTES */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />

      {!isAdminRoute && <Footer />}
    </>
  );
}


function App() {

  const [selectedCategory, setSelectedCategory] = useState("all");


  return (
    <CartProvider>
      <OrderProvider>
        <PremiumProvider>
          <ToastProvider>
            <WishlistProvider>
              <Router>
                <AppContent
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </Router>
            </WishlistProvider>
          </ToastProvider>
        </PremiumProvider>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;