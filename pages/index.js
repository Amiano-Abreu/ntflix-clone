import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";

export default function Home() {
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
      
      </main>
    </>
  );
}
