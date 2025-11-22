import { magic } from "@/lib/magic-client";

import styles from "./navbar.module.css"

import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";

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
                className={`${styles.wrapper} ${width <= 600 ? styles.spread : ''} ${ openMenu ? styles.removePadding : ''}`}
            >
                {
                    !openMenu ?
                    <a
                        className={styles.logoLink}
                        href="/"
                    >
                        <div className={styles.logoWrapper}>
                            {/* <Image src="/static/netflix.svg" alt="netflix logo" width="128" height="34" /> */}
                            <Image src="/static/flixvid.svg" alt="netflix logo" width="128" height="34" />
                        </div>
                    </a>
                    :
                    <></>
                }
                {
                    width <= 600 && !openMenu
                        &&
                    <Image
                        src="/static/menuIcon.svg" 
                        alt="Menu icon"
                        width="32"
                        height="32"
                        onClick={openMenuHandler}
                    />
                }
                {
                    width > 600 &&
                    <DesktopNav 
                        handleOnClickHome={handleOnClickHome}
                        handleOnClickMyList={handleOnClickMyList}
                        handleShowDropdown={handleShowDropdown}
                        username={username}
                        showDropdown={showDropdown}
                        handleSignout={handleSignout}
                    />

                }
                {
                    openMenu ?
                        <MobileNav 
                            closeMenuHandler={closeMenuHandler}
                            handleOnClickMyList={handleOnClickMyList}
                            handleOnClickHome={handleOnClickHome}
                            handleShowDropdown={handleShowDropdown}
                            handleSignout={handleSignout}
                            showDropdown={showDropdown}
                            username={username}
                        />
                    :
                    <></>    
                }
            </div>
        </div>
    );
}

export default NavBar;