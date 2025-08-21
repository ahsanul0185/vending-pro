import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { useLanguage } from "../modules/LanguageContext";

function DropdownButton({
  id,
  isOpen,
  toggleDropdown,
  title,
  data,
  resumeLink,
}) {
  const { language } = useLanguage(); 

  const processText = (texto) => {
    const clave = "***";
    const index = texto.indexOf(clave);
    return index === -1
      ? texto
      : language === "en"
      ? texto.substring(0, index)
      : texto.substring(index + clave.length);
  };

  return (
    <div className="mobile-dropdown">
      <button
        className="mobile-dropdown-button"
        style={{alignItems : "center"}}
        onClick={() => toggleDropdown(id)}
      >
        <p>{processText(title)}</p> <IoIosArrowDown fill="#fff" />
      </button>

      <div
        className="mobile-dropdown-content"
        style={isOpen ? { display: "flex" } : { display: "none" }}
      >
        {data.map((item) => (
          <div key={item.category.id} className="category-container">
            <h3>{processText(item.category.category_name)}</h3>
            <div>
              {resumeLink ? (
                <Link
                  onClick={() => toggleDropdown(id)}
                  to="/products"
                  state={{ category : item.category.category_name.split('***')[0] }}
                >
                  {processText("Find A *** Buscar un Tour en") +
                    " " +
                    processText(item.category.category_name)}
                </Link>
              ) : null}
              {item.options.map((option, index) => (
                
                <Link
                  onClick={() => toggleDropdown(id)}
                  key={index}
                  to={!resumeLink ? option[0] : "/products"}
                  state={{ category : item.category.category_name.split('***')[0], type: option[1].split('***')[0]}}
                >
                  
                  {processText(option[1])}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownButton;
