import { useEffect, useState } from 'react'

import styles from '../styles/Services.module.css'
import ApplicationForm from '../components/ApplicationForm'
import EnvironmentForm from '../components/EnvironmentForm'
import ServiceForm from '../components/ServiceForm'

const Welcome = () => {
  const [showHello, setShowHello] = useState(true)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [environmentSubmitted, setEnvironmentSubmitted] = useState(false)

  const [appName, setAppName] = useState('')
  const [envName, setEnvName] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setShowHello(false)
    }, 0)
  })

  return (
    <main className={styles.main}>
      { showHello ? <p>Hello, we noticed you have no applications. Let's get started setting one up.</p> : null }
      { !showHello && !applicationSubmitted ? <ApplicationForm onSubmit={setApplicationSubmitted} appName={[appName, setAppName]} /> : null }
      { applicationSubmitted && !environmentSubmitted ? <EnvironmentForm onSubmit={setEnvironmentSubmitted} appName={appName} envName={[envName, setEnvName]} /> : null }
      { environmentSubmitted ? <ServiceForm appName={appName} envName={envName} /> : null}
    </main>
  )
}

export default Welcome

/*
Hello, we noticed you have no applications. Let's get started setting one up.

What would you like your application to be called?
input
submit --- when the user presses submit

Thank you! We are currently processing...
  -- need a loading bar, after process

Next up let's answer some questions about your environment.
  - What would you like to name your environment? (textbox)
  - Would you like to set up Traces on this environment connected to X-Ray? yes/no (dropdown)
    - if yes
      - give them the directions for instrumenting there services
      - once the services are instrumented please provide this information:
        - "AWS_ACCESS_KEY_ID=",
          "AWS_REGION=",
          "AWS_SECRET_ACCESS_KEY=",
          "BUCKET="
  - if no
  - submit button

Thank you! We are currently processing...
  -- need a loading bar, after process

Your environment is being created, let's finish up by adding a service.
  - What would you like to name your service? (input)
  - Could you provide the image link? (input)
  - Port? (input)
  - Would type of app? backend/frontend (dropdown)
    - if frontend
      - what path would you like this service to be on?
  - Would you like to add any private variables? + with toggle (inputs)


*/