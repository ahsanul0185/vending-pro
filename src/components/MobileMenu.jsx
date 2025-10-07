import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import HeaderButton from "../components/Header-contact-button";
import "../styles/mobile-menu.css";
import { Link } from "react-router-dom";
import NestedDropdown from "./NestedDropdown";
import axios from "axios";
import { Adress } from "../functions/Variables";
import { useLanguage } from "../modules/LanguageContext";
import ProcessText from "../functions/LanguageSorter";
import { usePageData } from "../modules/PageDataContext";



function MobileMenu() {

    const { headerData } = usePageData();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

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

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
    window.scrollTo(0, 0)
  };


  return (
    <div className="mobile-menu px-5">
      <a href="/">
       <h2 className="text-white text-xl font-bold">Vending Pro</h2>
      </a>
      <button className="mm-open-button" onClick={() => setMenuOpen(!menuOpen)}>
        <IoIosMenu size={72} fill="#fff" />
      </button>
      <div className={`mobile-menu-bg ${menuOpen ? "isOpen" : "isClosed"}`}>
        <div className="mobile-menu-container">
          <button className="mm-close-button" onClick={() => setMenuOpen(!menuOpen)}>
            <IoMdClose size={32} />
          </button>
          <HeaderButton />
          <div className="mobile-item">
            <NestedDropdown data={categoryData} dropdownName={ProcessText('Explore Machines***Explorar Machines')} resumeLink={true} onToggle={handleToggle}   />
            <NestedDropdown data={jsonData} dropdownName={ProcessText('Solutions***Soluciones')}  resumeLink={false} onToggle={handleToggle} />
            <NestedDropdown data={jsonDataAbout} dropdownName={ProcessText('About Us***Sobre nosotros')}  resumeLink={false} onToggle={handleToggle} />
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
