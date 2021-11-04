import { deleteDoc, doc } from '@firebase/firestore'
import styles from './WorkoutCard.module.css'

const WorkoutCard = ({ exercise, db, setUpdate, update }) => {
  const handleDelete = async (id) => {
    const exerciseDoc = doc(db, 'exercises', id)
    setUpdate(!update)
    await deleteDoc(exerciseDoc)
    setUpdate(!update)
  }
  return (
    <div className={styles.card}>
      {exercise.workout && <h1>Workout: {exercise.workout}</h1>}
      {exercise.time && <p>Time: {exercise.time}</p>}
      {exercise.reps && <p>Reps: {exercise.reps}</p>}
      {exercise.sets && <p>Sets: {exercise.sets}</p>}
      {exercise.date && <p className={styles.date}>Date: {exercise.date}</p>}
      <button
        className={styles.delete}
        onClick={() => handleDelete(exercise.id)}
      >
        X
      </button>
    </div>
  )
}

export default WorkoutCard
