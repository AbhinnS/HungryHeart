import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import BattersPage from "./pages/BattersPage";
import ComboMealsPage from "./pages/ComboMealsPage";
import CakesPage from "./pages/CakesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/batters"
          element={
            <Layout>
              <BattersPage />
            </Layout>
          }
        />
        <Route
          path="/combos"
          element={
            <Layout>
              <ComboMealsPage />
            </Layout>
          }
        />
        <Route
          path="/cakes"
          element={
            <Layout>
              <CakesPage />
            </Layout>
          }
        />
        <Route
          path="/testimonials"
          element={
            <Layout>
              <TestimonialsPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignupPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <CheckoutPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
