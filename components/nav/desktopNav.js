import styles from "./navbar.module.css"

import Image from "next/image"

const DesktopNav = ({
    handleOnClickHome,
    handleOnClickMyList,
    handleShowDropdown,
    username,
    showDropdown,
    handleSignout
}) => {
    return (
        <>

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
        </>
    )
}

export default DesktopNav