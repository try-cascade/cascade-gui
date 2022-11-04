
// import Image from 'next/image'
import EventSource from 'eventsource';
// import { ElasticLoadBalancingV2 as ELBv2, DescribeLoadBalancersCommand } from "@aws-sdk/client-elastic-load-balancing-v2"
// import { EC2Client, DescribeVpcsCommand } from "@aws-sdk/client-ec2";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Services.module.css'

export default function Home() {
  const [applications, setApplications] = useState([])
  const [addService, setAddService] = useState(false)
  const [viewService, setViewService] = useState(false) // think about this scaled for 10 different services
  const [containers, setContainers] = useState([])
  const [deployed, setDeployed] = useState(true)

  // env-stack (8 resources) -- use deployed
  // - backend has a route for vpcStatus
  //   - vpc available then default state should be true
  //   - do we use useEffect? for initial rendering?
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
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    // };

    // await fetch('http://localhost:3005/terraform/generate', requestOptions)
    await streamTfData('msg', 'Creation', true); // can see data streaming on browser console
    // await fetch('http://localhost:3005/terraform/deploy', requestOptions)
    // await fetch('http://localhost:3005/terraform/msg') // testing with dummy route
    setDeployed(true);
  }

  const handleDestroy = async () => {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    // };

    // await fetch('http://localhost:3005/terraform/destroy', requestOptions)
    await streamTfData('destroy', 'Destruction', true)
    setDeployed(false);
    // change button color to red
    // have a pop up to confirm destroy
  }

  // we want the user to visit cloudwatch, check if the app is up and running
  // then we want the user to visit the site
  // then we want the user to visit X-Ray to view traces of their first visit
  const handleVisitSite = async () => {
    const response = await fetch('http://localhost:3005/aws/website');
    const url = await response.json()
    if (url.error) {
      console.log(url.error)
      return
    }
    window.open(url.url, '_blank');
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

  // checkVpcStatus();

  // SSE test
  const streamTfData = async (path, action, setBool) => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName } = await response.json();

    const source = new EventSource(`http://localhost:3005/terraform/${path}`); // GET request?
  
    source.onmessage = event => {
      console.log("received event");

      // env stack
      if (event.data.includes(`(cs-${envName}-vpc): ${action} complete`)) {
        setVpc(setBool)
      } else if (event.data.includes(`(cs-${envName}-table): ${action} complete`)) {
        setRouteTable(setBool)
      } else if (event.data.includes(`(cs-${envName}-internet-gateway): ${action} complete`)) {
        setGateway(setBool)
      } else if (event.data.includes(`(cs-${envName}-route): ${action} complete`)) {
        setRoute(setBool)
      } else if (event.data.includes(`(cs-${envName}-public-1): ${action} complete`)) {
        setPubSub1(setBool)
      } else if (event.data.includes(`(cs-${envName}-public-2): ${action} complete`)) {
        setPubSub2(setBool)
      } else if (event.data.includes(`(cs-${envName}-sub-assoc-1): ${action} complete`)) {
        setRouteTableAssoc1(setBool)
      } else if (event.data.includes(`(cs-${envName}-sub-assoc-2): ${action} complete`)) {
        setRouteTableAssoc2(setBool)
      } 
      // service stack
        else if (event.data.includes(`(ecs--cs-${envName}-loggroup): ${action} complete`)) {
        setLogGroup(setBool)
      } else if (event.data.includes(`(cs-${envName}-target-group): ${action} complete`)) {
        setAlbTargetGroup(setBool)
      } else if (event.data.includes(`(cs-${envName}-task-role): ${action} complete`)) {
        setTaskRole(setBool)
      } else if (event.data.includes(`(cs-${envName}-execution-role): ${action} complete`)) {
        setExecutionRole(setBool)
      } else if (event.data.includes(`(cs-${envName}-task-definition): ${action} complete`)) {
        setTaskDefinition(setBool)
      } else if (event.data.includes(`(cs-${envName}-security-group): ${action} complete`)) {
        setSecurityGroup(setBool)
      } else if (event.data.includes(`(cs-${envName}-alb-security-group): ${action} complete`)) {
        setAlbSecurityGroup(setBool)
      } else if (event.data.includes(`(cs-${envName}-cluster): ${action} complete`)) {
        setEcsCluster(setBool)
      } else if (event.data.includes(`(cs-${envName}-lb): ${action} complete`)) {
        setLoadBalancer(setBool)
      } else if (event.data.includes(`(cs-${envName}-alb-listener): ${action} complete`)) {
        setAlbListener(setBool)
      } else if (event.data.includes(`(cs-${envName}-service): ${action} complete`)) {
        setEcsService(setBool)
      }

      console.log(event.data, "<--- event data");
    };

    source.onerror = () => {
      console.error("EventSource failed.");
    };

    source.addEventListener('close', () => {
      console.log('Source Closed')
      source.close()
    });
  };

  const notReady = {
    backgroundColor: 'red'
  }

  const ready = {
    backgroundColor: 'green'
  }


  // streamTfData();

  return (
    <>
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
