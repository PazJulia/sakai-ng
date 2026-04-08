import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from '../base-service/list-response';

@Injectable()
export class PesquisaService extends BaseService<string> {
    constructor(protected override http: HttpClient) {
        super(http, 'anime');
    }

    buscarTitulo(search?: string, sort?: string, page: number = 1, per_page: number = 50): Observable<ListResponse> {
        let params = new HttpParams();
        if (search) params = params.append('title', search);
        if (sort) params = params.append('sort', sort);
        params = params.appendAll({ 'page': page, 'per_page': per_page });
        return this.http.get<ListResponse>(`${this.getControllerUrl()}/search`, { params: params });
    }

    buscarGenero(genre: string, sort?: string, page: number = 1, per_page: number = 50): Observable<ListResponse> {
        let params = new HttpParams();
        params = params.append('genre', genre);
        if (sort) params = params.append('sort', sort);
        params = params.appendAll({ 'page': page, 'per_page': per_page });
        return this.http.get<ListResponse>(`${this.getControllerUrl()}/search`, { params: params });
    }

    getAnimeById(id: number): Observable<any> {
        return this.http.get<any>(`${this.getControllerUrl()}/${id}`);
    }
}
