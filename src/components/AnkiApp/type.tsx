export type SceneState = 'view' | 'edit'

export interface AnkiCard {
  question: string
  answer: string
  failCount: number
  correctCount: number
}

export interface AnkiData {
  cards: AnkiCard[]
  workingCards: number[]
  isFailOnlyMode: boolean
}

export type AnkiDataAction =
  | {
      type: 'filterCards'
      options: 'failOnly'[]
    }
  | {
      type: 'updateCards'
      cards: AnkiCard[]
    }
