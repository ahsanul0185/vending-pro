import React from "react";
import FormSectionHeader from "../form-components/FormSectionHeader";
import ProcessText from "../../../functions/LanguageSorter";
import { usePageData } from "../../../modules/PageDataContext";
import { useAutoResizeTextarea } from "../../../functions/useAutoResizeTextarea";

const FormPartnerShipPage = () => {
  const { partnershipPageData, setPartnershipPageData } = usePageData();
  const { ref, onInput } = useAutoResizeTextarea();


  const onHeaderChange = (e, type) => {
    setPartnershipPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={partnershipPageData.sectionHeader.image}
        title={partnershipPageData.sectionHeader.title}
      >
        <div className="sg-container">
          <div>
            <img src={partnershipPageData.leftImage} />
            <input
              type="text"
              onChange={(e) =>
                setPartnershipPageData((prev) => ({
                  ...prev,
                  leftImage: e.target.value,
                }))
              }
              value={partnershipPageData.leftImage}
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) =>
                setPartnershipPageData((prev) => ({
                  ...prev,
                  titleText: e.target.value,
                }))
              }
              className="input-field d-s-header-h2"
              value={partnershipPageData.titleText}
            />
            <div>
              <textarea
                onChange={(e) =>
                  setPartnershipPageData((prev) => ({
                    ...prev,
                    para1: e.target.value,
                  }))

                }
                                ref={ref}
                onInput={onInput}
                type="text"
                value={partnershipPageData.para1}
                className="d-s-header-p"
              />
              <br />
              <textarea
                onChange={(e) =>
                  setPartnershipPageData((prev) => ({
                    ...prev,
                    para2: e.target.value,
                  }))
                }
                                ref={ref}
                onInput={onInput}
                type="text"
                value={partnershipPageData.para2}
                className="d-s-header-p"
              />
              <br />
              <textarea
                onChange={(e) =>
                  setPartnershipPageData((prev) => ({
                    ...prev,
                    para3: e.target.value,
                  }))
                }
                                ref={ref}
                onInput={onInput}
                type="text"
                value={partnershipPageData.para3}
                className="d-s-header-p"
              />
            </div>
          </div>
        </div>
      </FormSectionHeader>
    </div>
  );
};

export default FormPartnerShipPage;
