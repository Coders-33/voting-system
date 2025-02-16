import React, { useState } from "react";
import styles from "../Styling/Contact.module.css"; // Import the CSS module

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
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
          style={{ resize :"none" }}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button}>Send Message</button>
      </form>

      <div className={styles.socialLinks}>
        <p>Follow us:</p>
        <a href="#">Facebook</a> | 
        <a href="#">Twitter</a> | 
        <a href="#">Instagram</a>
      </div>
    </div>
  );
};

export default Contact;
