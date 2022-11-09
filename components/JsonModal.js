import Button from "./Button"

const JsonModal = ({ onViewJSON }) => {
  const handleDownloadAll = () => {
    console.log("should add download functionality here")
  }

  const handleDownload = () => {
    console.log("should add download functionality here")
  }

  const handleUpload = () => {
    console.log("should add upload functionality here")
  }

  const handleDeploy = () => {
    console.log("should add file deployment functionality here")
  }

  return (
    <div className="modal-background" onClick={onViewJSON}>
      <div className='modal json' onClick={(e) => e.stopPropagation() }>
        <div className="tabs">
          <ul>
            <li>Environment</li>
            <li>Service</li>
          </ul>
        </div>
        <div className="all">
          <Button onClick={handleDownloadAll} text="Download All" />
        </div>
        <div className="content">
          Load the contents of the JSON file here.
        </div>
        <div className="btns">
          <Button onClick={handleDownload} text="Download" />
          <Button onClick={handleUpload} text="Upload" />
          <Button onClick={handleDeploy} text="Deploy" />
        </div>
      </div>
    </div>
  )
}

export default JsonModal