import { useRouter } from "next/router";
import styles from "./navbar.module.css"
import Link from "next/link";

const NavBar = ({ username }) => {

    const router = useRouter()

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/")
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list")
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
                        Netflix
                    </div>
                </a>
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
                </ul>

                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn}>
                            <p className={styles.username}>{username}</p>
                            {/* Expnad more icon */}
                        </button>

                        <div className={styles.navDropdown}>
                            <div>
                                <Link className={styles.linkName} href="/login">
                                    sign out
                                </Link>
                                <div className={styles.lineWrapper}></div>

                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;