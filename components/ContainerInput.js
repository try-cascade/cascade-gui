import styles from '../styles/Setup.module.css';
import { useState } from 'react';

export function ContainerInput({ setBodyList, bodyArr, app, env }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [port, setPort] = useState('');
  const [envVars, setEnvVars] = useState('');
  
  const currentBody = {
    app,
    env,
    service: name,
    image,
    port,
    type: "frontend",
    frontFacingPath: "/",
    var: envVars.split(", ")
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    setBodyList(bodyArr.slice(0, -1).concat(currentBody));
  };

  return (
    <div className="container" onBlur={handleClickSave}>
      <div className="underline-input">
        <input id="service" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="service" className="form-label">Container Name<span className={styles.req}>*</span>:</label>
      </div>
      <div className="underline-input">
        <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        <label htmlFor="image" className="form-label">Image Link<span className={styles.req}>*</span>:</label>
      </div>
      <div className="underline-input">
        <input id="port" type="text" value={port} onChange={(e) => setPort(e.target.value)} required />
        <label htmlFor="port" className="form-label">Port<span className={styles.req}>*</span>:</label>
      </div>
      <div className="underline-input">
        <textarea id="vars" onChange={(e) => setEnvVars(e.target.value)} placeholder="Key=Value, Key=Value... " value={envVars} />
        <label htmlFor="vars" className="form-label">Environment Variables:</label>
      </div>
    </div>
  );
}

export default ContainerInput;