import Navbar from "../Small-components/Navbar";
import styles from "../Styling/About.module.css";
import Footer from "./Footer";

const About = () => {
  return (
    <div>
        <Navbar/>

      <div style={{
        display: "flex", width: "100vw", height: "100vh",
        alignItems: "center", justifyContent: "center" ,backgroundColor : "white"
      }}>

        <div className={styles.container}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.description}>
            <span className={styles.highlight} >SMART CAMPUS E-Voting System</span> is designed to provide a seamless and secure
            voting experience for students and faculty members. It ensures transparency,
            accessibility, and efficiency in the election process.
          </p>
          <div className={styles.features}>
            <h2 className={styles.subTitle}>Key Features</h2>
            <ul className={styles.list}>
              <li>Secure and encrypted voting process</li>
              <li>Real-time vote counting</li>
              <li>User-friendly interface</li>
              <li>Authentication-based access</li>
            </ul>
          </div>
          <p style={{ color: "black", fontSize: "1.2rem", fontWeight: "bolder" }}>Built by Varun Joshi and Priyanshu Bhandari.</p>
        </div>
      </div>

     <Footer/>
    </div>
  );
};

export default About;
