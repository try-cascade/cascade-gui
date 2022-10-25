
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Link href="/application">
          <button className={styles.button}>
            Application
          </button>
        </Link>
        <Link href="/environment">
          <button className={styles.button}>
            Environments
          </button>
        </Link>
        <Link href="/services">
          <button className={styles.button}>
            Services
          </button>
        </Link>
      </div>
    </main>
  )
}

/*
If a user doesn't have any applications set up should the main page ask if they would like to set one up?
Or always show the buttons?

To Do:
deal with plural words
Create a 404 not found page
*/
