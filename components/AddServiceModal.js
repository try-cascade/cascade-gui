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
*/