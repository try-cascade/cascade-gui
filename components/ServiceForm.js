// import { useEffect } from "react"
import { useState } from 'react'
import { useRouter } from 'next/router'

const ServiceForm = ({ appName, envName }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('')

  const router = useRouter()

  /*
  Payload:
{
  "app": "name"
  "env": "name"
  "service": "name"
  "image": "path"
  "port": "3000"
  "type": "backend/frontend"
  "frontFacingPath": "path"
  "var": [
    "key=value",
  ]
}
*/
  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      app: appName,
      env: envName,
      service: name,
      image,
      port,
      type: "frontend",
      frontFacingPath: "/"
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    };

    await fetch('http://localhost:3005/aws/service', requestOptions)

    router.push('/')
  }

  return (
    <>
      <p>Your environment is being created, let's finish up by adding a container.</p>
      <form onSubmit={handleSubmit}>
        <label>
          What would you like to name your container?
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Could you provide the image link?
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <label>
          Port?
          <input type="text" value={port} onChange={(e) => setPort(e.target.value)}/>
        </label>
        <input type="submit" />
      </form>
    </>
  )
}

export default ServiceForm

/*
Your environment is being created, let's finish up by adding a service.
  - What would you like to name your service? (input)
  - Could you provide the image link? (input)
  - Port? (input)
  - What type of app? backend/frontend (dropdown)
    - if frontend
      - what path would you like this service to be on?
  - Would you like to add any private variables? + with toggle (inputs)
*/