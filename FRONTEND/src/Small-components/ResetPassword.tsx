import { useEffect, useState } from "react";
import styles from "../Styling/forgetpassword.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../script/GetData";

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const { id1 } = useParams<{id1 : string  , id2: string}>();
  
   

    useEffect(() => {


        function clearUi() {

            const timeoutId = setTimeout(() => {

                setError(null);
                setMessage(null);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }

        clearUi();

    }, [message, error])


    async function handleChangePassword() {

        if (newPassword == "" || confirmPassword == "") {
            setError("Fields can't be empty");
            return;
        }
        if (newPassword != confirmPassword) {
            setError("Confirm password do not match");
            return;
        };

        const data = {
            newPassword,
            candidateId : id1
        }

        const response = await fetch(`${BACKEND_URL}/accounts/changePassword`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (response.ok) {
            setMessage(result.message);
            setNewPassword("");
            setConfirmPassword("");
            const timeoutId = setTimeout(() => {
                navigate("/");
            }, 2000);

            return () => clearTimeout(timeoutId);
        }

        if (!response.ok) {
            setError(result.error);
        }
    }


    return (
        <div className={styles.container}>

            <div className={styles.card}>
                <h2 className={styles.title}>Change Password ?</h2>
                <p className={styles.description}>
                    Enter Your New Password
                </p>
                <div className={styles.form}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={styles.input}
                            required
                        />

                        <input style={{ marginTop: "5px" }}
                            type="text"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <button onClick={handleChangePassword} className={styles.button} >
                        Change
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

export default ResetPassword;