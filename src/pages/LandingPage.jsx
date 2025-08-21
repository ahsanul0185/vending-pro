import "../styles/index.css";
import Hero from "../modules/Hero";
import SectionColumns from "../modules/Main-tour-section";
import VideoPlayer from "../modules/video-player";
import TravelTypes from "../modules/TravelTypes";
import ReasonsSection from "../modules/Reasons";

const LandingPage = () => {
    
  return (
    <>
      <Hero />
      <br />
      <br />
      <br />
      <br />
      <VideoPlayer />
      <TravelTypes />
      <ReasonsSection />
    </>
  );
};

export default LandingPage;
