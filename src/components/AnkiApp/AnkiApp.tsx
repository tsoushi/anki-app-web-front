import { css } from '@emotion/react'
import { useState } from 'react'
import View from './View'
import AnkiDataContext from './context'
import Header from './Header'
import { AnkiData, SceneState } from './type'
import Edit from './Edit'

const AnkiApp = () => {
  const [sceneState, setSceneState] = useState<SceneState>('view')
  const [ankiData, setAnkiData] = useState<AnkiData[]>([])

  return (
    <>
      <AnkiDataContext.Provider value={[ankiData, setAnkiData]}>
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
