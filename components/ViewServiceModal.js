import styles from '../styles/ServiceModal.module.css'

const ViewServiceModal = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={() => onClick(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value="name" />
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image" value="image link" />
          <label htmlFor="port">Port:</label>
          <input type="text" id="port" name="port" value="port" />
          <div>
            <h1>Configurations:</h1>
            <p>
              Environment  Tasks     CPU (vCPU)  Memory (MiB)  Platform      Port
              -----------  -----     ----------  ------------  --------      ----
              test         1         0.25        512           LINUX/X86_64  5000
            </p>
            <p>
              Routes:
              Environment  URL
              -----------  ---
              test         http://nat-t-Publi-1A2OGKQFNJ6EN-616175783.us-east-1.elb.amazonaws.com
            </p>
            <p>
              Service Discovery:
              Environment  URL
              -----------  ---
              test         http://nat-t-Publi-1A2OGKQFNJ6EN-616175783.us-east-1.elb.amazonaws.com
            </p>
            <p>
              Tags:
              Name                                Container  Environment  Value
              ----                                ---------  -----------  -----
              COPILOT_APPLICATION_NAME            cat        test         nat
              COPILOT_ENVIRONMENT_NAME              "          "          test
              COPILOT_LB_DNS                        "          "          nat-t-Publi-1A2OGKQFNJ6EN-616175783.us-east-1.elb.amazonaws.com
              COPILOT_SERVICE_DISCOVERY_ENDPOINT    "          "          test.nat.local
              COPILOT_SERVICE_NAME                  "          "          cat
            </p>

            <h1>Status</h1>
            <p>
              Task Summary

                Running   ██████████  1/1 desired tasks are running
                Health    ██████████  1/1 passes HTTP health checks
            </p>
            <p>
              Tasks

                ID        Status      Revision    Started At  HTTP Health
                --        ------      --------    ----------  -----------
                e3bfc054  RUNNING     1           5 days ago  HEALTHY
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ViewServiceModal

/*
ype:

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