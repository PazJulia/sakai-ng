import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { Paginator } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { PesquisaService } from '../../domain/pesquisa/pesquisa.service';
import { PesquisaResponse } from '../../domain/pesquisa/pesquisa-response';
import { PageInfo } from '../../domain/base-service/list-response';
import { FavoriteButtonComponent } from '../../shared/components/favorite-button/favorite-button.component';

@Component({
    selector: 'app-busca',
    standalone: true,
    templateUrl: 'busca.component.html',
    styleUrl: 'busca.component.scss',
    imports: [NgForOf, NgIf, Paginator, FavoriteButtonComponent, RouterModule, SkeletonModule],
    providers: [PesquisaService]
})
export class Busca implements OnInit {
    protected pesquisa!: string;
    animes: PesquisaResponse[] = [];
    protected info!: PageInfo;
    protected currentParams: any;
    protected currentPage = 1;
    loading = false;
    skeletonItems = Array(12).fill(0);

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly pesquisaService: PesquisaService
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(
            tap(() => this.loading = true),
            switchMap(params => {
                this.currentParams = params;
                this.currentPage = 1;
                return this.fetchData().pipe(finalize(() => this.loading = false));
            })
        ).subscribe({
            next: (value) => this.handleResponse(value),
            error: () => this.loading = false
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
        this.loading = true;
        this.fetchData().pipe(finalize(() => this.loading = false)).subscribe({
            next: (value) => this.handleResponse(value),
            error: () => this.loading = false
        });
    }

    private handleResponse(value: any) {
        this.animes = value.media;
        this.info = value.pageInfo;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
