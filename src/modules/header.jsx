import React, { useState, useEffect } from "react";
import DropdownButton from "../components/DropdownButton";
import HeaderButton from "../components/Header-contact-button";
import MobileMenu from "../components/MobileMenu";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/header.css";
import axios from "axios";
import { Adress } from "../functions/Variables";
import LanguageSwitcher from "../components/LanguageSwitch";
import ProcessText from "../functions/LanguageSorter";
import { useLanguage } from "./LanguageContext";
import { usePageData } from "./PageDataContext";

function Header() {
  const { headerData } = usePageData();

  const [openDropdown, setOpenDropdown] = useState(null);

  const titleExplore = ProcessText("Explore Machines***Explorar Machines");
  const titleTravel = ProcessText("Solutions***Soluciones");
  const titleAbout = ProcessText("About us ***Sobre nosotros");
  const callAdvisorText = ProcessText(headerData.callAdvisorText);

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

const jsonData = [
  {
    category: {
      id: 1,
      category_name: "Solutions***Soluciones",
    },
    options: [
      ["/technology", "Technology***Tecnología"],
      ["/partnership", "Partnership***Socios"],
      ["/work-with-us", "Work With Us***Trabaja con nosotros"],
    ],
  },
];


  const jsonDataAbout = [
    {
      category: {
        id: 1,
        category_name: processText(
          "Meet Vending Pro***Conoce a Vending Pro"
        ),
      },
      options: [
        [
          "/why-spot-vending",
          processText("Why Vending Pro***Por qué Vending Pro"),
        ],
        [
          "/technology",
          processText("Technology***Tecnologia en los tours"),
        ],
        ["/videos", processText("Video gallery***Galeria de video")],
        [
          "/reviews",
          processText("Reviews and testimonials***Opiniones y testimonios"),
        ],
      ],
    },
  ];


const categoryData = [
  {
    category: {
      id: 1,
      category_name: "Ambient Vending Machines***Máquinas expendedoras ambientales",
    },
    options: [
      ["/products", "Food & Snacks***Comida y refrigerios"],
      ["/products", "Beverages***Bebidas"],
      ["/products", "Non-Food Items***Artículos no alimentarios"],
      ["/products", "Specialty***Especialidad"],
    ],
  },
  {
    category: {
      id: 2,
      category_name: "Chilled Machines***Máquinas refrigeradas",
    },
    options: [
      ["/products", "Cold Beverages***Bebidas frías"],
      ["/products", "Perishable Foods***Alimentos perecederos"],
      ["/products", "Chilled Desserts***Postres refrigerados"],
      ["/products", "Health & Lifestyle***Salud y estilo de vida"],
    ],
  },
  {
    category: {
      id: 3,
      category_name: "Hot & Cold Machines***Máquinas de bebidas calientes y frías",
    },
    options: [
      ["/products", "Hot Beverages***Bebidas calientes"],
      ["/products", "Hot Foods***Comidas calientes"],
    ],
  },
];




  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleRedirect = () => {
    window.location.href = "";
  };

  return (
    <div className="header-container">
      <div className="top-bar" style={{ backgroundColor: "#333333" }}>
        <div>
          <button
            onClick={handleRedirect}
            style={{
              backgroundColor: "rgb(255 255 255)",
              color: "var(--primary-color)",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "lighter",
              marginRight: "5px",
            }}
          >
            {headerData.topbarText}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="header">
        <div className="header-items">
          <Link to={"/"}>
            <img className="" src={headerData.logo} alt="Logo" />
          </Link>
          <DropdownButton
            id="1"
            isOpen={openDropdown === "1"}
            toggleDropdown={toggleDropdown}
            title={titleExplore}
            data={categoryData}
            resumeLink={true}
          />
          <DropdownButton
            id="2"
            isOpen={openDropdown === "2"}
            toggleDropdown={toggleDropdown}
            title={titleTravel}
            data={jsonData}
            resumeLink={false}
          />
          <DropdownButton
            id="3"
            isOpen={openDropdown === "3"}
            toggleDropdown={toggleDropdown}
            title={titleAbout}
            data={jsonDataAbout}
            resumeLink={false}
          />
        </div>
        <div
          className="header-items header-number-contact"
          onClick={() => setOpenDropdown(null)}
        >
          <HeaderButton />
          <div>
            <a href="tel:+123456789" className="phone-container">
              <FaPhoneAlt fill="#fff" size={20} /> <p>{headerData.phone}</p>
            </a>
            <p style={{ color: "#fff", fontSize: "12px" }}>{callAdvisorText}</p>
          </div>
        </div>
      </nav>
      <MobileMenu />
    </div>
  );
}

export default Header;
