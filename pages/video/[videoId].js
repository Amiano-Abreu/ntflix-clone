import { useRouter } from "next/router";

import Modal from "react-modal"

import styles from "../../styles/Video.module.css"
import { getVideoById } from "../../lib/videos";

Modal.setAppElement("#__next")

export async function getStaticProps(context) {

    // const video = {
    //     title: "hi cute dog",
    //     publishTime: "1990-01-01",
    //     description: "asdfasdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdfasdf asdf asdf asdf asdf asdf asdf asdf asdf",
    //     channelTitle: "Paramoutn Pictures",
    //     viewCount: 1000
    // }

    const videoId = context.params.videoId

    const videoArray = await getVideoById(videoId)

    console.log(videoArray)

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

    return (
        <div className={styles.container}>
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