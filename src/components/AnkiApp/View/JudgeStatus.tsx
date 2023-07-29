import { useContext } from 'react'
import AnkiDataContext from '../context'

const JudgeStatus = () => {
  const [ankiData] = useContext(AnkiDataContext)

  return (
    <div>
      <h3>ステータス</h3>
      <ul>
        {ankiData.workingCards
          .map((i) => ankiData.cards[i])
          .map((v, i) => (
            <li key={i}>{`${i + 1} : ${v.failCount} fail  ${(() => {
              if (v.correctCount > 0) return '◯'
              else return '☓'
            })()}`}</li>
          ))}
      </ul>
    </div>
  )
}

export default JudgeStatus
