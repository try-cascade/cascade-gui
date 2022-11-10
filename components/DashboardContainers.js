import { useState, useEffect } from "react"
import Button from "./Button"

const DashboardContainers = ({ onClick }) => {
  const [containers, setContainers] = useState([])
  // const [addService, setAddService] = useState(false)

  useEffect(() => {
    async function getContainers() {
      const response = await fetch('http://localhost:3005/aws/services');
      const data = await response.json()
      console.log(data, "<-- after fetching services in dashboard containers")

      setContainers(data.containers)
    }

    getContainers()
  }, [])

  // console.log(typeof setViewAddContainerModal === 'function', "<--- setViewAddContainerModal")

  if (containers.length === 0) {
    return (
      <div className='containers'>
        <h2>Containers</h2>
        <div className='buttons'>
          <Button onClick={onClick} text="Add Container" />
        </div>
      </div>
    )
  }

  return (
    <div className='containers'>
      <h2>Containers</h2>
      <div className='buttons'>
        <Button onClick={() => setAddService(!addService)} text="Add Container" />

        {/* <input type='text' value='search' /> */}
      </div>
      <div className="container-details">
        <ul>
          {containers.map(container => {
            return (
              <li key={container.name}>
                <div>
                  <dt>Name</dt>
                  <dd>{container.name}</dd>
                </div>
                <div>
                  <dt>Image</dt>
                  <dd>{container.image}</dd>
                </div>
                <div>
                  <dt>Port</dt>
                  <dd>{container.port}</dd>
                </div>
                <Button onClick={() => 0} text="trash"></Button>
              </li>
            )
          })}
        </ul>
        <div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContainers