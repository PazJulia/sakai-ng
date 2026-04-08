import { PesquisaResponse } from '../pesquisa/pesquisa-response';

export interface ListResponse {
    media: PesquisaResponse[]
    pageInfo: PageInfo
}

export interface PageInfo {
    total: number
    currentPage: number
    lastPage: number
}
