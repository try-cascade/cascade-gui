import styles from '../styles/Setup.module.css'
import Button from './Button';

const ApplicationForm = ( { onSubmit, appName } ) => {
  async function handleSubmit(e) {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name: appName[0] })
    };

    await fetch('http://localhost:3005/aws/bucket', requestOptions)

    onSubmit(true)
  }

  async function handleChange(e) {
    await appName[1](e.target.value)
  }

  return (
    <div className="create-app-layout">
      <div className="progress">
        <span className={`${styles.dot} ${styles.selected}`}>1</span>
        <span>- - - - -</span>
        <span className={styles.dot}>2</span>
        <span>- - - - -</span>
        <span className={styles.dot}>3</span>
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.h1}>Create an Application</h1>
        <p className={styles.p}>This will create an s3 bucket in your AWS account to store all necessary information for your application.</p>
        <form className="app-form" onSubmit={handleSubmit}>
        <div className="underline-input">
          <input className={styles.input} type="text" value={appName[0]} onChange={handleChange} id="app"/>
          <label for="app" className="form-label">Application Name:</label>
        </div>
          <Button text="Submit" />
        </form>
      </div>
    </div>
  )
}

export default ApplicationForm