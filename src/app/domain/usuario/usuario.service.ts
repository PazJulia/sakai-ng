import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { UsuarioResponseModel } from './usuario-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService extends BaseService<UsuarioResponseModel> {
    constructor(protected override http: HttpClient) {
        super(http, 'usuario'); // Nome da *controller* passada no super
    }

    buscarMoeda(search: string): Observable<any> {
        const params = new HttpParams();
        params.append('nome', search);
        return this.http.get<any>(`${this.baseUrl}/moeda`, { params: params });
    }
}
