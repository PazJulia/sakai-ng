export interface PesquisaResponse {
    id: number
    title: Title
    description: string
    genres: string[]
    averageScore: number
    seasonYear: any
    coverImage: CoverImage
}

export interface Title {
    romaji: string
    english: string
    native: string
}

export interface CoverImage {
    large: string
}
