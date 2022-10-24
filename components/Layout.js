import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import styles from "../styles/Layout.module.css"

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Cascade GUI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.headers}>
        <div className={styles.logoBox}>
          <div className={styles.diagonal}></div>
        </div>
        Hello
      </header>
      <div className={styles.main}>
        <nav className={styles.sidebar}>

        </nav>
        {children}
      </div>
      <footer>

      </footer>
    </div>
  )
}

export default Layout