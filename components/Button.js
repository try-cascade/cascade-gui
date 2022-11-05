import styles from '../styles/Dashboard.module.css'

const Button = ({ text, onClick, color }) => {
  return (
    <button className={`${styles.outline} ${color}`} role="button" onClick={onClick}>
      <span class="text">{text}</span>
    </button>
  )
}

export default Button