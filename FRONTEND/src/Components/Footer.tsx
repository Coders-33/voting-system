// Footer.tsx
import styles from "../Styling/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h4>About Us</h4>
          <p>We build awesome web applications!</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialLinks}>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 MyWebsite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;