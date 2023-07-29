import { css } from '@emotion/react'
import { useReducer, useState } from 'react'
import View from './View'
import AnkiDataContext from './context'
import Header from './Header'
import { AnkiData, AnkiDataAction, SceneState } from './type'
import Edit from './Edit'

const ankiDataReducer = (state: AnkiData, action: AnkiDataAction): AnkiData => {
  if (action.type === 'filterCards') {
    // フィルターをかける
    const newState = { ...state }

    // workingCards初期化
    newState.workingCards = newState.cards.map((_, i) => i)

    // フィルターを適用
    action.options.forEach((v) => {
      if (v === 'failOnly') {
        newState.workingCards = newState.workingCards.filter(
          (i) => newState.cards[i].correctCount === 0
        )
      }
    })

    return newState
  } else if (action.type === 'updateCards') {
    // 暗記カードを更新する
    const newState = { ...state }
    newState.cards = action.cards
    newState.workingCards = newState.cards.map((_, i) => i)
    return newState
  }
  return state
}

const AnkiApp = () => {
  const [sceneState, setSceneState] = useState<SceneState>('view')
  //const [ankiData, setAnkiData] = useState<AnkiData[]>([])

  const [ankiData, ankiDataDispatch] = useReducer(ankiDataReducer, {
    cards: [],
    workingCards: [],
    isFailOnlyMode: false,
  })

  return (
    <>
      <AnkiDataContext.Provider value={[ankiData, ankiDataDispatch]}>
        <div
          css={css`
            width: culc(100vw - 10px);
            height: 100vh;
          `}
        >
          <Header setSceneState={setSceneState} />
          {sceneState === 'view' ? <View></View> : null}
          {sceneState === 'edit' ? <Edit></Edit> : null}
        </div>
      </AnkiDataContext.Provider>
    </>
  )
}

export default AnkiApp
