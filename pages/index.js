
import { useEffect, useState, useReducer } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Dashboard.module.css'
import DashboardHeader from '../components/DashboardHeader';
import DashboardEnv from '../components/DashboardEnv';
import DashboardContainers from '../components/DashboardContainers';
import JsonModal from '../components/JsonModal';

import { reducer, initialState } from '../utils/state.js'
import { streamTfData } from '../utils/event';


const AddContainerModal = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('')
  const [envVars, setEnvVars] = useState('')

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
    <div className="modal-background" onClick={() => setViewAddContainerModal(!viewAddContainerModal)}>
      <div className='modal' onClick={(e) => e.stopPropagation() }>
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

// thinking about a setReducer
export default function Home() {
  const [_, setApplications] = useState(false)
  const [viewJsonModal, setViewJsonModal] = useState(false) // for view json button
  const [viewAddContainerModal, setViewAddContainerModal] = useState(false) // for add container button
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDeploy = () => {
    streamTfData('msg', 'Creation', true, dispatch);
    dispatch({type: "deploy"})
  }

  const handleDestroy = () => {
    streamTfData('destroy', 'Destruction', false, dispatch)
    dispatch({type: "destroy"})
  }

  const router = useRouter()

  useEffect(() => {
    async function getApplications() {
      console.log("testing getapplications function")
      const response = await fetch('http://localhost:3005/aws/applications');
      const data = await response.json()

      setApplications(data.applications)

      if (data.applications.length === 0) {
        router.push('/welcome')
      }
    }

    getApplications()
  }, [])

  useEffect(() => {
    const checkVpcStatus = async () => {
      const response = await fetch('http://localhost:3005/aws/vpc');
      const vpc = await response.json()

      if (vpc.vpc) {
        dispatch({type: "exists"});
      } else {
        dispatch({type: "not yet created"})
      }
    }

    checkVpcStatus()
  }, [])

  const handleViewJSON = () => {
    setViewJsonModal(!viewJsonModal)
  }

  const handleViewAddContainer = () => {
    setViewAddContainerModal(!viewAddContainerModal)
  }
 

  return (
    <>
      {viewJsonModal ? <JsonModal onViewJSON={handleViewJSON}/> : null }
      {viewAddContainerModal ? <AddContainerModal /> : null }
      <main className={styles.main}>
        <DashboardHeader onViewJSON={handleViewJSON} handleDeploy={handleDeploy} handleDestroy={handleDestroy} deployed={state.deployed}/>
        <DashboardEnv state={state}/>
        <DashboardContainers onClick={handleViewAddContainer}/>
      </main>
    </>
  )
}

/*
If a user doesn't have any applications set up should the main page ask if they would like to set one up?
Or always show the buttons?

To Do:
deal with plural words
Create a 404 not found page
*/
