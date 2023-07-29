import { createContext, Dispatch } from 'react'
import { AnkiData, AnkiDataAction } from './type'

type ContextType = [AnkiData, Dispatch<AnkiDataAction>]

const AnkiDataContext = createContext<ContextType>({} as ContextType)

export default AnkiDataContext
