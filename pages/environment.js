import styles from '../styles/Services.module.css'
import { useState } from 'react'
import AddEnvironmentModal from '../components/AddEnvironmentModal'

export default function Environments() {
  const [add, setAdd] = useState(false)

  return (
    <>
      {add ? <AddEnvironmentModal onClick={() => setAdd(false)} /> : null}
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Environments</h1>
          <button onClick={() => setAdd(true)}>Create</button>
          <h2>Test</h2>
          <button>Download Terraform file</button>
          <p>Envi Name, Region, Account ID</p>
          <h4>Services</h4>
          <table>
            <thead>
              <tr>
                <th>id -- Link to service page with this service on top or open?</th>
                <th>service name</th>
                <th>service type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4543254</td>
                <td>Shop</td>
                <td>Front end</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <h4>Tags</h4>
            <li>Office</li>
          </ul>
          <h2>Production</h2>
          <button>Download Terraform file</button>
          <p>Envi Name, Region, Account ID</p>
          <h4>Services</h4>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>service name</th>
                <th>service type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4543254</td>
                <td>Shop</td>
                <td>Front end</td>
              </tr>
            </tbody>
          </table>
          <ul>
            <h4>Tags</h4>
            <li>Office</li>
          </ul>
        </div>
      </main>
    </>
  )
}

/*
  Options
   - Name
   - region
   - account ID
   - list of services + service type
   - Tags
*/