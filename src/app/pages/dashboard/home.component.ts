import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaService } from '../../domain/pesquisa/pesquisa.service';
import { GeneroService } from '../../domain/genero/genero.service';
import { FavoritosService } from '../../domain/favoritos/favoritos.service';
import { PesquisaResponse } from '../../domain/pesquisa/pesquisa-response';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { forkJoin, map } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [CommonModule, CarouselModule, ButtonModule, RouterModule],
    providers: [PesquisaService, GeneroService, FavoritosService]
})
export class Home implements OnInit {
    trendingAnimes: PesquisaResponse[] = [];
    popularAnimes: PesquisaResponse[] = [];
    favoritos: PesquisaResponse[] = [];
    generos: string[] = [];
    
    heroAnime!: PesquisaResponse;
    responsiveOptions: any[] = [
        {
            breakpoint: '1199px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        }
    ];

    constructor(
        private readonly pesquisaService: PesquisaService,
        private readonly generoService: GeneroService,
        private readonly favoritosService: FavoritosService,
        private readonly router: Router
    ) {}

    ngOnInit() {
        this.loadDashboardData();
    }

    private loadDashboardData() {
        forkJoin({
            trending: this.pesquisaService.buscarTitulo(undefined, 'TRENDING_DESC', 1, 10),
            popular: this.pesquisaService.buscarTitulo(undefined, 'POPULARITY_DESC', 1, 10),
            generos: this.generoService.buscarGeneros(),
            favorites: this.favoritosService.getFavorites()
        }).subscribe({
            next: (data) => {
                const filterValid = (list: any[]) => list.filter(a => a && a.title && a.coverImage);
                
                this.trendingAnimes = filterValid(data.trending.media);
                this.popularAnimes = filterValid(data.popular.media);
                this.favoritos = filterValid(data.favorites);
                this.generos = data.generos;
                
                if (this.trendingAnimes.length > 0) {
                    this.heroAnime = this.trendingAnimes[0];
                }
            }
        });
    }

    navegarGenero(genero: string) {
        this.router.navigate(['/busca/genero', genero]);
    }
}
