import React from "react";
import "../styles/travel-types.css";
import { Link } from "react-router-dom";
import ProcessText from "../functions/LanguageSorter";
import { usePageData } from "./PageDataContext";

function TravelTypes() {
 const {homePageData} = usePageData() 


  const items = homePageData.travelTypes;

  return (
    <div className="tt-flex-container">
      {items.map((item, index) => (
        <div className="tt-items-container" key={index}>
          <div className="tt-item-background" style={{ backgroundImage: `url(${item.background})` }}></div>
          <Link to={item.url} className="tt-flex-item">
            <h4>{ProcessText(item.title)}</h4>
            <hr/>
            <p>{ProcessText("Learn More***Conocer Más")}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TravelTypes;
