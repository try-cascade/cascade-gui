import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Setup.module.css'
import ContainerInput from './ContainerInput'

const ServiceForm = ({ appName, envName }) => {
  const [bodyList, setBodyList] = useState([{ app: appName, env: envName, service: "", image: "", port: "", type: "backend/frontend", frontFacingPath: "path" }]);
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bodyList)
    };

    await fetch('http://localhost:3005/aws/service', requestOptions)

    router.push('/')
  }

  function handleClickPlus() {
    setBodyList([...bodyList, { app: appName, env: envName, service: "", image: "", port: "", type: "backend/frontend", frontFacingPath: "path" }])
  }

  function handleClickMinus() {
    const list = [...bodyList];
    if (bodyList.length > 1) {
      setBodyList(list.slice(0, -1));
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
        {bodyList.map((_, idx) => <ContainerInput key={idx} app={appName} env={envName} bodyArr={bodyList} setBodyList={setBodyList}/>)}
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