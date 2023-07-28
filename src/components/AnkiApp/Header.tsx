import styled from '@emotion/styled'
import { Dispatch, SetStateAction } from 'react'
import { SceneState } from './type'

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px 0px;
  border-style: groove;
  border-width: 3px;
  border-color: lightblue;
  font-size: 1.5em;
`

const Item = styled.div`
  flex-grow: 1;
  border-style: solid;
  border-width: 2px;
  border-color: cyan;
  text-align: center;
  :hover {
    background-color: lightgray;
  }
`

const ItemSpacer = styled.div`
  flex-grow: 1;
`

const Header = ({
  setSceneState,
}: {
  setSceneState: Dispatch<SetStateAction<SceneState>>
}) => {
  return (
    <header>
      <Bar>
        <ItemSpacer />
        <Item onClick={() => setSceneState('edit')}>編集</Item>
        <ItemSpacer />
        <Item onClick={() => setSceneState('view')}>開始</Item>
        <ItemSpacer />
      </Bar>
    </header>
  )
}

export default Header
