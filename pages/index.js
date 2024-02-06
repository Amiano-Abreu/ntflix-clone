import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <h1>Netflix</h1>

        <Banner 
          title="Clifford the red dog" 
          subTitle="a very cute dog" 
          imgUrl="/static/GTR.jpg" 
        />
      
      </main>
    </>
  );
}
