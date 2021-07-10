import Head from 'next/head'
import Image from 'next/image'
import { Departures } from '../components/Departures'

export default function Home() {
  return (
    <>
      <Head>
        <title>Departures Display</title>
      </Head>
      <main>
        <h1>
          Abfahren für S+U Pankow
        </h1>
        <Departures />
      </main>
    </>
  )
}
