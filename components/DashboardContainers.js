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
        <button onClick={onClick}>Add Container</button>
        <button>Delete Container</button>

        <input type='text' value='search' />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Port</th>
            </tr>
          </thead>
          <tbody>
            {containers.map(container => {
              return (
                <tr key={container.name}>
                <td><input type="checkbox" id={container.name} name={container.name} /></td>
                  <td>{container.name}</td>
                  <td>{container.image}</td>
                  <td>{container.port}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContainers