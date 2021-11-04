import { addDoc, collection } from '@firebase/firestore'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { db } from '../firebase-config'

import styles from './Create.module.css'

const Create = () => {
  const [workout, setWorkout] = useState('')
  const [time, setTime] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const history = useHistory()

  const [isPending, setIsPending] = useState(false)

  const addWorkout = async () => {
    let date = new Date()

    const year = date.toLocaleDateString(undefined, {
      year: 'numeric',
    })
    const month = date.toLocaleDateString(undefined, {
      month: '2-digit',
    })
    const day = date.toLocaleDateString(undefined, {
      day: '2-digit',
    })

    date = `${year}-${month}-${day}`

    setIsPending(true)
    await addDoc(collection(db, 'exercises'), {
      workout,
      time,
      reps,
      sets,
      date,
    })
    setWorkout('')
    setTime('')
    setReps('')
    setSets('')
    setIsPending(false)
    history.push('/')
  }

  return (
    <div className={`container ${styles.create}`}>
      <h1 className={styles.title}>Create a new workout</h1>
      {isPending && <p>Loading...</p>}
      {!isPending && (
        <div>
          <div className={styles.input}>
            <span className={styles.name}>Workout name: </span>
            <input
              onChange={(e) => setWorkout(e.target.value)}
              value={workout}
            />
          </div>
          <div className={styles.input}>
            <span className={styles.name}>Time: </span>
            <input onChange={(e) => setTime(e.target.value)} value={time} />
          </div>
          <div className={styles.input}>
            <span className={styles.name}>Reps: </span>
            <input onChange={(e) => setReps(e.target.value)} value={reps} />
          </div>
          <div className={styles.input}>
            <span className={styles.name}>Sets: </span>
            <input onChange={(e) => setSets(e.target.value)} value={sets} />
          </div>
          <button onClick={addWorkout} className={styles.btn}>
            Submit New Workout
          </button>
        </div>
      )}
    </div>
  )
}

export default Create
