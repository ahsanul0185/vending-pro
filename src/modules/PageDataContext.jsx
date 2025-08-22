import { createContext, useContext, useEffect, useState } from "react";
import {
  footerMockData,
  headerMockData,
  homePageMockData,
  mobileAppPageMockData,
  partnershipPageMockData,
  reviewsPageMockData,
  socialContentPageMockData,
  videoGalleryPageMockData,
  whyGSTPageMockData,
  workWithUsPageMockData,
} from "../functions/pageMockData";
import { toast } from "sonner";
import { savePageData } from "../firebase/actions";
import { getPageData } from "../firebase/actions";

const SITE_ID = import.meta.env.VITE_SITE_ID;

const PageDataContext = createContext();

const isEmpty = (value) => {
  if (value == null) return false; 
  if (Array.isArray(value)) return value.length === 0 ? false : value;
  if (typeof value === 'object') return Object.keys(value).length === 0 ? false : value;
  return value; 
};



export const PageDataProvider = ({ children }) => {
  const [pagesData, setPagesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [socialPosts, setSocialPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [primaryColor, setPrimaryColor] = useState(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim()
  );

  const [headerData, setHeaderData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [homePageData, setHomePageData] = useState(null);
  const [partnershipPageData, setPartnershipPageData] = useState(null);
  const [workWithUsPageData, setWorkWithUsPageData] = useState(null);
  const [mobileAppPageData, setMobileAppPageData] = useState(null);
  const [videoGalleryPageData, setVideoGalleryPageData] = useState(null);
  const [socialContentPageData, setSocialContentPageData] = useState(null);
  const [whyGSTPageData, setWhyGSTPageData] = useState(null);
  const [reviewsPageData, setReviewsPageData] = useState(null);

  // Get all pages data
  useEffect(() => {
    const getPages = async () => {
      try {
        setLoading(true);
        const data = await getPageData(SITE_ID);

        if (data) {
          setPagesData(data);
        }
        setHeaderData(data?.header || headerMockData);
        setFooterData(data?.footer || footerMockData);
        setHomePageData(data?.home || homePageMockData);
        setPartnershipPageData(data?.partership || partnershipPageMockData);
        setWorkWithUsPageData(data?.workWithUs || workWithUsPageMockData);
        setMobileAppPageData(data?.mobileApp || mobileAppPageMockData);
        setVideoGalleryPageData(data?.videoGallery || videoGalleryPageMockData);
        setSocialContentPageData(
          data?.socialContent || socialContentPageMockData
        );
        setWhyGSTPageData(data?.whyGST || whyGSTPageMockData);
        setReviewsPageData(data?.reviews || reviewsPageMockData);

        // set primary color
        setPrimaryColor(data?.primaryColor || "#2c73d2");
        document.documentElement.style.setProperty(
          "--primary-color",
          data?.primaryColor || "#2c73d2"
        );

        // console.log(data)
      } catch (error) {
        console.log(error);
        toast.error("Failed to get page contents");
      } finally {
        setLoading(false);
      }
    };

    getPages();
  }, []);

  // Save page data
  const onSave = async () => {
const newPageData = {
  primaryColor: primaryColor,
  header: isEmpty(headerData) || headerMockData,
  footer: isEmpty(footerData) || footerMockData,
  home: isEmpty(homePageData) || homePageMockData,
  partership: isEmpty(partnershipPageData) || partnershipPageData,
  workWithUs: isEmpty(workWithUsPageData) || workWithUsPageData,
  mobileApp: isEmpty(mobileAppPageData) || mobileAppPageMockData,
  videoGallery: isEmpty(videoGalleryPageData) || videoGalleryPageMockData,
  socialContent: isEmpty(socialContentPageData) || socialContentPageMockData,
  whyGST: isEmpty(whyGSTPageData) || whyGSTPageMockData,
  reviews: isEmpty(reviewsPageData) || reviewsPageMockData,
};

    try {
      await savePageData(SITE_ID, newPageData);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    loading,
    SITE_ID,
    onSave,
    pagesData,
    setPagesData,
    primaryColor,
    setPrimaryColor,
    headerData,
    footerData,
    homePageData,
    workWithUsPageData,
    partnershipPageData,
    mobileAppPageData,
    videoGalleryPageData,
    socialContentPageData,
    whyGSTPageData,
    reviewsPageData,
    setHeaderData,
    setFooterData,
    setHomePageData,
    setPartnershipPageData,
    setWorkWithUsPageData,
    setMobileAppPageData,
    setVideoGalleryPageData,
    setSocialContentPageData,
    setWhyGSTPageData,
    setReviewsPageData,
    socialPosts,
    setSocialPosts,
    reviews,
    setReviews,
  };

  return (
    <PageDataContext.Provider value={values}>
      {children}
    </PageDataContext.Provider>
  );
};

export const usePageData = () => useContext(PageDataContext);
