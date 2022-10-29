import { useState } from "react"

const EnvironmentForm = ( { onSubmit } ) => {
  const [name, setName] = useState('')
  const [key, setKey] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [region, setRegion] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const body = {
      app: '',
      env: name,
      accessKey: key,
      region,
      secretKey
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    };

    // await fetch('http://localhost:3005/aws/bucket', requestOptions)

    onSubmit(true)
  }

  async function handleChange(e, setter) {
    await setter(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        What would you like to name your environment?
        <input type="text" value={name} onChange={(e) => handleChange(e, setName)} />
      </label>
      Please follow the instructions below to instrument your applications for traces with X-Ray.
      -- add instructions here --
      <label>
        What access key did you use for instrumentation?
        <input type="text" value={key} onChange={(e) => handleChange(e, setKey)} />
      </label>
      <label>
        What secret access key did you use for instrumentation?
        <input type="password" value={secretKey} onChange={(e) => handleChange(e, setSecretKey)} />
      </label>
      <label>
        What region did you use for instrumentation?
        <input type="text" value={region} onChange={(e) => handleChange(e, setRegion)} />
      </label>
      <input type="submit" />
    </form>
  )
}

export default EnvironmentForm

/*
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
*/