import styles from '../styles/Dashboard.module.css'

const resourceTitles = {
  "vpc": "Virtual Private Cloud",
  "routeTable": "Route Table",
  "gateway": "Internet Gateway",
  "route": "Route",
  "pubSub1": "Public Subnet 1",
  "pubSub2": "Public Subnet 2",
  "routeTableAssoc1": "Route Table Association 1",
  "routeTableAssoc2": "Route Table Association 2",
  "logGroup": "CloudWatch Log Group",
  "albTargetGroup": "Target Group for Application Load Balancer",
  "executionRole": "IAM Execution Role",
  "taskDefinition": "ECS Task Definition",
  "securityGroup": "ECS Security Group",
  "ecsCluster": "ECS Cluster",
  "albSecurityGroup": "Application Load Balancer Security Group",
  "ecsService": "ECS Service",
  "taskRole": "IAM Task Role",
  "loadBalancer": "Application Load Balancer",
  "albListener": "Application Load Balancer Listener"
}

const DashboardEnv = ({ state, envName }) => {
  return (
    <div className={styles.envDetails}>
      <dl className={styles.envContainer}>
        <div>
          <dt><h3>Environment Name</h3></dt>
          <dd>{envName}</dd>
        </div>
        <div>
          <dt><h3>Deployment Status</h3></dt>
          <dd>{state.deployedState}</dd>
        </div>
        <div>
          <dt><h3>Last Updated</h3></dt>
          <dd>{state.time}</dd>
        </div>
      </dl>
      <div className="stacks">
        <h2>Stacks</h2>
          {Object.keys(state.post).map(stack => {
            return (
              <div key={stack} className={stack}>
                <h3>{stack[0].toUpperCase() + stack.slice(1)} stack</h3>
                <ul className="no-indent">
                {Object.keys(state.post[stack]).map(resources => {
                  return (
                    <li key={resources}>
                      { state.post[stack][resources] !== "loading" ?
                      <div className='circle'><span className={state.post[stack][resources]}></span></div> :
                      <span className={state.post[stack][resources]}></span> }
                      {resourceTitles[resources]}
                    </li>
                  )
                })}
                </ul>
             </div>
            )
          })}
      </div>
    </div>
  )
}

export default DashboardEnv