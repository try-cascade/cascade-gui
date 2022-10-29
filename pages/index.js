
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import PrimaryInterface from '../components/PrimaryInterface'
import { useRouter } from 'next/router'

export default function Home() {
  const [applications, setApplications] = useState([])

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

  console.log(applications)

  return (
    <PrimaryInterface applications={applications} />
  )
}

/*
If a user doesn't have any applications set up should the main page ask if they would like to set one up?
Or always show the buttons?

To Do:
deal with plural words
Create a 404 not found page
*/
