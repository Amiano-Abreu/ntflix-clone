import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css"
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";

const Login = () => {
    
    const [userMsg, setUserMsg] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }

        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        }
    }, [router])

    const handleLoginWithEmail = async (e) => {
        e.preventDefault()

        if (email) {
            if (email === "amianoabreu@gmail.com") {
                setIsLoading(true)
                try {
                    const dIdToken = await magic.auth.loginWithMagicLink({
                        email
                    })

                    console.log(dIdToken)
                    if (dIdToken) {
                        router.push("/")
                    }
                } catch (e) {
                    setIsLoading(false)
                    console.error("Something went wrong while loggin in ", e)
                } 

            } else {
                setIsLoading(false)
                setUserMsg("Something went wrong")
            }
        } else {
            setIsLoading(false)
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
                        { isLoading ? "Loading": "Sign In"}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login;