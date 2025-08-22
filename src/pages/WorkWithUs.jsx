import React from 'react'
import { usePageData } from '../modules/PageDataContext';
import HeaderSection from '../components/HeaderSection';
import TitleText from '../components/TitleText';

const WorkWithUs = () => {
    const { workWithUsPageData } = usePageData();
  return (
    <div style={{ backgroundColor: "#eee" }}>
        <HeaderSection  image={workWithUsPageData.sectionHeader.image}
          title={workWithUsPageData.sectionHeader.title}
          subtitle={workWithUsPageData.sectionHeader.subtitle}
          description={workWithUsPageData.sectionHeader.description}/>

          <TitleText title={workWithUsPageData.titleText1.title} text={workWithUsPageData.titleText1.text}/>
          <TitleText title={workWithUsPageData.titleText2.title} text={workWithUsPageData.titleText2.text}/>
          <TitleText title={workWithUsPageData.titleText3.title} text={workWithUsPageData.titleText3.text}/>
    </div>
  )
}

export default WorkWithUs