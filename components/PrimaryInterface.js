import styles from '../styles/Home.module.css'
import Link from 'next/link'

const PrimaryInterface = ({ applications }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Link href="/application">
          <button className={styles.button}>
            <p>{applications.length}</p>
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

export default PrimaryInterface