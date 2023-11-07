import React, { useContext, useState } from "react";
import AccordionItem from "./Menu";
import "./Supp.css";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { ThemeContext } from "../../contexts/ThemeContext";

function SuppContent() {
  const { theme } = useContext(ThemeContext);
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
      <div className="App p-5">
        <AccordionItem
          title="Preguntas Frecuentes"
          isActive={activeItem === "preguntas-frecuentes"}
          toggleItem={() => toggleItem("preguntas-frecuentes")}
        >
          {(isActive) =>
            isActive && (
              <div
                className={`open-aci ${theme === "dark" && "open-aci-dark"}`}
              >
                <h3>Garantía</h3>
                <p>Todos nuestros productos tienen una garantía de 6 meses</p>
                <h3>Medio de pago</h3>
                <p>Actualmente contamos con compras mediante transferencias</p>
                <h3>Precios e IVA</h3>
                <p>Todos los precios son precios finales con IVA incluido</p>
              </div>
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
              <div
                className={`open-aci ${theme === "dark" && "open-aci-dark"}`}
              >
                <h3>Horarios</h3>
                <p>
                  Los horarios de atención son de lunes a viernes de 9:00 a
                  17hs, y sábados de 9 a 12:30hs.
                </p>
                <p>
                  Para contactar con nosotros, podés encontrarnos en{" "}
                  <a
                    href="https://api.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </div>
            )
          }
        </AccordionItem>

        <AccordionItem
          title="Sobre pagos"
          isActive={activeItem === "sobre-pagos"}
          toggleItem={() => toggleItem("sobre-pagos")}
        >
          {(isActive) =>
            isActive && (
              <div
                className={`open-aci ${theme === "dark" && "open-aci-dark"}`}
              >
                <h3>Metodo de pago</h3>
                <p>Enviar transferencia a CBU: 2205022111100004482894 </p>
                <p>
                  Realizada la transferencia, envie el recibo junto al número de
                  pedido a nuestro{" "}
                  <a
                    href="https://api.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>{" "}
                  y nosotros le responderemos en la brevedad, enviando el
                  pedido.
                </p>
                <p>
                  Se le avisará sobre el estado de su envío mediante un email a
                  la casilla de correo de su usuario.
                </p>
              </div>
            )
          }
        </AccordionItem>
      </div>
      <Footer />
    </>
  );
}

export default SuppContent;
