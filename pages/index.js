import Head from "next/head";

import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import SectionCards from "@/components/card/section-cards";

import { getVideos, getPopularVideos, getWatchItAgainVideos } from "@/lib/videos";
import userRedirectUser from "@/utils/redirectUser";

export async function getServerSideProps(context) {
  // const userId = "did:ethr:0xf2266c6fe72F44Ceffd9791d252e6E4e9a20426F"
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweGYyMjY2YzZmZTcyRjQ0Q2VmZmQ5NzkxZDI1MmU2RTRlOWEyMDQyNkYiLCJwdWJsaWNBZGRyZXNzIjoiMHhmMjI2NmM2ZmU3MkY0NENlZmZkOTc5MWQyNTJlNkU0ZTlhMjA0MjZGIiwiZW1haWwiOiJhbWlhbm9hYnJldUBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwid2FsbGV0cyI6W10sImlhdCI6MTcxMjYyNDc4MSwiZXhwIjoxNzEzMjI5NTgxLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHhmMjI2NmM2ZmU3MkY0NENlZmZkOTc5MWQyNTJlNkU0ZTlhMjA0MjZGIn19.ySN6HOijQPjmVSQ_6zwJ2eq965z_3ssTBC23UxCRqas"

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
