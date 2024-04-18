import SectionCards from "@/components/card/section-cards"
import NavBar from "@/components/nav/navbar"
import Head from "next/head"

import styles from "../../styles/MyList.module.css"
import { getMyList } from "@/lib/videos"
import userRedirectUser from "@/utils/redirectUser"

export async function getServerSideProps(context) {
    
    const { userId, token } = await userRedirectUser(context)

    if (!userId) {
      return {
        props: {},
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const videos = await getMyList(userId, token)

    // console.log({ myList: videos})
    
    return {
        props: {
            myListVideos: videos
        }
    }
}

const MyList = ({myListVideos}) => {
    return (
        <>
            <Head>
                <title>My List</title>
            </Head>
            <main className={styles.main}>
                <NavBar />
                <div className={styles.sectionWrapper}>
                    <SectionCards 
                        title="My List"
                        size="small"
                        videos={myListVideos}
                        shouldWrap={true}
                        shouldScale={false}
                    />
                </div>
            </main>
        </>
    )
}

export default MyList