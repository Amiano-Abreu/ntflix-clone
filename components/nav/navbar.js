import { magic } from "@/lib/magic-client";

import styles from "./navbar.module.css"

import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const NavBar = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState("")
    const [width, setWidth] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

    const router = useRouter()

    const openMenuHandler = () => {
        setOpenMenu(true)
    }

    const closeMenuHandler = () => {
        setOpenMenu(false)
    }

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

        const handleResize = () => {
          setWidth(window.innerWidth);
        };

        handleResize(); // Set initial width
        window.addEventListener('resize', handleResize);

        retrieveEmail()

        return () => {
          window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <div
            className={styles.container}
        >
            <div 
                className={`${styles.wrapper} ${width < 600 ? styles.spread : ''} ${ openMenu ? styles.removePadding : ''}`}
            >
                {
                    !openMenu ?
                    <a
                        className={styles.logoLink}
                        href="/"
                    >
                        <div className={styles.logoWrapper}>
                            <Image src="/static/netflix.svg" alt="netflix logo" width="128" height="34" />
                        </div>
                    </a>
                    :
                    <></>
                }
                {
                    width < 600 && !openMenu
                        &&
                    <Image
                        src="/static/menuIcon.svg" 
                        alt="Menu icon"
                        width="32"
                        height="32"
                        onClick={openMenuHandler}
                    />
                }
                {/* <ul className={styles.navItems}>
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
                </nav> */}
                {
                    openMenu ?
                    <div>
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
                    </div>
                    :
                    <></>    
                }
            </div>
        </div>
    );
}

export default NavBar;