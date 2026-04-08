import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { PesquisaService } from '../../domain/pesquisa/pesquisa.service';
import { PesquisaResponse } from '../../domain/pesquisa/pesquisa-response';
import { PageInfo } from '../../domain/base-service/list-response';

@Component({
    selector: 'app-busca',
    standalone: true,
    templateUrl: 'busca.component.html',
    styleUrl: 'busca.component.scss',
    imports: [Button, NgForOf, NgIf],
    providers: [PesquisaService]
})
export class Busca implements OnInit {
    protected pesquisa!: string;
    animes: PesquisaResponse[] = [];
    protected info!: PageInfo;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly pesquisaService: PesquisaService
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(params => {
                this.pesquisa = params['titulo'];
                return this.pesquisaService.buscarTitulo(this.pesquisa);
            })
        ).subscribe({
            next: (value) => {
                this.animes = value.media;
                this.info = value.pageInfo;
            }
        });
    }
}
