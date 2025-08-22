import React from "react";
import ReasonsSection from "../../../modules/Reasons";
import TitleText from "../../TitleText";
import FormSectionHeader from "../form-components/FormSectionHeader";
import ProcessText from "../../../functions/LanguageSorter";
import { usePageData } from "../../../modules/PageDataContext";
import FormTitleText from "../form-components/FormTitleText";
import { Link } from "react-router-dom";

const FormWorkWithUs = () => {
  const { workWithUsPageData, setWorkWithUsPageData } = usePageData();

  const onHeaderChange = (e, type) => {
    setWorkWithUsPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };

const onTitleChange = (e, type, fieldKey) => {
  const value = e.target.value;
  setWorkWithUsPageData((prev) => ({
    ...prev,
    [fieldKey]: {
      ...prev[fieldKey],
      [type]: value,
    },
  }));
};


  return (
    <div>
      <div style={{ backgroundColor: "#eee" }}>
        <FormSectionHeader
          onHeaderChange={onHeaderChange}
          image={workWithUsPageData.sectionHeader.image}
          title={workWithUsPageData.sectionHeader.title}
          subtitle={workWithUsPageData.sectionHeader.subtitle}
          description={workWithUsPageData.sectionHeader.description}
        />

        <FormTitleText
        fieldKey="titleText1"
          onTitleChange={onTitleChange}
          title={workWithUsPageData.titleText1.title}
          text={workWithUsPageData.titleText1.text}
        />
        <FormTitleText
        fieldKey="titleText2"
          onTitleChange={onTitleChange}
          title={workWithUsPageData.titleText2.title}
          text={workWithUsPageData.titleText2.text}
        />
        <FormTitleText
        fieldKey="titleText3"
          onTitleChange={onTitleChange}
          title={workWithUsPageData.titleText3.title}
          text={workWithUsPageData.titleText3.text}
        />
      </div>
    </div>
  );
};

export default FormWorkWithUs;
