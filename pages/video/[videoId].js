import { useRouter } from "next/router";

import Modal from "react-modal"

import styles from "../../styles/Video.module.css"
import { getVideoById } from "../../lib/videos";
import NavBar from "@/components/nav/navbar";

import DisLike from "@/components/icons/dislike-icon";
import Like from "@/components/icons/like-icon";
import { useEffect, useState } from "react";
import userRedirectUser from "@/utils/redirectUser";

Modal.setAppElement("#__next")

export async function getStaticProps(context) {

    const { userId } = await userRedirectUser(context)

    if (!userId) {
      return {
        props: {},
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const videoId = context.params.videoId

    const videoArray = await getVideoById(videoId)

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const listOfVideos = [
        "Pkt4NFoaHbE",
        "7ARFyrM6gVs",
        "n1oUspMuUgk"
    ]

    const paths = listOfVideos.map(videoId => ({
        params: {
            videoId
        }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}

const Video = ({ video }) => {

    const router = useRouter();

    const { videoId } = router.query;

    const {
        title,
        publishTime,
        description,
        channelTitle,
        statistics: {
            viewCount
        } = {
            viewCount: 0
        }
    } = video

    useEffect(() => {
        const isFavourited = async () => {
            const response = await fetch(`/api/stats?videoId=${videoId}`, {
                method: 'GET'
            })
            const data = await response.json()
    
            if (data.length > 0) {
                const favourited = data[0].favourited;
                if (favourited) {
                    setToggleLike(true)
                } else {
                    setToggleDisLike(true)
                }
            }
        }

        isFavourited()
    }, [])

    const runRatingService = async (favourited) => {
        return await fetch('/api/stats', {
            method: 'POST',
            body: JSON.stringify({
                videoId, 
                favourited
            }),
            headers: {
                "Content-Type": "application/json" 
            }
        })
    }

    const [toggleLike, setToggleLike] = useState(false)
    const [toggleDisLike, setToggleDisLike] = useState(false)

    const handleToggleDisLike = async () => {
        // console.log("dislike")
        const val = !toggleDisLike
        setToggleDisLike(val)
        setToggleLike(toggleDisLike)

        const favourited = val ? 0 : 1
        const response = await runRatingService(favourited)
    }

    const handleToggleLike = async () => {
        // console.log("like")
        const val = !toggleLike
        setToggleLike(val)
        setToggleDisLike(toggleLike)

        const favourited = val ? 1 : 0
        const response = await runRatingService(favourited)

        
    }

    return (
        <div className={styles.container}>
            <NavBar />
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => {
                    router.back()
                }}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <iframe
                    id="ytplayer"
                    className={styles.videoPlayer}
                    typer="text/html"
                    width="100%"
                    height="360"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&orgin=http://example.com&controls=0&rel=1`}
                    frameBorder="0"
                >
                </iframe>

                <div className={styles.likeDislikeBtnWrapper}>
                    <div className={styles.likeBtnWrapper}>
                        <button onClick={handleToggleLike}>
                            <div className={styles.btnWrapper}>
                                <Like selected={toggleLike} />
                            </div>
                        </button>
                    </div>
                    <button onClick={handleToggleDisLike}>
                        <div className={styles.btnWrapper}>
                            <DisLike selected={toggleDisLike} />
                        </div>
                    </button>
                </div>
                <div
                    className={styles.modalBody}
                >
                    <div
                        className={styles.modalBodyContent}
                    >
                        <div
                            className={styles.col1}
                        >
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>

                        <div className={styles.col2}>
                            <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                                <span className={styles.textColor}>
                                    Cast: 
                                </span>
                                <span className={styles.channelTitle}>
                                    {channelTitle}
                                </span>
                            </p>
                            
                            <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                                <span className={styles.textColor}>
                                    View Count: 
                                </span>
                                <span className={styles.channelTitle}>
                                    {viewCount}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Video;