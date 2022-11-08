
import { useEffect, useState, useReducer } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Dashboard.module.css'
import DashboardHeader from '../components/DashboardHeader';
import DashboardEnv from '../components/DashboardEnv';
import DashboardContainers from '../components/DashboardContainers';

import { reducer, initialState } from '../utilis/state.js'
import { streamTfData } from '../utilis/event';

// thinking about a setReducer
export default function Home() {
  const [_, setApplications] = useState(false)
  const [viewJsonModal, setViewJsonModal] = useState(false) // for view json button
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDeploy = () => {
    streamTfData('msg', 'Creation', true);
    dispatch({type: "deploy"})
  }

  const handleDestroy = () => {
    streamTfData('destroy', 'Destruction', false)
    dispatch({type: "destroy"})
  }

  const router = useRouter()

  useEffect(() => {
    async function getApplications() {
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
  })

  const handleViewJSON = () => {
    setViewJsonModal(!viewJsonModal)
  }



  // test view json button
  const Modal = () => {
    return (
      <p> test: this is a Modal! </p>
    )
  }

  return (
    <>
      {viewJsonModal ? <Modal/> : null }
      <main className={styles.main}>
        <DashboardHeader onViewJson={handleViewJSON} handleDeploy={handleDeploy} handleDestroy={handleDestroy} deployed={state.deployed}/>
        <DashboardEnv state={state}/>
        <DashboardContainers />
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
