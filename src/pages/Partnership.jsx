
import HeaderSection from '../components/HeaderSection'
import { usePageData } from '../modules/PageDataContext';

const Partnership = () => {
    const { partnershipPageData } = usePageData();
  return (
    <div style={{ backgroundColor: "#eee" }}>
        <HeaderSection  image={partnershipPageData.sectionHeader.image}
          title={partnershipPageData.sectionHeader.title}
          subtitle={partnershipPageData.sectionHeader.subtitle}
          description={partnershipPageData.sectionHeader.description}/>
    </div>
  )
}

export default Partnership