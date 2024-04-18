import Head from "next/head";

import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import SectionCards from "@/components/card/section-cards";

import { getVideos, getPopularVideos, getWatchItAgainVideos } from "@/lib/videos";
import userRedirectUser from "@/utils/redirectUser";

export async function getServerSideProps(context) {

  const { userId, token } = await userRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }
  
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");

  const polularVideos = await getPopularVideos();

  return {
    props: {
      watchItAgainVideos: watchItAgainVideos || null,
      disneyVideos,
      productivityVideos,
      travelVideos,
      polularVideos
    }
  }
}

export default function Home({ 
  disneyVideos, 
  productivityVideos, 
  travelVideos,
  polularVideos,
  watchItAgainVideos = []
}) {

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar 
          username="amianoabreu@gmail.com"
        />

        <Banner 
          videoId="n1oUspMuUgk"
          title="Isle of man TT" 
          subTitle="Closing film 2023" 
          imgUrl="/static/isle.jpg" 
        />
      
        <div className={styles.sectionWrapper}>
          <SectionCards 
            title="Disney" 
            videos={disneyVideos} 
            size="large"  
          />
          <SectionCards 
            title="Watch it again" 
            videos={watchItAgainVideos} 
            size="small"  
          />
          <SectionCards 
            title="Travel" 
            videos={travelVideos} 
            size="small"  
          />
          <SectionCards 
            title="Productivity" 
            videos={productivityVideos} 
            size="medium"  
          />
          <SectionCards 
            title="Popular" 
            videos={polularVideos} 
            size="small"  
          />
        </div>
      </div>
    </div>
  );
}
