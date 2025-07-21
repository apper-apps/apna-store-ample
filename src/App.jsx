import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Categories from "@/components/pages/Categories";
import ProductDetail from "@/components/pages/ProductDetail";
import Cart from "@/components/pages/Cart";
import Checkout from "@/components/pages/Checkout";
import Orders from "@/components/pages/Orders";
import StoreManagement from "@/components/pages/StoreManagement";
import AddProduct from "@/components/pages/AddProduct";
import EditProduct from "@/components/pages/EditProduct";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/store" element={<StoreManagement />} />
            <Route path="/store/add-product" element={<AddProduct />} />
            <Route path="/store/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
        />
      </div>
    </Router>
  );
}

export default App;