import { useEffect, useState } from "react";
import styles from "../Styling/forgetpassword.module.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../script/GetData";

const ForgetPassword = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);
    const [otpSendValidation, setOtpSendValidation] = useState<boolean>(false);
    const [candidateId, setCandidateId] = useState<string | null>(null);
    const navigate = useNavigate();



    useEffect(() => {

        function clearUi() {

            const timeoutId = setTimeout(() => {
                setMessage(null);
                setError(null);
            }, 2000);
            return () => {
                clearTimeout(timeoutId);
            }
        }

        clearUi();



    }, [message, error])


    async function SendOtp() {

        if (!inputText.includes("@gmail.com")) {
            setError("invalid email format");
            return;
        }

        if (inputText == "") {
            setError("fields can not be empty");
            return;
        }

        const info = { email: inputText };

        const response = await fetch(`${BACKEND_URL}/accounts/forget-password/sendOTP`, {


            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const result = await response.json();

        if (response.ok) {

            setOtpSendValidation(true);
            setMessage(result.message);
            setEmail(inputText);
            setCandidateId(result.candidateId);
            setInputText("");
        }

        if (!response.ok) {
            setInputText("");
            setOtpSendValidation(false);
            setError(result.error);
        }


    }

    async function VerifyOtp() {

        try {
            const info = {
                id: candidateId,
                email: email,
                enteredOTP: Number(inputText),
            };

            const response = await fetch(`${BACKEND_URL}/accounts/forget-password/verifyOTP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });


            const result = await response.json();

            if (response.ok) {
                setMessage(result.message || "Verification successful!");
                setTimeout(() => {
                    navigate(`/rs/${candidateId}/${result?.keyId}`);
                    return;
                }, 2000);
            }

            else if (!response.ok && response.status === 400) {
                setError(result.message);
            }
            else {
                setError(result?.message || "An error occurred.");

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        }
        catch (error) {
            console.error("Error:", error);
            setError("An unexpected error occurred.");
        }
    }

    function inputTextSetting(e: React.ChangeEvent<HTMLInputElement>) {


        if (otpSendValidation) {
            if (e.target.value.length > 5) return;
            if (isNaN(Number(e.target.value))) return;

            setInputText(e.target.value);
            return;
        }

        setInputText(e.target.value);


    }

    return (
        <div className={styles.container}>

            <div className={styles.card}>
                <h2 className={styles.title}>Forgot Password?</h2>
                <p className={styles.description}>
                    Enter your email to receive an OTP to reset your password
                </p>
                <div className={styles.form}>
                    <div className={styles.inputContainer}>
                        <input
                            type={otpSendValidation ? "text" : "email"}
                            placeholder={otpSendValidation ? "Enter OTP" : "Enter your email" }
                            value={inputText}
                            onChange={inputTextSetting}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" onClick={otpSendValidation ? VerifyOtp : SendOtp} className={styles.button}>
                        {otpSendValidation ? "Verify" : "Send OTP"}
                    </button>
                </div>
                <div>
                    {message && <p className={styles.message} >{message}</p>}
                    {error && <p className={styles.error} >{error}</p>}
                </div>

            </div>
        </div>
    );
};

export default ForgetPassword;