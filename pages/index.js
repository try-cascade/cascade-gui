
import { useEffect, useState, useReducer } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';
import DashboardHeader from '../components/DashboardHeader';
import DashboardEnv from '../components/DashboardEnv';
import DashboardContainers from '../components/DashboardContainers';
import JsonModal from '../components/JsonModal';
import AddContainerModal from '../components/AddContainerModal';

import { reducer, initialState } from '../utils/state.js';
import { streamTfData } from '../utils/event';

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [viewJsonModal, setViewJsonModal] = useState(false);
  const [viewAddContainerModal, setViewAddContainerModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [envName, setEnvName] = useState('');

  const handleDeploy = () => {
    streamTfData('msg', 'Creation', true, dispatch);
    dispatch({type: "deploy"});
  }

  const handleDestroy = () => {
    streamTfData('destroy', 'Destruction', false, dispatch)
    dispatch({type: "destroy"});
  }

  const router = useRouter();

  useEffect(() => {
    const getApplications = async () => {
      const response = await fetch('http://localhost:3005/aws/applications');
      const data = await response.json();

      setApplications(data.applications);

      if (applications.length === 0) {
        router.push('/welcome');
      }
    }

    getApplications();
  }, []);

  useEffect(() => {
    const checkVpcStatus = async () => {
      const response = await fetch('http://localhost:3005/aws/vpc');
      const vpc = await response.json();

      if (vpc.vpc) {
        dispatch({type: "exists"});
      } else {
        dispatch({type: "not yet created"});
      }
    }

    checkVpcStatus();
  }, []);

  useEffect(() => {
    const getEnvName = async () => {
      if (applications.length !== 0) {
        const response = await fetch('http://localhost:3005/aws/services');
        const { envName } = await response.json();

        setEnvName(envName);
      }
    }

    getEnvName();
  }, [])

  const handleViewJSON = () => {
    setViewJsonModal(!viewJsonModal);
  }

  const handleViewAddContainer = () => {
    setViewAddContainerModal(!viewAddContainerModal);
  }
 

  return (
    <>
      {viewJsonModal ? <JsonModal onViewJSON={handleViewJSON}/> : null }
      {viewAddContainerModal ? <AddContainerModal onClick={handleViewAddContainer}/> : null }
      <main className={styles.main}>
        <DashboardHeader onViewJSON={handleViewJSON} handleDeploy={handleDeploy} handleDestroy={handleDestroy} deployed={state.deployed}/>
        <DashboardEnv state={state} envName={envName} />
        <DashboardContainers viewAddContainerModal={viewAddContainerModal} onClick={handleViewAddContainer} applications={applications}/>
      </main>
    </>
  )
}
