import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";

import styles from "./card.module.css"

const Card = ({ 
    imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    size = "medium",
    id,
    shouldScale = true
}) => {

    const classMap ={
        "large": styles.lgItem,
        "medium": styles.mdItem,
        "small": styles.smItem
    }

    const [imgSrc, setImgSrc] = useState(imgUrl)

    const HandleOnError = () => {
        // console.log("errrr")
        setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    }

    const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }
    const shouldHover = shouldScale && {
        whileHover: { ...scale }
    }

    return (
        <div 
            className={styles.container}   
        >
            <motion.div 
                className={`${styles.imgMotionWrapper} ${classMap[size]}`}
                {...shouldHover}
            >
                <Image 
                    src={imgSrc} 
                    alt="imgae" 
                    fill={true} 
                    className={styles.cardImg}
                    onError={HandleOnError}
                />
            </motion.div>
        </div>
    )
}

export default Card;