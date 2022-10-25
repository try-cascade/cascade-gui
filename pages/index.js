
// import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <button className={styles.button}>
          Application
        </button>
        <button className={styles.button}>
          Environments
        </button>
        <button className={styles.button}>
          Services
        </button>
      </div>
    </main>
  )
}

/*
If a user doesn't have any applications set up should the main page ask if they would like to set one up?
Or always show the buttons?

deal with plural words
*/
