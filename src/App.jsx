import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./modules/header";
import Footer from "./modules/Footer";
import Category from "./pages/CategoryResume";
import WhySpotVending from "./pages/WhySpotVending";
import Technology from "./pages/Technology";
import VideoGallery from "./pages/VideoGallery";
import Reviews from "./pages/Reviews";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import CreateSocialPost from "./components/dashboard/form-components/CreateSocialPost";
import UpdateSocialPost from "./components/dashboard/form-components/UpdateSocialPost";
import { usePageData } from "./modules/PageDataContext";
import Loader from "./components/Loader";
import SocialContent from "./pages/SocialContent";
import DashLogin from "./components/dashboard/DashLogin";
import DashPrivateRoute from "./components/dashboard/DashPrivateRoute";
import AddNewReview from "./components/dashboard/form-components/AddNewReview";
import EditReview from "./components/dashboard/form-components/EditReview";
import ProductListPage from "./pages/ProductListPage";
import ProductDetails from "./pages/ProductDetails";
import Partnership from "./pages/Partnership";
import WorkWithUs from "./pages/WorkWithUs";

// Este componente lo usaremos para aplicar location.key
const AppRoutes = () => {
  const location = useLocation();

  const hideLayoutRoutes = ["/dashboard", "/admin-login"];
  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Routes location={location} key={location.key}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="/category" element={<Category />} />

        <Route path="/why-spot-vending" element={<WhySpotVending />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/social-contents/:slug" element={<SocialContent />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />


        <Route path="/admin-login" element={<DashLogin />} />


        <Route path="/dashboard" element={<DashPrivateRoute><Dashboard /></DashPrivateRoute>}>
          <Route path="create-post" element={<CreateSocialPost />} />
          <Route path="update-post/:id" element={<UpdateSocialPost />} />
          <Route path="add-review" element={<AddNewReview />} />
          <Route path="edit-review/:id" element={<EditReview />} />
        </Route>
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const App = () => {
  const { loading } = usePageData();
  return (
    <Router>
      {loading ? (
        <div className="main-loader"><Loader /></div>
      ) : (
        <>
          <AppRoutes />
          <Toaster position="top-center" />
        </>
      )}
    </Router>
  );
};

export default App;
