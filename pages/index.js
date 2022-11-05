
import EventSource from 'eventsource';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Dashboard.module.css'
import DashboardHeader from '../components/DashboardHeader';


export default function Home() {
  const [applications, setApplications] = useState([])
  const [addService, setAddService] = useState(false)
  const [viewService, setViewService] = useState(false) // think about this scaled for 10 different services
  const [containers, setContainers] = useState([])
  const [viewJsonModal, setViewJsonModal] = useState(false) // for view json button

  // env-stack (8 resources) -- use deployed
  const [vpc, setVpc] = useState(false)
  const [routeTable, setRouteTable] = useState(false)
  const [gateway, setGateway] = useState(false)
  const [route, setRoute] = useState(false)
  const [pubSub1, setPubSub1] = useState(false)
  const [pubSub2, setPubSub2] = useState(false)
  const [routeTableAssoc1, setRouteTableAssoc1] = useState(false)
  const [routeTableAssoc2, setRouteTableAssoc2] = useState(false)

  // service-stack (11 resources) -- how to set them true when it's already deployed?
  const [logGroup, setLogGroup] = useState(false)
  const [albTargetGroup, setAlbTargetGroup] = useState(false)
  const [taskRole, setTaskRole] = useState(false)
  const [executionRole, setExecutionRole] = useState(false)
  const [taskDefinition, setTaskDefinition] = useState(false)
  const [securityGroup, setSecurityGroup] = useState(false)
  const [ecsCluster, setEcsCluster] = useState(false)
  const [albSecurityGroup, setAlbSecurityGroup] = useState(false)
  const [loadBalancer, setLoadBalancer] = useState(false)
  const [albListener, setAlbListener] = useState(false)
  const [ecsService, setEcsService] = useState(false)

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

  const handleViewJSON = () => {
    setViewJsonModal(!viewJsonModal)
  }

  const checkVpcStatus = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, region, credentials } = await response.json();
    // filter[]
    // filter { name: tag, value: { Name: vpcName }}
    // filter { name: state, value: "available" }
    const input = {
      Filters: [
        { 
          name: "tag", 
          value: { Name: `cs-${envName}-vpc` }
        }
      ]
    }
    const client = new EC2Client({ region, credentials });
    const command = new DescribeVpcsCommand(input);
    const res = await client.send(command);
    console.log(res.Vpcs, "<--- all Vpcs")
    console.log(res.Vpcs[0].State, "<--- response from AWS") // if length === 1; if res.Vpcs[0].State === "available", then it's there
  }

  const notReady = {
    backgroundColor: 'red'
  }

  const ready = {
    backgroundColor: 'green'
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
        <DashboardHeader onViewJson={handleViewJSON}/>
        <div className={styles.envDetails}>
          <dl className={styles.envContainer}>
            <div>
              <dt><h3>Environment Name</h3></dt>
              <dd>Name</dd>
            </div>
            <div>
              <dt><h3>Deployment Status</h3></dt>
              <dd>Status</dd>
            </div>
            <div>
              <dt><h3>Last Updated</h3></dt>
              <dd>Date</dd>
            </div>
          </dl>
          <div className="stacks">
            <h2>Stacks</h2>
            <div className="env">
              <h3>Environment stack</h3>
              <ul>
                <li style={vpc ? ready : notReady}>vpc</li>
                <li style={routeTable ? ready : notReady}>route table</li>
                <li style={gateway ? ready : notReady}>gateway</li>
                <li style={route ? ready : notReady}>route</li>
                <li style={pubSub1 ? ready : notReady}>public subnet 1</li>
                <li style={pubSub2 ? ready : notReady}>public subnet 2</li>
                <li style={routeTableAssoc1 ? ready : notReady}>route table associations 1</li>
                <li style={routeTableAssoc2 ? ready : notReady}>route table associations 2</li>
              </ul>
            </div>
            <div className="service">
              <h3>Service stack</h3>
              <ul>
                <li style={logGroup ? ready : notReady}>loggroup</li>
                <li style={albTargetGroup ? ready : notReady}>alb target group</li>
                <li style={taskRole ? ready : notReady}>task role</li>
                <li style={executionRole ? ready : notReady}>execution role</li>
                <li style={taskDefinition ? ready : notReady}>task definition</li>
                <li style={securityGroup ? ready : notReady}>security group</li>
                <li style={albSecurityGroup ? ready : notReady}>alb security group</li>
                <li style={ecsCluster ? ready : notReady}>ecs cluster</li>
                <li style={loadBalancer ? ready : notReady}>load balancer</li>
                <li style={albListener ? ready : notReady}>alb listener</li>
                <li style={ecsService ? ready : notReady}>esc service</li>
              </ul>
            </div>
          </div>
        </div>




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
          <div>
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
