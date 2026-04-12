import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeneroService extends BaseService<string> {
    constructor(protected override http: HttpClient) {
        super(http, 'genres');
    }

    buscarGeneros(): Observable<string[]> {
        return this.http.get<string[]>(`${this.getControllerUrl()}`);
    }
}
