import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
library.add(
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram
);

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start bg-body-tertiary text-muted"
      data-bs-theme="dark"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="#!" className="me-4 text-reset">
            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
          </a>
          <a href="#!" className="me-4 text-reset">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a href="#!" className="me-4 text-reset">
            <FontAwesomeIcon icon={["fab", "google"]} />
          </a>
          <a href="#!" className="me-4 text-reset">
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
        </div>
      </section>
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FontAwesomeIcon icon="gem" className="me-3" />
                About
              </h6>
              <p>
                The Online Voting System project effectively demonstrates the
                application of full-stack development techniques, including
                frontend, backend, and database integration.
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Login
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Parties List
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Live Result
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FontAwesomeIcon icon="home" className="me-3" />
                Sri Guru Gobind Singh College.
              </p>
              <p>
                <FontAwesomeIcon icon="envelope" className="me-3" />
                khalsacollegemohali@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon="phone" className="me-3" /> +8437766329
              </p>
              <p>
                <FontAwesomeIcon icon="print" className="me-3" /> +8556928121
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2025 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          {" "}
          SmartCampus.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
