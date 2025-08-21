import React from 'react'
import HeaderSection from '../components/HeaderSection'
import { usePageData } from '../modules/PageDataContext';


const Technology = () => {
    const { mobileAppPageData } = usePageData();
  return (
    <div style={{ backgroundColor: "#eee" }}>
        <HeaderSection  image={mobileAppPageData.sectionHeader.image}
          title={mobileAppPageData.sectionHeader.title}
          subtitle={mobileAppPageData.sectionHeader.subtitle}
          description={mobileAppPageData.sectionHeader.description}/>
    </div>
  )
}

export default Technology