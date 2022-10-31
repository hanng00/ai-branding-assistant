import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Brandio from '../components/brandio'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Brand.io | AI Driven Marketing</title>
        <meta name="description" content="Generate AI branding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Brandio />
    </div>
  )
}
