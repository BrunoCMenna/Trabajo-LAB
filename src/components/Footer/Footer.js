import React from "react";
import { useContext } from "react";
import "./Footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  BsInstagram,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();
  const goShop = () => {
    navigation("/shop");
  };
  const goCart = () => {
    navigation("/cart");
  };
  const goLogin = () => {
    navigation("/login");
  };
  const goSignIn = () => {
    navigation("/signin");
  };
  return (
    
    <div className="footer">
    
      <MDBFooter
        bgColor="light"
        className="text-center text-m-start text-muted">
        <div className= {`${theme === "dark" && "socialmedia-dark"}`}>
        <section className="justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-3 d-none d-lg-block">
            <span>Nuestras redes:</span>
          </div>
          <hr></hr>
          <div>
            <a
              href="https://www.instagram.com/"
              target="_blanket"
              className="me-4 text-reset"
            >
              <BsInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blanket"
              className="me-4 text-reset"
            >
              <BsFacebook />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blanket"
              className="me-4 text-reset"
            >
              <BsTwitter />
            </a>
            <a
              href="https://www.whatsapp.com/?lang=es"
              target="_blanket"
              className="me-4 text-reset"
            >
              <BsWhatsapp />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blanket"
              className="me-4 text-reset"
            >
              <BsYoutube />
            </a>
          </div>
          
        </section>
        </div>

        <section className="">
        <div className= {`${theme === "dark" && "footer-dark"}`}>
          <MDBContainer className="text-center text-md-start mt-0 border-top">
            <MDBRow className="mt-3">
              <MDBCol md="4" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-1" />
                  TECNO ROSARIO
                </h6>
                <hr></hr>
                <p>Toda la tecnología al alcance de tu mano</p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Productos</h6>
                <hr></hr>
                <p>
                  <button
                    type="button"
                    onClick={goShop}
                    className="text-reset text-decoration-underline"
                  >
                    Tienda
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    className="text-reset text-decoration-underline"
                    onClick={goCart}
                  >
                    Mi Carrito
                  </button>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">LINKS</h6>
                <hr></hr>
                <p>
                  <button
                    type="button"
                    className="text-reset text-decoration-underline"
                    onClick={goLogin}
                  >
                    Iniciar sesión
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    className="text-reset text-decoration-underline"
                    onClick={goSignIn}
                  >
                    Registrarse
                  </button>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                <hr></hr>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Rosario, Santa Fe
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-2" />
                  tecnorosario@gmail.com
                </p>
                <p>
                  <MDBIcon icon="print" className="me-2" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </div>
        </section>

        <div
          className="text-center p-4 text-white"
          style={{ backgroundColor: "rgb(63, 19, 144)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer