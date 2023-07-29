import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import AnkiDataContext from './context'

const OutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DataInputBox = styled.textarea`
  width: 80%;
  font-size: 1em;
  height: 50vh;
`

const OKButton = styled.button`
  font-size: 2em;
`

const Edit = () => {
  const [ankiData, ankiDataDispatch] = useContext(AnkiDataContext)
  const [inputText, setInputText] = useState(
    ankiData.cards.reduce(
      (pre, cur) => pre + `${cur.question}:${cur.answer}\n`,
      ''
    )
  )

  const clicked = () => {
    ankiDataDispatch({
      type: 'updateCards',
      cards: inputText
        .split('\n')
        .map((v) => v.split(':', 2))
        .filter((v) => v.length == 2)
        .map((v) => ({
          question: v[0],
          answer: v[1],
          failCount: 0,
          correctCount: 0,
        })),
    })
  }

  return (
    <OutBox>
      <DataInputBox
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value)
        }}
      ></DataInputBox>
      <OKButton onClick={clicked}>OK</OKButton>
      <ol>
        {ankiData.cards.map((v, i) => (
          <li key={i}>{`${v.question}: ${v.answer}`}</li>
        ))}
      </ol>
      <div>
        <h3>使い方</h3>
        <ul>
          <li>question:answerの形式で1行ずつ入力</li>
        </ul>
      </div>
    </OutBox>
  )
}

export default Edit
