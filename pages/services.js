import styles from '../styles/Services.module.css'
import AddServiceModal from '../components/AddServiceModal'
import ViewServiceModal from '../components/ViewServiceModal'
import { useState } from 'react'

export default function Services() {
  const [addService, setAddService] = useState(false)
  const [viewService, setViewService] = useState(false) // think about this scaled for 10 different services
  const date = new Date

  return (
    <>
      {addService ? <AddServiceModal onClick={setAddService}/> : null}
      {viewService ? <ViewServiceModal onClick={setViewService}/> : null}
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Services</h1>
          <button onClick={() => setAddService(!addService)}>Create</button>
          <button>Delete</button>
          <button>Package</button>
          <button>Deploy</button>
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
                  <td><button onClick={() => setViewService(true)}>Eye icon</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
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

*/