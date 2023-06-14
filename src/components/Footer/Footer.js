import React from "react";
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
} from 'react-icons/bs';


export default function Footer() {
  return (
    <div className="Footer">
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted">
        <section className="justify-content-center justify-content-lg-between p-4 border-bottom text-black">
          <div className="me-5 d-none d-lg-block">
            <span>Nuestras redes:</span>
          </div>
          <hr></hr>
          <div>
          <a href='https://www.instagram.com/' target="_blanket" className='me-4 text-reset'>
            <BsInstagram />
          </a>
          <a href='https://www.facebook.com/' target="_blanket" className='me-4 text-reset'>
            <BsFacebook />
          </a>
          <a href='https://www.twitter.com/' target="_blanket" className='me-4 text-reset'>
            <BsTwitter />
          </a>
          <a href='https://www.whatsapp.com/?lang=es' target="_blanket" className='me-4 text-reset'>
            <BsWhatsapp />
          </a>
          <a href='https://www.youtube.com/' target="_blanket" className='me-4 text-reset'>
            <BsYoutube />
          </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5 border-top">
            <MDBRow className="mt-3">
              <MDBCol md="4" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-1" />
                  TECNO ROSARIO
                </h6>
                <hr></hr>
                <p>
                  Toda la tecnología al alcance de tu mano
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Productos</h6>
                <hr></hr>
                <p>
                  <a href="Shop" className="text-reset">
                    Tienda
                  </a>
                </p>
                <p>
                  <a href="Cart" className="text-reset">
                    Mi Carrito
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">LINKS</h6>
                <hr></hr>
                <p>
                  <a href="Login" className="text-reset">
                    Iniciar Sesión
                  </a>
                </p>
                <p>
                  <a href="signin" className="text-reset">
                    Registrarse
                  </a>
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
