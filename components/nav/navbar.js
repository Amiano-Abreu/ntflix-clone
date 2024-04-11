import { magic } from "@/lib/magic-client";

import styles from "./navbar.module.css"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState("")

    const router = useRouter()

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/")
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list")
    }

    const handleShowDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(prev => !prev)
    }

    const handleSignout = async (e) => {
      e.preventDefault();
    //   const didToken = req?.cookies?.token

      try {
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            // Authorization: `Bearer ${didToken}`,
            'Content-Type': 'application/json',
          },
        });

        const res = await response.json();
      } catch (error) {
        console.error('Error logging out', error);
        router.push('/login');
      }
    };

    useEffect(() => {
        const retrieveEmail = async () => {
            try {
                const { email } = await magic.user.getInfo();
    
                if (email) {
                    setUsername(email)
                }
            } catch (error) {
                console.error("Error retrieving email ", error)
            }
        }

        retrieveEmail()
    }, [])

    return (
        <div
            className={styles.container}
        >
            <div className={styles.wrapper}>
                <a
                    className={styles.logoLink}
                    href="/"
                >
                    <div className={styles.logoWrapper}>
                        <Image src="/static/netflix.svg" alt="netflix logo" width="128" height="34" />
                    </div>
                </a>
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
                </ul>

                
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image src="/static/dropdown.svg" alt="Expand dropdown" width="24" height="24" />
                        </button>
                        {
                            showDropdown &&
                            (
                                <div className={styles.navDropdown}>
                                    <div>
                                        <a 
                                            className={styles.linkName}
                                            onClick={handleSignout}
                                        >
                                            sign out
                                        </a>
                                        <div className={styles.lineWrapper}></div>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;