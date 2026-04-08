import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PesquisaResponse } from '../pesquisa/pesquisa-response';

@Injectable({
    providedIn: 'root'
})
export class FavoritosService extends BaseService<PesquisaResponse> {
    constructor(protected override http: HttpClient) {
        super(http, 'favorites');
    }

    getFavorites(): Observable<PesquisaResponse[]> {
        return this.http.get<PesquisaResponse[]>(this.getControllerUrl());
    }

    addFavorite(anime: PesquisaResponse): Observable<void> {
        return this.http.post<void>(this.getControllerUrl(), anime);
    }

    removeFavorite(id: number): Observable<void> {
        return this.http.delete<void>(`${this.getControllerUrl()}/${id}`);
    }
}
