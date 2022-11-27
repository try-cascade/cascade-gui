import { useState } from 'react'
import Button from './Button'

const AddContainerModal = ({ onClick }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('')
  const [envVars, setEnvVars] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const data = await fetch('http://localhost:3005/aws/services')
    const { appName, envName } = await data.json()

    const body = [{
      app: appName,
      env: envName,
      service: name,
      image,
      port,
      type: "frontend",
      frontFacingPath: "/",
      var: envVars.split(", ")
    }]

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    };

    await fetch('http://localhost:3005/aws/service', requestOptions)

    onClick()
  }

  return (
    <div className="modal-background" onClick={onClick}>
      <div className='container-modal add-container' onClick={(e) => e.stopPropagation() }>
        <h1 className='container-modal-h1'>Add Container</h1>
        <form onSubmit={handleSubmit} className="app-form">
          <div className="underline-input">
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label htmlFor="name" className="form-label">Container Name<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            <label htmlFor="image" className="form-label">Image Link<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <input id="port" type="text" value={port} onChange={(e) => setPort(e.target.value)} required />
            <label htmlFor="port" className="form-label">Port<span className="required">*</span>:</label>
          </div>
          <div className="underline-input">
            <textarea id="vars" onChange={(e) => setEnvVars(e.target.value)} placeholder="Key=Value, Key=Value... " value={envVars} />
            <label htmlFor="vars" className="form-label">Environment Variables:</label>
          </div>
          <Button text="Submit" />
        </form>
      </div>
    </div>
  )
}

export default AddContainerModal;