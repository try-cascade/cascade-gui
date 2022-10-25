import styles from '../styles/ServiceModal.module.css'

const AddServiceModal = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={() => onClick(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form>
          <label htmlFor="environments">Choose an environment:</label>

          <select name="environments" id="environments">
            <option value="test">Test</option>
          </select>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image" />
          <label htmlFor="port">Port:</label>
          <input type="text" id="port" name="port" />
          <label htmlFor="type">What type of service?</label>

          <select name="type" id="type">
            <option value="type">Front End</option>
            <option value="type">Backend</option>
          </select>

          <label htmlFor="path">Path:</label>
          <input type="text" id="path" name="path" />
        </form>
      </div>
    </div>
  )
}

export default AddServiceModal

/*
Used for both create and edit? wording is kind of different between selecting and editing, editing might have more information displayed as well

For create:
  - default to only application created. If no application is created yet: add fields to create the application
  - choose what environment you are a part of.
  - name the application
  - put in the image link
  - add a port (if needed)

If front end, need to ask for path information with load balancer and service is placed in a public subnet
If back end, service might need to be registered with service discovery (at future date) and placed in a private subnet

Do we need to add an option to input container private variables?
*/