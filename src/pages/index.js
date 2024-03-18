import Head from "next/head";
import Home from "@/components/pages/Home.js";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>BuilderFloor.com</title>
        <meta
          name="description"
          content="Start Exploring Your Dream - Builder Floor now"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
