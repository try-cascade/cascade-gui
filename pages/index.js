
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import AddServiceModal from '../components/AddServiceModal'
import ViewServiceModal from '../components/ViewServiceModal'
import { useRouter } from 'next/router'
import styles from '../styles/Services.module.css'

export default function Home() {
  const [applications, setApplications] = useState([])
  const [addService, setAddService] = useState(false)
  const [viewService, setViewService] = useState(false) // think about this scaled for 10 different services
  const date = new Date

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

      setApplications(data.applications)

      if (data.applications.length === 0) {
        router.push('/welcome')
      }
    }

    getApplications()
  }, [])



  console.log(applications)

  return (
    <>
      {addService ? <AddServiceModal onClick={setAddService}/> : null}
      {viewService ? <ViewServiceModal onClick={setViewService}/> : null}
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Containers</h1>
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
                  <th>Image</th>
                  {/* <th>IP address</th> */}
                  <th>Port</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" id={"service_name?"} name={"service_name?"} /></td>
                  <td><label htmlFor={"service_name?"}>{"service_name?"}</label></td>
                  <td>Running</td>
                  <td>Image</td>
                  {/* <td>0.0.0.0</td> */}
                  <td>3000</td>
                  {/* <td>link</td> */}
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
If a user doesn't have any applications set up should the main page ask if they would like to set one up?
Or always show the buttons?

To Do:
deal with plural words
Create a 404 not found page
*/
