import styles from '../styles/ServiceModal.module.css'

const AddEnvironmentModal = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={() => onClick(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="profile">What profile would you like to use?</label>

          <select name="profile" id="profile">
            <option value="default">Default</option>
          </select>

          <label htmlFor="config">Would you like to use default config?</label>
          <select name="config" id="config">
            <option value="default">Default</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default AddEnvironmentModal

/*
Choose a name
Select a profile from the AWS CLI
  - Expect to get profile options from backend, if user profile isn't set up will direct them on how here

Under the would you like to set up default config question we could have an image of what a default AWS config looks like
  - new VPC
  - 4 subnets
  - X-Ray
  - Cloudwatch

Minimal viable product is forcing people to use this default...
  - options customers could have, removing tracing
  - selecting already created AWS resources

Select tracing options?
Select log options? 
Or do we force this upon the users?
*/