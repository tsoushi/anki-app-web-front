import { createContext, Dispatch, SetStateAction } from 'react'
import { AnkiData } from './type'

type ContextType = [AnkiData[], Dispatch<SetStateAction<AnkiData[]>>]

const AnkiDataContext = createContext<ContextType>({} as ContextType)

export default AnkiDataContext
