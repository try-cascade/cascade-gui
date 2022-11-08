import { useState, useEffect } from "react"

const DashboardContainers = () => {
  const [containers, setContainers] = useState([])
  const [addService, setAddService] = useState(false)

  useEffect(() => {
    async function getContainers() {
      const response = await fetch('http://localhost:3005/aws/services');
      const data = await response.json()

      setContainers(data.containers)
    }

    getContainers()
  }, [])

  return (
    <div className='containers'>
      <h2>Containers</h2>
      <div className='buttons'>
        <button onClick={() => setAddService(!addService)}>Add Container</button>
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