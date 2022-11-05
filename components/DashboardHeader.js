import Button from "./Button"
import styles from '../styles/Dashboard.module.css'
import { useState } from "react"

const DashboardHeader = ({ onViewJSON }) => {
  const [deployed, setDeployed] = useState(true)

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

  const handleDeploy = () => {
    streamTfData('msg', 'Creation', true);
    setDeployed(true);
  }

  const handleDestroy = () => {
    streamTfData('destroy', 'Destruction', false)
    setDeployed(false);
  }

  const handleVisitCloudWatch = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, region } = await response.json();

    window.open(`https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/$252Fecs$252Fcs-${envName}-loggroup`, '_blank');
  }

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

  return (
    <header className={styles.header}>
      <h1>Application Dashboard</h1>
      <div className={styles.buttons}>
        <Button text="Deploy Stack" onClick={handleDeploy}/>
        <Button text="Destroy Stack" onClick={handleDestroy} color={styles.destroy}/>
        <Button text="View JSON" onClick={onViewJSON}/>
        {deployed ? <Button text="View CloudWatch Logs" onClick={handleVisitCloudWatch} /> : null}
        {deployed ? <Button text="Visit Site" onClick={handleVisitSite} /> : null}
        {deployed ? <Button text="View X-ray Traces" onClick={handleVisitXray} /> : null}
      </div>
    </header>
  )
}

export default DashboardHeader