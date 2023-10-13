import React, { useState } from "react";
import AccordionItem from "./Menu";
import "./Supp.css";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

function SuppContent() {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (item) => {
    if (activeItem === item) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  return (
    <>
      <NavBar />
      <div className="App">
        <AccordionItem
          title="Preguntas Frecuentes"
          isActive={activeItem === "preguntas-frecuentes"}
          toggleItem={() => toggleItem("preguntas-frecuentes")}
        >
          {(isActive) =>
            isActive && (
              <>
                <h2>Garantía</h2>
                <p>Todos nuestros productos tienen una garantía de X meses</p>
                <h2>Medio de pago</h2>
                <p>
                  Actualmente contamos solo con mercado pago, pero tenemos
                  pensado ampliarnos a mas metodos en la brevedad
                </p>
                <h2>Precios e IVA</h2>
                <p>Todos los precios son precios finales con IVA incluido</p>
              </>
            )
          }
        </AccordionItem>

        <AccordionItem
          title="Atención al Cliente"
          isActive={activeItem === "atencion-al-cliente"}
          toggleItem={() => toggleItem("atencion-al-cliente")}
        >
          {(isActive) =>
            isActive && (
              <p>
                Si necesitas ayuda, contáctanos en{" "}
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                .
              </p>
            )
          }
        </AccordionItem>

        <AccordionItem
          title="Sobre Envíos"
          isActive={activeItem === "sobre-envios"}
          toggleItem={() => toggleItem("sobre-envios")}
        >
          {(isActive) => isActive && <p>Información de envios</p>}
        </AccordionItem>
      </div>
      <Footer />
    </>
  );
}

export default SuppContent;
