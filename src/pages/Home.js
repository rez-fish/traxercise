import { collection, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import WorkoutCard from '../components/WorkoutCard'
import { db } from '../firebase-config'

import styles from './Home.module.css'

const Home = () => {
  const [exercises, setExercises] = useState([])
  const [update, setUpdate] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const exerciseCollection = collection(db, 'exercises')

    const getExercises = async () => {
      setIsPending(true)
      const data = await getDocs(exerciseCollection)
      setExercises(data.docs.map((e) => ({ ...e.data(), id: e.id })))
      setIsPending(false)
    }
    getExercises()
  }, [update])
  return (
    <div className='container'>
      {isPending && <p className={styles.loading}>Loading...</p>}
      {exercises.length === 0 && (
        <p className={styles.nothing}>Nothing In Here Yet</p>
      )}
      <div className={styles.list}>
        {exercises &&
          exercises.map((exer) => (
            <WorkoutCard
              exercise={exer}
              key={exer.id}
              db={db}
              update={update}
              setUpdate={setUpdate}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
