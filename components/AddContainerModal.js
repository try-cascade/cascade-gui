import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Setup.module.css'

const AddContainerModal = ({ onClick }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('')
  const [envVars, setEnvVars] = useState('')

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = await fetch('http://localhost:3005/aws/services')
    const { appName, envName } = await data.json()

    const body = [{
      app: appName,
      env: envName,
      service: name,
      image,
      port,
      type: "frontend",
      frontFacingPath: "/",
      var: envVars.split(", ")
    }]

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    };

    await fetch('http://localhost:3005/aws/service', requestOptions)

    onClick()
    router.push('/') // what does this do? should this take us to the dashboard ('/')?
    // when submitted, S3 bucket is updated (services.json & new folder/.env)
    // - but it doesn't close the modal
    
    // - and the dashboard container doesn't reflect the updated array of containers (we need to setContainers)
  }

  return (
    <div className="modal-background" onClick={onClick}>
      <div className='container-modal add-container' onClick={(e) => e.stopPropagation() }>
        <h1 className='container-modal-h1'>Add Container</h1>
        <form onSubmit={handleSubmit} className={`${styles.form} ${styles.containers}`}>
        <label>
          Container Name<span className={styles.req}>*</span>:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Image Link<span className={styles.req}>*</span>:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>
        <label>
          Port<span className={styles.req}>*</span>:
          <input type="text" value={port} onChange={(e) => setPort(e.target.value)} required />
        </label>
        <label>
          Environment Variables:
          <textarea onChange={(e) => setEnvVars(e.target.value)} placeholder="Key=Value, Key=Value... " value={envVars} />
        </label>
        <input className={styles.button} type="submit" />
      </form>
      </div>
    </div>
  )
}

export default AddContainerModal;