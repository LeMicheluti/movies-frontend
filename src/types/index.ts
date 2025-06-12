export interface Rating {
  id: number
  score: number
  comment: string
}

export interface Actor {
  id: number
  name: string
  movies?: Movie[]
}

export interface Movie {
  id: number
  title: string
  actors?: Actor[]
  ratings?: Rating[]
}