import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useContext, useState, useReducer, useEffect } from 'react'
import AnkiDataContext from './context'
import HowToUse from './View/HowToUse'
import JudgeStatus from './View/JudgeStatus'

const OutBox = styled.div`
  height: 100%;
  width: 100%;
`

const QuestionFrame = styled.div`
  display: flex;
  flex-direction: column;
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

const QuestionTitle = styled.div`
  flex-grow: 2;
  font-size: 3vw;
  text-align: center;
  padding: 10px;
`

const QuestionInputFrame = styled.div`
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
`

const QuestionInput = styled.input`
  outline: none;
  border-style: solid;
  width: 100%;
  font-size: 2vw;
  text-align: center;
`

const QuestionJudgeStatus = styled.div`
  font-size: 2vw;
  text-align: right;
`

function View() {
  const [ankiData, ankiDataDispatch] = useContext(AnkiDataContext)
  useEffect(() => {
    pageCountDispatch('justify')
  }, [ankiData])

  const [answerInput, setAnswerInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [pageCount, pageCountDispatch] = useReducer(
    (state: number, action: 'next' | 'prev' | 'justify'): number => {
      switch (action) {
        case 'next':
          if (state + 1 < ankiData.workingCards.length) {
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
        case 'justify':
          if (state >= ankiData.workingCards.length)
            state = ankiData.workingCards.length - 1
          else if (state < 0) state = 0
          return state
        default:
          return state
      }
    },
    0
  )

  const verifyAnswer = (answer: string) =>
    ankiData.cards[ankiData.workingCards[pageCount]].answer === answer

  const judge = () => {
    if (verifyAnswer(answerInput)) {
      setIsCorrect(true)
      ankiData.cards[ankiData.workingCards[pageCount]].correctCount++
      ankiDataDispatch({ type: 'updateCards', cards: ankiData.cards })
    } else {
      setIsCorrect(false)
      ankiData.cards[ankiData.workingCards[pageCount]].failCount++
      ankiDataDispatch({ type: 'updateCards', cards: ankiData.cards })
    }
  }

  if (ankiData.workingCards.length === 0) {
    return <div>nothing data</div>
  }

  if (pageCount >= ankiData.workingCards.length) return <div>error</div>

  return (
    <>
      <OutBox>
        <QuestionFrame>
          <div>{`${pageCount + 1} / ${ankiData.workingCards.length}`}</div>
          <QuestionTitle>
            {ankiData.cards[ankiData.workingCards[pageCount]].question}
          </QuestionTitle>
          <QuestionInputFrame>
            <QuestionInput
              type="text"
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
              css={css`
                border: 3px solid ${isCorrect ? 'blue' : 'red'};
              `}
            ></QuestionInput>
          </QuestionInputFrame>
          <QuestionJudgeStatus>
            Judge:{' '}
            {(() => {
              if (isCorrect === null) return '　　　'
              else if (isCorrect) return '正解　'
              else return '不正解'
            })()}
          </QuestionJudgeStatus>
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

        <HowToUse />
        <JudgeStatus />
      </OutBox>
    </>
  )
}

export default View
