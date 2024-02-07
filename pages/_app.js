import "@/styles/globals.css";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
})

export default function App({ Component, pageProps }) {
  return (
    <main className={`${robotoSlab.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
