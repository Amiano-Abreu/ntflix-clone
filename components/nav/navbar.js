import styles from "./navbar.module.css"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";

const NavBar = ({ username }) => {

    const [showDropdown, setShowDropdown] = useState(false)

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
                                        <Link className={styles.linkName} href="/login">
                                            sign out
                                        </Link>
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