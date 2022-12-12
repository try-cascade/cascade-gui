import { useState, useEffect } from "react"
import Button from "./Button"

const DashboardContainers = ({ viewAddContainerModal, onClick, applications }) => {
  const [containers, setContainers] = useState([])

  useEffect(() => {
    async function getContainers() {
      if (applications.length !== 0) {
        const response = await fetch('http://localhost:3005/aws/services');
        const data = await response.json()

        setContainers(data.containers)
      }
    }

    getContainers()
  }, [viewAddContainerModal])

  async function handleDelete(name) {
    const response = await fetch(`http://localhost:3005/aws/${name}`, { method: 'DELETE' });
    const data = await response.json()

    setContainers(data.services.containers)
  }

  if (containers === undefined) {
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
      <div className='buttons'>
        <h2>Containers</h2>
        <Button onClick={onClick} text="+" />
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
                <div className="trash" onClick={() => handleDelete(container.name)}></div>
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
