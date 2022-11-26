import { useEffect, useState } from 'react'

import styles from '../styles/Services.module.css'
import ApplicationForm from '../components/ApplicationForm'
import EnvironmentForm from '../components/EnvironmentForm'
import ServiceForm from '../components/ServiceForm'

const Welcome = () => {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [environmentSubmitted, setEnvironmentSubmitted] = useState(false)

  const [appName, setAppName] = useState('')
  const [envName, setEnvName] = useState('')

  return (
    <main className={styles.main}>
      { !applicationSubmitted ? <ApplicationForm onSubmit={setApplicationSubmitted} appName={[appName, setAppName]} /> : null }
      { applicationSubmitted && !environmentSubmitted ? <EnvironmentForm onSubmit={setEnvironmentSubmitted} appName={appName} envName={[envName, setEnvName]} /> : null }
      { environmentSubmitted ? <ServiceForm appName={appName} envName={envName} /> : null}
    </main>
  )
}

export default Welcome