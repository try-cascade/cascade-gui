
// import Image from 'next/image'
import { ElasticLoadBalancingV2 as ELBv2, DescribeLoadBalancersCommand } from "@aws-sdk/client-elastic-load-balancing-v2"
import { useEffect, useState } from 'react'
import AddServiceModal from '../components/AddServiceModal'
import ViewServiceModal from '../components/ViewServiceModal'
import { useRouter } from 'next/router'
import styles from '../styles/Services.module.css'

export default function Home() {
  const [applications, setApplications] = useState([])
  const [addService, setAddService] = useState(false)
  const [viewService, setViewService] = useState(false) // think about this scaled for 10 different services
  const [containers, setContainers] = useState([])
  const [deployed, setDeployed] = useState(true)

//   {
//     "name": "bakery",
//     "port": 3000,
//     "image": "/container",
//     "s3Arn": "arn:aws:s3:::cascade-cat-034591612793/test/bakery/.env"
// },

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
    async function getApplications() {
      const response = await fetch('http://localhost:3005/aws/services');
      const data = await response.json()

      setContainers(data.containers)
    }

    getApplications()
  }, [])

  const handleDeploy = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    };

    // await fetch('http://localhost:3005/terraform/generate', requestOptions)
    await fetch('http://localhost:3005/terraform/deploy', requestOptions)
    setDeployed(true);
  }

  const handleDestroy = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    };

    await fetch('http://localhost:3005/terraform/destroy', requestOptions)
    setDeployed(false);
    // change button color to red
    // have a pop up to confirm destroy
  }

  // we want the user to visit cloudwatch, check if the app is up and running
  // then we want the user to visit the site
  // then we want the user to visit X-Ray to view traces of their first visit
  const handleVisitSite = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, region, credentials } = await response.json();

    const client = new ELBv2({ region, credentials });
    
    const command = new DescribeLoadBalancersCommand({ Names: [`cs-${envName}-lb`]});
    const res = await client.send(command)
    const dnsName = res.LoadBalancers[0].DNSName;

    window.open(`http://${dnsName}`, '_blank');
  }

  const handleVisitXray = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { region } = await response.json();

    window.open(`https://${region}.console.aws.amazon.com/xray/home?region=${region}#/traces`, '_blank');
  }

  const handleVisitCloudWatch = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, region } = await response.json();

    window.open(`https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/$252Fecs$252Fcs-${envName}-loggroup`, '_blank');
  }

  return (
    <>
      {addService ? <AddServiceModal onClick={setAddService}/> : null}
      {viewService ? <ViewServiceModal onClick={setViewService}/> : null}
      <main className={styles.main}>

        <div className={styles.content}>
          <h1>Application</h1>
          <button onClick={handleDeploy}>Deploy Stack</button>
          <button onClick={handleDestroy}>Destroy Stack</button>
          <button>View JSON</button>
          {deployed ? <button onClick={handleVisitSite}>Visit Site</button> : null}
          {deployed ? <button onClick={handleVisitXray}>View X-ray Traces</button> : null}
          {deployed ? <button onClick={handleVisitCloudWatch}>View CloudWatch Logs</button> : null}

          <h2>Environment</h2>
          <p>add a pic here</p>

          <h2>Containers</h2>
          <button onClick={() => setAddService(!addService)}>Add Container</button>
          <button>Delete Container</button>
          
          <input type='text' value='search' />
          <div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Port</th>
                </tr>
              </thead>
              <tbody>
                {containers.map(container => {
                  return (
                    <tr key={container.name}>
                    <td><input type="checkbox" id={container.name} name={container.name} /></td>
                      <td>{container.name}</td>
                      <td>{container.image}</td>
                      <td>{container.port}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
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
