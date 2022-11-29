import { useState } from "react"
import styles from '../styles/Setup.module.css'
import Button from "./Button"

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
    <div className="create-app-layout">
      <div className="progress">
        <span className={styles.dot}>1</span>
        <span>- - - - -</span>
        <span className={`${styles.dot} ${styles.selected}`}>2</span>
        <span>- - - - -</span>
        <span className={styles.dot}>3</span>
      </div>
      <div className={styles.mainContent}>
      <h1 className={styles.h1}>Provide Credentials</h1>
      {/* <h3>Provide Credentials</h3> */}
        <form onSubmit={handleSubmit} className="env-form">
          <div className="underline-input">
            <input type="text" value={envName[0]} onChange={(e) => handleChange(e, envName[1])} id="env" required/>
            <label htmlFor="env" className="form-label">Environment Name<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="key" type="password" value={key} onChange={(e) => handleChange(e, setKey)} required />
            <label htmlFor="key" className="form-label">AWS Access Key<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="secret" type="password" value={secretKey} onChange={(e) => handleChange(e, setSecretKey)} required />
            <label htmlFor="secret" className="form-label">AWS Secret Access Key<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="region" type="text" value={region} onChange={(e) => handleChange(e, setRegion)} required />
            <label htmlFor="region" className="form-label">AWS Region<span className="required">*</span>:</label>
          </div>
          <Button text="submit" />
        </form>


        {/* <h1 className={styles.h1}>Instrument Your Application</h1> */}
        <h3>Forgot to Instrument Your Application?</h3>
        <div className="instrumentation-instructions">
          <p>In your application that you wish to deploy install the cascade-agent package run</p>
          <code className="center">npm install cascade-agent</code>

          <p>Require cascade-agent and specify the name of the service at the top of each service's server code</p>
          <code className="center">require('cascade-agent')('my-service');</code>

          <p>The name you list for <code>'my-service'</code> will be how the service will be labeled on AWS X-Ray</p>

          <p>Make sure when instrumenting your different services that each one is instrumented using the same AWS credentials.</p>

          <p className={styles.p}><a href="https://github.com/try-cascade/cascade-agent" className={styles.link} target="_blank">Click here for more details.</a></p>
        </div>

        {/* <h3>Provide Credentials</h3>
        <form onSubmit={handleSubmit} className="env-form">
          <div className="underline-input">
            <input type="text" value={envName[0]} onChange={(e) => handleChange(e, envName[1])} id="env" />
            <label htmlFor="env" className="form-label">Environment Name:</label>
          </div>
          <div className="underline-input">
            <input id="key" type="text" value={key} onChange={(e) => handleChange(e, setKey)} required />
            <label htmlFor="key" className="form-label">AWS Access Key<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="secret" type="password" value={secretKey} onChange={(e) => handleChange(e, setSecretKey)} required />
            <label htmlFor="secret" className="form-label">AWS Secret Access Key<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="region" type="text" value={region} onChange={(e) => handleChange(e, setRegion)} required />
            <label htmlFor="region" className="form-label">AWS Region<span className="required">*</span>:</label>
          </div>
          <Button text="submit" />
        </form> */}
      </div>
    </div>
  )
}

export default EnvironmentForm