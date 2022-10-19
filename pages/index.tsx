import Head from 'next/head'
import { Departures } from '../components/Departures'

export default function Home() {
  return (
    <>
      <Head>
        <title>Departures Display</title>
      </Head>
      <main style={{fontFamily: "sans-serif", fontStyle: "normal", fontSize: "13px"}}>
        <Departures />
      </main>
    </>
  )
}
