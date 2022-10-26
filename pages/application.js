import styles from '../styles/Services.module.css'

export default function Application() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>Application</h1>
        <h3>An application is an outer name for a collection of services and environments.</h3>
        <button>create</button>
        <p>Name of app</p>
        List of related environments
        List of related services
      </div>
    </main>
  )
}