import styles from '../styles/Setup.module.css'
import { useState } from 'react'

export function ContainerInput() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('')
  const [envVars, setEnvVars] = useState('')

  return (
    <div className={`${styles.form} ${styles.containers}`}>
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
    </div>
  )
}

export default ContainerInput