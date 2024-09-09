import Link from "next/link";
import Card from "./card";

import styles from "./section-cards.module.css"

const SectionCards = ({ title, videos = [], size, shouldWrap = false, shouldScale }) => {
    let sectionCards = <></>

    if ( videos && videos.length !== 0 ) {
        
        sectionCards = <section className={styles.container}>
                            <h2 className={styles.title}>
                                {title}
                            </h2>
                            <div className={`${styles.cardWrapper} ${shouldWrap ? styles.wrap : ""}`}>
                                {
                                    videos?.map( (video, i) => {
                                            return (
                                                <Link
                                                    key={i}
                                                    href={`/video/${video.id}`}
                                                >
                                                    <Card
                                                        imgUrl={video.imgUrl}
                                                        size={size}
                                                        id={i}
                                                        shouldScale={shouldScale}
                                                    />
                                                </Link>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </section>

    }
    
    return sectionCards;
}

export default SectionCards;