import Button from "./Button"
import styles from '../styles/Dashboard.module.css'

const DashboardHeader = ({ onViewJSON, handleDeploy, handleDestroy, deployed }) => {
  const handleVisitCloudWatch = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, region } = await response.json();

    window.open(`https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/ecs$252Fcs-${envName}-loggroup`, '_blank');
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
        <Button text="View JSON" onClick={onViewJSON} />
        {deployed ? <Button text="View CloudWatch Logs" onClick={handleVisitCloudWatch} /> : null}
        {deployed ? <Button text="Visit Site" onClick={handleVisitSite} /> : null}
        {deployed ? <Button text="View X-ray Traces" onClick={handleVisitXray} /> : null}
      </div>
    </header>
  )
}

export default DashboardHeader