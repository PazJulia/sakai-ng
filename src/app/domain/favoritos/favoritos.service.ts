import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { PesquisaResponse } from '../pesquisa/pesquisa-response';

export interface FavoriteAnimeResponse {
    anime_id: number;
    id: number;
    rating?: number;
}

export interface FavoriteListItem {
    anime_id: number;
    id: number;
    rating: number;
    nome: string;
    imagem: string;
}

@Injectable({
    providedIn: 'root'
})
export class FavoritosService extends BaseService<PesquisaResponse> {
    constructor(protected override http: HttpClient) {
        super(http, 'favorites');
    }

    buscarFavoritos(): Observable<PesquisaResponse[]> {
        return this.http.get<PesquisaResponse[]>(`${this.getControllerUrl()}/`).pipe(
            map(res => plainToInstance(PesquisaResponse, res))
        );
    }

    getFavoritesList(): Observable<FavoriteListItem[]> {
        return this.http.get<FavoriteListItem[]>(`${this.getControllerUrl()}/`);
    }

    adicionarFavorito(animeId: number): Observable<FavoriteAnimeResponse> {
        return this.http.post<FavoriteAnimeResponse>(`${this.getControllerUrl()}/`, { anime_id: animeId });
    }

    atualizarNotaFavorito(animeId: number, rating: number): Observable<FavoriteAnimeResponse> {
        return this.http.patch<FavoriteAnimeResponse>(`${this.getControllerUrl()}/${animeId}/rating`, { rating });
    }

    removerFavorito(animeId: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.getControllerUrl()}/${animeId}`);
    }
}
