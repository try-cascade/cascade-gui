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

    const body = {
      app: appName,
      env: envName,
      service: name,
      image,
      port,
      type: "frontend",
      frontFacingPath: "/",
      var: envVars.split(", ")
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    };

    await fetch('http://localhost:3005/aws/service', requestOptions)

    router.push('/')
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
          <textarea onChange={(e) => setEnvVars(e.target.value)} placeholder="Key=Value, Key=Value... ">{envVars}</textarea>
        </label>
        <input className={styles.button} type="submit" />
      </form>
      </div>
    </div>
  )
}

export default AddContainerModal;