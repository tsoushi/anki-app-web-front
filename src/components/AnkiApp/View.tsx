import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useContext, useState, useReducer, useEffect } from 'react'
import AnkiDataContext from './context'

const QuestionFrame = styled.div`
  border-style: solid;
  border-color: gray;
  border-width: 3px;
  width: 80%;
  max-height: 70%;
  aspect-ratio: 2/1;
  margin: 20px auto;
  resize: both;
  overflow: hidden;
  padding: 30px;
`

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`

const itemScale = (scale = 1) =>
  css`
    flex-grow: ${scale};
  `

function View() {
  const [ankiData] = useContext(AnkiDataContext)
  const [judgeStatus, setJudgeStatus] = useState<
    { isCorrect: boolean; neg: number; index: number }[]
  >([])
  useEffect(() => {
    setJudgeStatus(
      [...Array(ankiData.length)].map((_, i) => ({
        isCorrect: false,
        neg: 0,
        index: i,
      }))
    )
  }, [ankiData])

  const [answerInput, setAnswerInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [pageCount, pageCountDispatch] = useReducer(
    (state: number, action: 'next' | 'prev'): number => {
      switch (action) {
        case 'next':
          if (state + 1 < ankiData.length) {
            setIsCorrect(null)
            setAnswerInput('')
            return state + 1
          } else return state
        case 'prev':
          if (state > 0) {
            setIsCorrect(null)
            setAnswerInput('')
            return state - 1
          } else return state
        default:
          return state
      }
    },
    0
  )

  const verifyAnswer = (answer: string) => ankiData[pageCount].answer === answer
  const judge = () => {
    if (verifyAnswer(answerInput)) {
      setIsCorrect(true)
      setJudgeStatus((v) => {
        v[pageCount].isCorrect = true
        return v
      })
    } else {
      console.log('a')
      const v = [...judgeStatus]
      v[pageCount].neg++
      setJudgeStatus(v)
      setIsCorrect(false)
    }
  }

  if (ankiData.length === 0) {
    return <div>nothing data</div>
  }

  return (
    <>
      <div
        css={css`
          height: 100%;
          width: 100%;
        `}
      >
        <QuestionFrame>
          <Vertical
            css={css`
              height: 100%;
            `}
          >
            <div>{`${pageCount + 1} / ${ankiData.length}`}</div>
            <div
              css={css`
                ${itemScale(2)}
                font-size: 3vw;
                text-align: center;
                padding: 10px;
              `}
            >
              {ankiData[pageCount].question}
            </div>
            <div
              css={css`
                ${itemScale(1)}

                box-sizing: border-box;
                width: 100%;
                padding: 0px 20px;
                display: flex;
                align-items: center;
              `}
            >
              <input
                value={answerInput}
                onChange={(e) => {
                  setAnswerInput(e.target.value)
                  setIsCorrect(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (isCorrect === true) pageCountDispatch('next')
                    else if (isCorrect === null) judge()
                  } else if (e.key === 'ArrowLeft' && e.altKey)
                    pageCountDispatch('prev')
                  else if (e.key === 'ArrowRight' && e.altKey)
                    pageCountDispatch('next')
                }}
                type="text"
                css={css`
                  outline: none;
                  border-style: solid;
                  border: 3px solid ${isCorrect ? 'blue' : 'red'};
                  width: 100%;
                  font-size: 2vw;
                  text-align: center;
                `}
              ></input>
            </div>
            <div
              css={css`
                font-size: 2vw;
                text-align: right;
              `}
            >
              Judge:{' '}
              {(() => {
                if (isCorrect === null) return '　　　'
                else if (isCorrect) return '正解　'
                else return '不正解'
              })()}
            </div>
          </Vertical>
        </QuestionFrame>
        <div
          css={css`
            width: 80%;
            margin: 0px auto;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          `}
        >
          <button
            onClick={() => pageCountDispatch('prev')}
            css={css`
              font-size: 3vw;
            `}
          >
            left
          </button>
          <button
            onClick={() => judge()}
            css={css`
              font-size: 3vw;
            `}
          >
            OK
          </button>
          <button
            onClick={() => pageCountDispatch('next')}
            css={css`
              font-size: 3vw;
            `}
          >
            right
          </button>
        </div>
        <div>
          <h3>ステータス</h3>
          <ul>
            {judgeStatus.map((v) => (
              <li key={v.index}>{`${v.index + 1} : ${v.neg} fail  ${(() => {
                if (v.isCorrect === null) return ''
                else if (v.isCorrect) return '◯'
                else return '☓'
              })()}`}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>使い方</h3>
          <ul>
            <li>入力欄でalt+←, alt+→でカードの移動</li>
            <li>入力欄でEnterを押すと正解、不正解の確認</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default View
