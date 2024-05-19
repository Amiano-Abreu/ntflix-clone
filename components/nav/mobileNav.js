import { motion } from "framer-motion";

import Image from "next/image";

import styles from './navbar.module.css'

const MobileNav = ({ 
    closeMenuHandler, 
    handleOnClickHome, 
    handleOnClickMyList, 
    handleShowDropdown, 
    handleSignout, 
    username, 
    showDropdown 
}) => {
    
    return (
        <motion.div
            initial={{ x: 600 }}
            animate={{ x: 0 }}
            on
            transition={{ ease: "easeOut", duration: .7 }}
        >
            <div
                className={styles.closeIconContainer}
            >
                <Image 
                    src="/static/closeIcon.svg" 
                    alt="Close Icon" 
                    width="24" 
                    height="24"
                    style={{
                        margin: '.5rem'
                    }}
                    onClick={closeMenuHandler}
                />
            </div>
            <div className={styles.mobileContainer}>
                <ul 
                    className={styles.navItems}
                    style={{
                        flexDirection: 'column',
                        padding: 0,
                        marginLeft: 0,
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}    
                >
                    <li 
                        className={styles.navItem} 
                        onClick={(e) => {
                            closeMenuHandler()
                            handleOnClickHome(e)
                        }}
                        style={{
                            marginRight: 0,
                            marginBottom: '1.5rem'
                        }}
                    >Home</li>
                    <li 
                        className={styles.navItem2} 
                        onClick={(e) => {
                            closeMenuHandler()
                            handleOnClickMyList(e)
                        }}
                    >My List</li>
                </ul>

                
                <nav 
                    className={styles.navContainer}
                    style={{
                        marginLeft: 0
                    }}
                >
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
                                            onClick={(e) => {
                                                closeMenuHandler()
                                                handleSignout(e)
                                            }}
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
        </motion.div>
    )
}

export default MobileNav