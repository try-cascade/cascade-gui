import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Setup.module.css';
import ContainerInput from './ContainerInput';
import Button from './Button';

const ServiceForm = ({ appName, envName }) => {
  const [bodyList, setBodyList] = useState([{ app: appName, env: envName, service: "", image: "", port: "", type: "backend/frontend", frontFacingPath: "path" }]);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bodyList)
    };

    await fetch('http://localhost:3005/aws/service', requestOptions);

    router.push('/');
  }

  function handleClickPlus() {
    setBodyList([...bodyList, { app: appName, env: envName, service: "", image: "", port: "", type: "backend/frontend", frontFacingPath: "path" }]);
  }

  function handleClickMinus() {
    const list = [...bodyList];
    if (bodyList.length > 1) {
      setBodyList(list.slice(0, -1));
    }
  }

  return (
    <div className="create-app-layout">
      <div className="progress">
        <span className={styles.dot}>1</span>
        <span>- - - - -</span>
        <span className={styles.dot}>2</span>
        <span>- - - - -</span>
        <span className={`${styles.dot} ${styles.selected}`}>3</span>
      </div>
      <h1 className={styles.h1}>Add Containers</h1>
      <div className='add-remove-btns'>
        <div>
          <Button text="+" onClick={handleClickPlus} />
        </div>
        <div>
          <Button text="-" onClick={handleClickMinus} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="container-form">
        {bodyList.map((_, idx) => <ContainerInput key={idx} app={appName} env={envName} bodyArr={bodyList} setBodyList={setBodyList}/>)}
        <Button text="Submit"/>
      </form>
    </div>
  );
}

export default ServiceForm;