import { useState } from "react"
import styles from '../styles/Setup.module.css'

const EnvironmentForm = ( { onSubmit, appName, envName } ) => {
  const [key, setKey] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [region, setRegion] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      app: appName,
      env: envName[0],
      accessKey: key,
      region,
      secretKey
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    };

    await fetch('http://localhost:3005/aws/environment', requestOptions)

    onSubmit(true)
  }

  async function handleChange(e, setter) {
    await setter(e.target.value)
  }

  return (
    <>
      <div className={styles.progress}>
        <span className={styles.dot}>1</span>
        <span>- - - - -</span>
        <span className={`${styles.dot} ${styles.selected}`}>2</span>
        <span>- - - - -</span>
        <span className={styles.dot}>3</span>
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.h1}>Instrument Your Application(s)</h1>
        <p className={styles.p}>Make sure to follow the instructions in this <a href="https://github.com/try-cascade/cascade-agent" className={styles.link} target="_blank">repo</a> to instrument your applications.</p>
        <p className={styles.p}> Provide the AWS credentials you used for instrumentation:</p>
        <form onSubmit={handleSubmit} className={`${styles.form} ${styles.credentials}`}>
          <label>
            Environment Name:
            <input type="text" value={envName[0]} onChange={(e) => handleChange(e, envName[1])} />
          </label>
          <label>
            AWS_ACCESS_KEY_ID<span className={styles.req}>*</span>:
            <input type="text" value={key} onChange={(e) => handleChange(e, setKey)} required />
          </label>
          <label>
          AWS_SECRET_ACCESS_KEY<span className={styles.req}>*</span>:
            <input type="password" value={secretKey} onChange={(e) => handleChange(e, setSecretKey)} required />
          </label>
          <label>
          AWS_REGION<span className={styles.req}>*</span>:
            <input type="text" value={region} onChange={(e) => handleChange(e, setRegion)} required />
          </label>
          <input className={styles.button} type="submit" />
        </form>
      </div>
    </>
  )
}

export default EnvironmentForm