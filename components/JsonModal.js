import { useEffect, useState } from "react";
import Button from "./Button";
import JSONPretty from 'react-json-pretty';

const JsonModal = ({ onViewJSON }) => {
  const [json, setJson] = useState({});
  const [selected, setSelected] = useState('environment');

  useEffect(() => {
    async function upload() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      await fetch('http://localhost:3005/terraform/upload', requestOptions);
      const response = await fetch('http://localhost:3005/aws/terraform');
      setJson(await response.json());
    }

    upload();
  }, []);

  const handleS3Env = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, s3Arn } = await response.json();

    const bucket = s3Arn.split(/arn:aws:s3:::/)[1];

    window.open(`https://s3.console.aws.amazon.com/s3/object/${bucket}?prefix=${envName}/env-stack/cdk.tf.json`, '_blank');
  }

  const handleS3Service = async () => {
    const response = await fetch('http://localhost:3005/aws/services');
    const { envName, s3Arn } = await response.json();

    const bucket = s3Arn.split(/arn:aws:s3:::/)[1];

    window.open(`https://s3.console.aws.amazon.com/s3/object/${bucket}?prefix=${envName}/services-stack/cdk.tf.json`, '_blank');
  }

  return (
    <div className="modal-background" onClick={onViewJSON}>
      <div className='modal json' onClick={(e) => e.stopPropagation() }>
        <div className="tabs">
          <ul>
            <li className={selected === "environment" ? "selected" : ""} onClick={() => setSelected('environment')}>Environment</li>
            <li className={selected === "service" ? "selected" : ""} onClick={() => setSelected('service')}>Service</li>
          </ul>
        </div>
        <div className="all">
          <Button onClick={selected === "environment" ? handleS3Env : handleS3Service} text="View on S3" />
        </div>
        <div className="content">
          {selected === "environment" ?
            <JSONPretty id="json-pretty" data={json.environment}></JSONPretty> :
            <JSONPretty id="json-pretty" data={json.services}></JSONPretty>}
        </div>
      </div>
    </div>
  );
}

export default JsonModal;