import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export abstract class BaseService<T> {
    protected baseUrl = 'http://127.0.0.1:5000'; // URL base da API

    constructor(protected http: HttpClient, protected controllerName: string) {}

    // Método para retornar a URL base completa da controller
    protected getControllerUrl(endpoint: string = ''): string {
        return `${this.baseUrl}/${this.controllerName}${endpoint ? `/${endpoint}` : ''}`;
    }

    // Método genérico para requisições GET com endpoint dinâmico
    getByEndpoint(endpoint: string): Observable<T> {
        return this.http.get<T>(this.getControllerUrl(endpoint));
    }

    // Método genérico para requisições GET com parâmetros adicionais
    getWithParams(endpoint: string, params: { [key: string]: any }): Observable<T> {
        return this.http.get<T>(this.getControllerUrl(endpoint), { params });
    }

    // Método genérico para requisições POST
    postToEndpoint(endpoint: string, item: T): Observable<T> {
        return this.http.post<T>(this.getControllerUrl(endpoint), item);
    }

    // Método genérico para requisições PUT
    putToEndpoint(endpoint: string, id: number, item: T): Observable<T> {
        return this.http.put<T>(this.getControllerUrl(`${endpoint}/${id}`), item);
    }

    // Método genérico para requisições DELETE
    deleteFromEndpoint(endpoint: string, id?: number): Observable<void> {
        const url = id ? this.getControllerUrl(`${endpoint}/${id}`) : this.getControllerUrl(endpoint);
        return this.http.delete<void>(url);
    }
}
