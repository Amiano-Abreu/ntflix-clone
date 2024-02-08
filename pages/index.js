import Head from "next/head";

import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import Card from "@/components/card/card";
import SectionCards from "@/components/card/section-cards";

export default function Home() {
  const disneyVideos = [
    {
      imgUrl: "/static/banner.webp",
    },
    {
      imgUrl: "/static/banner.webp",
    },
    {
      imgUrl: "/static/banner.webp",
    },
  ]

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <NavBar 
          username="amianoabreu@gmail.com"
        />

        <Banner 
          title="Clifford the red dog" 
          subTitle="a very cute dog" 
          imgUrl="/static/banner.webp" 
        />
      
        <div className={styles.sectionWrapper}>
          <SectionCards 
            title="disney" 
            videos={disneyVideos} 
            size="large"  
          />
          <SectionCards 
            title="disney" 
            videos={disneyVideos} 
            size="medium"  
          />
        </div>
      </main>
    </>
  );
}
