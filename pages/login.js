import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css"
import { useState } from "react";

const Login = () => {
    
    const [userMsg, setUserMsg] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter()

    const handleLoginWithEmail = (e) => {
        e.preventDefault()

        if (email) {
            if (email === "amiano@gmail.com") {
                router.push("/")
            } else {
                setUserMsg("Something went wrong")
            }
        } else {
            setUserMsg("Enter a valid email")
        }
    }

    const handleChange = (e) => {
        setUserMsg("")
        const emailInput = e.target.value
        setEmail(emailInput)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix SignIn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <a
                        className={styles.logoLink}
                        href="/"
                    >
                        <div className={styles.logoWrapper}>
                            <Image 
                                src="/static/netflix.svg" 
                                alt="netflix logo" 
                                width="128" 
                                height="34" 
                            />
                        </div>
                    </a>
                </div>
            </header>

            <main className={styles.main}>
                <div
                    className={styles.mainWrapper}
                >
                    <h1 className={styles.signinHeader}>
                        Sign In
                    </h1>

                    <input 
                        type="text"
                        placeholder="Email address"
                        className={styles.emailInput}
                        onChange={handleChange}
                    />

                    <p className={styles.userMsg}>
                        {userMsg}
                    </p>
                    <button
                        className={styles.loginBtn}
                        onClick={handleLoginWithEmail}
                    >
                        Sign In
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login;