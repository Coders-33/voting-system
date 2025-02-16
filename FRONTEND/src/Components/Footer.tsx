import styles from '../Styling/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerSocial}>
        <span>Get connected with us on social networks:</span>
        <div className={styles.socialLinks}>
          <a href="#!" className={styles.socialLink}>Facebook</a>
          <a href="#!" className={styles.socialLink}>Twitter</a>
          <a href="#!" className={styles.socialLink}>Google</a>
          <a href="#!" className={styles.socialLink}>Instagram</a>
        </div>
      </section>

      <section className={styles.footerInfo}>
        <div className={styles.infoSection}>
          <h6>About</h6>
          <p>
            The Online Voting System project demonstrates the application of full-stack development techniques.
          </p>
        </div>
        <div className={styles.infoSection}>
          <h6>Useful links</h6>
          <ul>
            <li><a href="#!" className={styles.footerLink}>Login</a></li>
            <li><a href="#!" className={styles.footerLink}>Parties List</a></li>
            <li><a href="#!" className={styles.footerLink}>Live Result</a></li>
            <li><a href="#!" className={styles.footerLink}>Help</a></li>
          </ul>
        </div>
        <div className={styles.infoSection}>
          <h6>Contact</h6>
          <p>Sri Guru Gobind Singh College.</p>
          <p>khalsacollegemohali@gmail.com</p>
          <p>+8437766329</p>
          <p>+8556928121</p>
        </div>
      </section>

      <div className={styles.footerBottom}>
        <p>© 2025 Copyright: SmartCampus.com</p>
      </div>
    </footer>
  );
};

export default Footer;
