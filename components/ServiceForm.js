// import { useEffect } from "react"
import { useRouter } from 'next/router'

const ServiceForm = ( ) => {
  const router = useRouter()

  function handleSubmit(e) {
    e.preventDefault()
    router.push('/')
  }

  // After this need to check user number of applications and go to other page...

  return (
    <>
      <p>Your environment is being created, let's finish up by adding a service.</p>
      <form onSubmit={handleSubmit}>
        <label>
          What would you like to name your service?
          <input type="text" />
        </label>
        <label>
          Could you provide the image link?
          <input type="text" />
        </label>
        <label>
          Port?
          <input type="text" />
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