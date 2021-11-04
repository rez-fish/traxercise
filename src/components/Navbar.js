import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <section className={(styles.main, styles.section)}>
      <div className='container'>
        <nav className={styles.nav}>
          <Link to='/' className={styles.a}>
            Traxercise
          </Link>
          <Link to='/search' className={styles.a}>
            Search
          </Link>
          <Link to='/create' className={styles.a}>
            Create
          </Link>
        </nav>
      </div>
    </section>
  )
}

export default Navbar
