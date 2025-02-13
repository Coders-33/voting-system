import image1 from "../images/college.jpg";
import image2 from "../images/khalsa.png";
import image3 from "../images/party.jpg";

import { Carousel } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../Styling/Login.module.css";

function Login() {
    return (
        <>
            <div className={styles.container}  >

                <Carousel interval={3000} pause={false} indicators={false} controls={false}  >
                    <Carousel.Item   >
                        <img
                            className={styles.images}
                            src={image1}
                            alt="First slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className={styles.images}

                            src={image2}
                            alt="Second slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className={styles.images}
                            src={image3}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>

            </div>
        </>
    );
}

export default Login;
