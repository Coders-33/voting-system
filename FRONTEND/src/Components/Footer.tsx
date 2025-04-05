import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-ui-kit/css/mdb.min.css';
import styles from '../Styling/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={`text-center text-lg-start text-muted ${styles.footer}`} data-bs-theme="dark">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://www.facebook.com/sggschd" target="_blank" className="me-4 text-reset"><i className="fab fa-facebook-f"></i></a>
          <a href="https://x.com/i/flow/login?redirect_after_login=%2Fsggsc26chd" target="_blank" className="me-4 text-reset"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/sggsclg_26chd/" target="_blank"  className="me-4 text-reset"><i className="fab fa-instagram"></i></a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>About
              </h6>
              <p>
                The Online Voting System project effectively demonstrates the application of full-stack development
                techniques... scalable, secure, and easy to use.
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p><a href="#!" className="text-reset">Login</a></p>
              <p><a href="#!" className="text-reset">Parties List</a></p>
              <p><a href="#!" className="text-reset">Live Result</a></p>
              <p><a href="#!" className="text-reset">Help</a></p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i>Sri Guru Gobind Singh College</p>
              <p><i className="fas fa-envelope me-2"></i>principal.sggs26@gmail.com</p>
              <p><i className="fas fa-phone me-3"></i>+8437766329</p>
              <p><i className="fas fa-print me-3"></i>+8556928121</p>
            </div>
          </div>
        </div>
      </section>

      <div className={`text-center p-4 ${styles.copyright}`}>
        © 2025 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/"> SmartCampus.com</a>
      </div>
    </footer>
  );
};

export default Footer;
