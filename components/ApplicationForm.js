import styles from '../styles/Setup.module.css'

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
    <>
      <div className={styles.progress}>
        <span className={`${styles.dot} ${styles.selected}`}>1</span>
        <span>- - - - -</span>
        <span className={styles.dot}>2</span>
        <span>- - - - -</span>
        <span className={styles.dot}>3</span>
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.h1}>Create an Application</h1>
        <p className={styles.p}>Let's get you started!</p>
        <p className={styles.p}>We will create a bucket in your AWS account to store all the necessary information for your application.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Application Name:
            <input className={styles.input} type="text" value={appName[0]} onChange={handleChange}/>
          </label>
          <input className={styles.button} type="submit" />
        </form>
      </div>
    </>
  )
}

export default ApplicationForm