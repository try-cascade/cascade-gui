import { useState } from 'react'

const ApplicationForm = ( { onSubmit } ) => {
  const [name, setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name })
    };

    await fetch('http://localhost:3005/aws/bucket', requestOptions)

    onSubmit(true)
  }

  async function handleChange(e) {
    await setName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        What would you like your application to be called?
        <input type="text" value={name} onChange={handleChange}/>
      </label>
      <input type="submit" />
    </form>
  )
}

export default ApplicationForm