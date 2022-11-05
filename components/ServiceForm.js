// import { useEffect } from "react"
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Setup.module.css'

const ServiceForm = ({ appName, envName }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('')
  const [envVars, setEnvVars] = useState('')

  const router = useRouter()

  /*
  Payload:
{
  "app": "name"
  "env": "name"
  "service": "name"
  "image": "path"
  "port": "3000"
  "type": "backend/frontend"
  "frontFacingPath": "path"
  "var": [
    "key=value",
  ]
}
*/
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

  const handleAddEnvClick = (e) => {
    e.preventDefault()

    setEnvInputs(envInputs++)
  }

  return (
    <>
      <div className={styles.progress}>
        <span className={styles.dot}>1</span>
        <span>- - - - -</span>
        <span className={styles.dot}>2</span>
        <span>- - - - -</span>
        <span className={`${styles.dot} ${styles.selected}`}>3</span>
      </div>
      <h1 className={styles.h1}>Add Containers</h1>
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
        {/* <button className={styles.button} onClick={handleAddEnvClick}>Add env variables</button> */}
        <label>
          Environment Variables:
          <textarea onChange={(e) => setEnvVars(e.target.value)} placeholder="Key=Value, Key=Value... ">{envVars}</textarea>
        </label>
        <input className={styles.button} type="submit" />
      </form>
    </>
  )
}

export default ServiceForm

/*
Your environment is being created, let's finish up by adding a service.
  - What would you like to name your service? (input)
  - Could you provide the image link? (input)
  - Port? (input)
  - What type of app? backend/frontend (dropdown)
    - if frontend
      - what path would you like this service to be on?
  - Would you like to add any private variables? + with toggle (inputs)
*/