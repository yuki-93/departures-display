import Head from 'next/head'
import { Departures } from '../components/Departures'

export default function Home() {
  return (
    <>
      <Head>
        <title>Departures Display</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css" />
      </Head>
      <main style={{fontFamily: "'Open Sans', sans-serif", fontStyle: "normal", fontSize: "13px"}}>
        <h1 style={{margin: "20px"}}>
          Abfahren für S+U Pankow
        </h1>
        <Departures />
      </main>
    </>
  )
}
