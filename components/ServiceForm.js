// import { useEffect } from "react"
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Setup.module.css'
import ContainerInput from './ContainerInput'

const ServiceForm = ({ appName, envName }) => {
  const [counter, setCounter] = useState(1);

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

  function handleClickPlus() {
    setCounter(counter + 1);
  }

  function handleClickMinus() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
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
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        {Array.from(Array(counter)).map((_, idx) => <ContainerInput key={idx} />)}
        <div>
          <input onClick={handleClickPlus} className={styles.button} type="button" value="+" />
          <input onClick={handleClickMinus} className={styles.button} type="button" value="-" />
          <input className={styles.button} type="submit" />
        </div>
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