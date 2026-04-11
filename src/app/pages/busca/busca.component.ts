import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Paginator } from 'primeng/paginator';
import { PesquisaService } from '../../domain/pesquisa/pesquisa.service';
import { PesquisaResponse } from '../../domain/pesquisa/pesquisa-response';
import { PageInfo } from '../../domain/base-service/list-response';

@Component({
    selector: 'app-busca',
    standalone: true,
    templateUrl: 'busca.component.html',
    styleUrl: 'busca.component.scss',
    imports: [Button, NgForOf, NgIf, Paginator],
    providers: [PesquisaService]
})
export class Busca implements OnInit {
    protected pesquisa!: string;
    animes: PesquisaResponse[] = [];
    protected info!: PageInfo;
    protected currentParams: any;
    protected currentPage = 1;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly pesquisaService: PesquisaService
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(params => {
                this.currentParams = params;
                this.currentPage = 1;
                return this.fetchData();
            })
        ).subscribe({
            next: (value) => this.handleResponse(value)
        });
    }

    fetchData() {
        const titulo = this.currentParams['titulo'];
        const genero = this.currentParams['genero'];
        this.pesquisa = titulo || genero;
        if (genero) {
            return this.pesquisaService.buscarGenero(genero, undefined, this.currentPage);
        }
        return this.pesquisaService.buscarTitulo(titulo, undefined, this.currentPage);
    }

    onPageChange(event: any) {
        this.currentPage = Math.floor(event.first / event.rows) + 1;
        this.fetchData().subscribe({
            next: (value) => this.handleResponse(value)
        });
    }

    private handleResponse(value: any) {
        this.animes = value.media;
        this.info = value.pageInfo;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
