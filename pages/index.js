import Head from "next/head";

import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import SectionCards from "@/components/card/section-cards";

import { getVideos, getPopularVideos } from "@/lib/videos";

export async function getServerSideProps() {

  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");

  const polularVideos = await getPopularVideos();

  return {
    props: {
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
  polularVideos
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
          videoId="VWavstJydZU"
          title="Clifford the red dog" 
          subTitle="a very cute dog" 
          imgUrl="/static/banner.webp" 
        />
      
        <div className={styles.sectionWrapper}>
          <SectionCards 
            title="Disney" 
            videos={disneyVideos} 
            size="large"  
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
