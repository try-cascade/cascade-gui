import styles from '../styles/Dashboard.module.css'

const DashboardEnv = ({ state }) => {
  return (
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
                      {resources}
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