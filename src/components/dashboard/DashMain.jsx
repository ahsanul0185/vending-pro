import React from "react";
import useGetActivePage from "../../functions/useGetActivePage";
import FormLandingPage from "./page-forms/FormLandingPage";
import { usePageData } from "../../modules/PageDataContext";
import FormHeader from "./page-forms/FormHeader";
import FormFooter from "./page-forms/FormFooter";
import FormPartnerShipPage from "./page-forms/FormPartnerShipPage";
import FormWorkWithUs from "./page-forms/FormWorkWithUs";
import FormMobileApp from "./page-forms/FormMobileApp";
import FormVideoGallery from "./page-forms/FormVideoGallery";
import FormSocialContent from "./page-forms/FormSocialContent";
import FormWhyGST from "./page-forms/FormWhyGST";
import CreateSocialPost from "./form-components/CreateSocialPost";
import DashTopbar from "./form-components/DashTopbar";
import ListSocialPosts from "./form-components/ListSocialPosts";
import { Outlet } from "react-router-dom";
import ReviewsList from "./form-components/ReviewsList";
import FormReviewsPage from "./page-forms/FormReviewsPage";

const DashMain = () => {
  const { onSave } = usePageData();

  const { activePage } = useGetActivePage();

  const isContentSection = activePage?.startsWith("content");

  return (
    <div className="dash-main">
      {!isContentSection && activePage && (
        <DashTopbar
          onSubmit={onSave}
          title={
            activePage !== "header" && activePage !== "footer"
              ? activePage + " Page"
              : activePage
          }
        />
      )}

      {!activePage && <p>Site ID : {import.meta.env.VITE_SITE_ID}</p>}

      {/* Pages */}
      {activePage && activePage !== "footer" && !isContentSection && <FormHeader />}
      {activePage && activePage === "home" && <FormLandingPage />}
      {activePage && activePage === "partnership" && <FormPartnerShipPage />}
      {activePage && activePage === "work-with-us" && <FormWorkWithUs />}
      {activePage && activePage === "technology" && <FormMobileApp />}
      {activePage && activePage === "video-gallery" && <FormVideoGallery />}
      {activePage && activePage === "social-content" && <FormSocialContent />}
      {activePage && activePage === "why-vending-pro" && <FormWhyGST />}
      {activePage && activePage === "reviews" && <FormReviewsPage />}
      {activePage && activePage !== "header" && !isContentSection && <FormFooter />}

      {/* Contents */}
      {activePage === "content-social-posts" && <ListSocialPosts />}
      {activePage === "content-reviews-list" && <ReviewsList />}
      {/* {activePage === "content-create-social-post" && <CreateSocialPost />} */}
      <Outlet />
    </div>
  );
};

export default DashMain;
