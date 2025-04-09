import React, { useState } from "react";
import styles from "../Styling/Contact.module.css"; // Import the CSS module
import Navbar from "../Small-components/Navbar";
import Footer from "./Footer";
import { BACKEND_URL } from "../script/GetData";
import { useNavigate } from "react-router-dom";

const Contact: React.FC = () => {

const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`${BACKEND_URL}/accounts/send-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      alert("Thankyou for Contacting!");
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  };

  return (

    <>
      <Navbar />

      <div style={{
        display: 'flex', alignItems: "center", justifyContent: "center",
        height: "800px", width: "100vw", background: "white"
      }} >


        <div className={styles.container}>
          <h2>Contact Us</h2>

          <div className={styles.contactInfo}>
            <p><strong>College Name:</strong> SGGS College</p>
            <p><strong>Email:</strong>principal.sggs26@gmail.com</p>
            <p><strong>Phone:</strong> (0172) 2792754 , 2790312 </p>
            <p><strong>Address:</strong> Sector-26 , Chandigarh</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{ resize: "none" }}
              className={styles.textarea}
            ></textarea>
            <button type="submit" className={styles.button}>Send Message</button>
          </form>

          <div className={styles.socialLinks}>
            <p>Follow us:</p>
            <a href="https://www.facebook.com/sggschd" target="_blank" className="me-4 text-reset"><i className="fab fa-facebook-f"></i></a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fsggsc26chd" target="_blank" className="me-4 text-reset"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/sggsc26chd/?igsh=eXJwcnkyMjk1N2Rl#" target="_blank" className="me-4 text-reset"><i className="fab fa-instagram"></i></a>
          </div>

        </div>
      </div>



      <Footer />
    </>

  );
};

export default Contact;
