import styles from '../styles/Services.module.css'

export default function Services() {
  const date = new Date

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>Services</h1>
        <button>Create</button>
        <button>Delete</button>
        <button>Package</button>
        <button>Deploy</button>
        <button>Pause</button>
        <button>Resume</button>
        <input type='text' value='search' />
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>State</th>
                <th>Application</th>
                <th>Environment</th>
                <th>Image</th>
                <th>Created</th>
                <th>IP address</th>
                <th>Port</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" id={"service_name?"} name={"service_name?"} checked /></td>
                <td><label htmlFor={"service_name?"}>{"service_name?"}</label></td>
                <td>Running</td>
                <td>App Name</td>
                <td>Env Name</td>
                <td>Image</td>
                <td>{date.getFullYear()}</td>
                <td>0.0.0.0</td>
                <td>3000</td>
                <td>43577642</td>
                <td>Eye icon</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

/*
Notes about services:
  Think some information will be displayed, but some information like status will only be represented by a healthy or not healthy icon.
  To see more information the user can click on the div and it will expand to show status and like tags

  Not sure how to deal with logs and traces:
    - should traces be listed at the application level to view? Since getting an overview of the application?
    - Logs in copilot are viewed directly in the console. Should we give users the ability to see the logs from our UI?
        - but if we do that would it be weird to not see traces?


Type:

            Configurations:
            Environment  Tasks     CPU (vCPU)  Memory (MiB)  Platform      Port
            -----------  -----     ----------  ------------  --------      ----
            test         1         0.25        512           LINUX/X86_64  5000

            Routes:
            Environment  URL
            -----------  ---
            test         http://nat-t-Publi-1A2OGKQFNJ6EN-616175783.us-east-1.elb.amazonaws.com

            Service Discovery:
            Environment  URL
            -----------  ---
            test         http://nat-t-Publi-1A2OGKQFNJ6EN-616175783.us-east-1.elb.amazonaws.com

            Tags:
            Name                                Container  Environment  Value
            ----                                ---------  -----------  -----
            COPILOT_APPLICATION_NAME            cat        test         nat
            COPILOT_ENVIRONMENT_NAME              "          "          test
            COPILOT_LB_DNS                        "          "          nat-t-Publi-1A2OGKQFNJ6EN-616175783.us-east-1.elb.amazonaws.com
            COPILOT_SERVICE_DISCOVERY_ENDPOINT    "          "          test.nat.local
            COPILOT_SERVICE_NAME                  "          "          cat

            Status
            Task Summary

              Running   ██████████  1/1 desired tasks are running
              Health    ██████████  1/1 passes HTTP health checks

            Tasks

              ID        Status      Revision    Started At  HTTP Health
              --        ------      --------    ----------  -----------
              e3bfc054  RUNNING     1           5 days ago  HEALTHY
*/