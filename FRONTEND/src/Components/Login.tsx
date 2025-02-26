import React, { useEffect, useRef, useState } from "react";
import styles from "../Styling/Sign.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import votingImage from "../images/digital-voting.png"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../script/GetData";
import { useAuthContext , ACTIONS } from "../Context/UserContext";


function Login() {

    const navigate = useNavigate();

    const { dispatch } = useAuthContext();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLSpanElement>(null);

    const passInputRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLSpanElement>(null);

    const studentIdRef = useRef<HTMLSpanElement>(null);
    const studentInputRef = useRef<HTMLInputElement>(null);

    
    const [studentIdValue , setStudentId]  = useState<string>("");
    const [emailValue, setEmailValue] = useState<string>("");
    const [passValue, setPassValue] = useState<string>("");


    useEffect(() => {
        const Emailinput = emailInputRef.current;
        const Emailbox = emailRef.current;


        if (Emailinput && Emailbox) {


            Emailinput.addEventListener("focus", () => handleFocus(Emailbox));
            Emailinput.addEventListener("blur", () => handleBlur(Emailbox));

            if (emailValue != "") Emailinput.addEventListener("blur", () => handleFocus(Emailbox));

            return () => {
                Emailinput.removeEventListener("focus", () => handleFocus);
                Emailinput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [emailValue, emailInputRef]);

    useEffect(() => {

        const Passinput = passInputRef.current;
        const PassBox = passRef.current;

        if (Passinput && PassBox) {


            Passinput.addEventListener("focus", () => handleFocus(PassBox));
            Passinput.addEventListener("blur", () => handleBlur(PassBox));


            if (passValue != "") Passinput.addEventListener("blur", () => handleFocus(PassBox));

            return () => {
                Passinput.removeEventListener("focus", () => handleFocus);
                Passinput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [passValue, passInputRef]);

    useEffect(() => {

        const StudentInput = studentInputRef.current;
        const StudentBox = studentIdRef.current;

        if (StudentInput && StudentBox) {


            StudentInput.addEventListener("focus", () => handleFocus(StudentBox));
            StudentInput.addEventListener("blur", () => handleBlur(StudentBox));


            if (studentIdValue != "") StudentInput.addEventListener("blur", () => handleFocus(StudentBox));

            return () => {
                StudentInput.removeEventListener("focus", () => handleFocus);
                StudentInput.removeEventListener("blur", () => handleBlur);
            };
        }



    }, [studentIdValue, studentInputRef]);



    function handleFocus(element: HTMLSpanElement) {
        element.style.top = "-20px";
        element.style.color = "#1877F2";
        element.style.fontSize = "16px";
    }

    function handleBlur(element: HTMLSpanElement) {
        element.style.top = "5px";
        element.style.color = "white";
        element.style.fontSize = "1.4rem";
    }

    function handleForgetPassword() {
 
        navigate("/forget-password");

    }

    async function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("studentId" , studentIdValue);
        formData.append("email" , emailValue);
        formData.append("password" , passValue);


        const response = await fetch(`${BACKEND_URL}/accounts/login` , {
            method : "POST",
            body : formData
        });

       const result = await response.json();
       if(response.ok) { 
       
        const userToken = result.loginData;
        if(userToken) {
            dispatch({ type : ACTIONS.SET_USER , payload : userToken });
            localStorage.setItem("user-token" , JSON.stringify(userToken));
        }
         
         navigate("/");
       }         
       
       if(!response.ok) {
         console.log(result);   
       }

    }


    return (
        <>

            <div className={styles.container} >

            </div>

            <div className={styles.logoAndInfo} >

                <div className={styles.SignContainer} >

                    <div style={{
                        display: "flex", width: "100%", height: "95px", marginLeft : "20px",
                        alignItems: "center" , fontSize : "2rem" , fontWeight : "bolder" , color : "white"
                    }} >Vote Now
                    </div>
 
                        
                    <p style={{ marginBottom: "40px", fontSize: "1.5rem", marginLeft: "20px", fontWeight: "bolder" }} >Log In</p>

                    <form onSubmit={handleLogIn} className={styles.formContainer}  >

                        <div id={styles.inputDiv} >
                            <span ref={studentIdRef} id={styles.spanLabel}>Student Id*</span>
                            <input ref={studentInputRef} id={styles.inputField} required
                                value={studentIdValue} onChange={function(e : React.ChangeEvent<HTMLInputElement>) {
                                     if(isNaN(Number(e.target.value))) return;
                                     setStudentId(e.target.value);
                                }}
                                type="text" />
                        </div>
                        <div id={styles.inputDiv} >
                            <span ref={emailRef} id={styles.spanLabel}>Email*</span>
                            <input ref={emailInputRef} id={styles.inputField} required
                                value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                                type="text" />
                        </div>


                        <div id={styles.inputDiv} >
                            <span onClick={handleForgetPassword} ref={passRef} id={styles.spanLabel}>Password*</span>
                            <input ref={passInputRef} id={styles.inputField}  required
                                value={passValue} onChange={(e) => setPassValue(e.target.value)}
                                type="text" />
                        </div>

                        <p onClick={handleForgetPassword}
                            style={{ marginLeft: "20px", position: "absolute", top: "71%", cursor: "pointer" }}
                        >Forgot Password?</p>

                        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px" }} >

                            <button type="submit"className={styles.LogInButton} >Log In</button>
                            <button onClick={() => navigate("/")} className={styles.CannelButton}>Cancel</button>

                        </div>



                    </form>



                </div>

            </div>

        </>
    )
}

export default Login
