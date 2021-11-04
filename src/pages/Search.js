import styles from './Search.module.css'
import { collection, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import WorkoutCard from '../components/WorkoutCard'
import { db } from '../firebase-config'

const Search = () => {
  const [exercises, setExercises] = useState([])
  const [update, setUpdate] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [search, setSearch] = useState('')

  const display = []

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

  const newArray = exercises.map((e) => {
    if (e.date === search) {
      display.push(e)
    }
  })

  return (
    <div className={[`container ${styles.box}`]}>
      <h1 className={styles.h1}>
        Enter a date to display workouts logged that day
      </h1>
      <input
        type='date'
        value={search}
        className={styles.input}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      {isPending && <p>Loading...</p>}
      {display.length === 0 && <p>No Results</p>}
      {display && (
        <div className={styles.list}>
          {display.map((exer) => (
            <WorkoutCard
              exercise={exer}
              key={exer.id}
              db={db}
              update={update}
              setUpdate={setUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
