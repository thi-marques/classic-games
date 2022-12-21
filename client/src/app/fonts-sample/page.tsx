import styles from './fonts-sample.module.css'

const FontsSample = () => {
  return (
    <div className={styles.group}>
      <div className={styles.stack}>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        </div>
        <div className={styles.stack}>
        <p className={styles.thin}>Thin</p>
        <p className={`${styles.thin} ${styles.italic}`}>Thin Italic</p>
      
        <p className={styles.light}>Light</p>
        <p className={`${styles.light} ${styles.italic}`}>Light Italic</p>
        <p>Regular</p>
        <p className={styles.italic}>Regular Italic</p>
        <p className={styles.bold}>Bold</p>
        <p className={`${styles.bold} ${styles.italic}`}>Bold Italic</p>
      </div>
    </div>
  )
}

export default FontsSample