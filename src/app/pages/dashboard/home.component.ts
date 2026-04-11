import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaService } from '../../domain/pesquisa/pesquisa.service';
import { GeneroService } from '../../domain/genero/genero.service';
import { FavoritosService } from '../../domain/favoritos/favoritos.service';
import { NotificationService } from '../../domain/notification/notification.service';
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
        private readonly notificationService: NotificationService,
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
            favorites: this.favoritosService.buscarFavoritos()
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

    ehFavorito(anime: PesquisaResponse): boolean {
        if (!anime || !anime.id) return false;
        return this.favoritos.some(f => f.id === anime.id);
    }

    alternarFavorito(anime: PesquisaResponse) {
        if (!anime || !anime.id) return;
        
        const isFav = this.ehFavorito(anime);
        if (isFav) {
            this.favoritosService.removerFavorito(anime.id).subscribe({
                next: () => {
                    this.favoritos = this.favoritos.filter(f => f.id !== anime.id);
                    this.notificationService.sucesso('Desfavoritado', `${anime.title.romaji} foi removido dos seus favoritos.`);
                },
                error: (err) => {
                    console.error('Erro ao remover favorito:', err);
                    this.notificationService.erro('Falha', 'Não foi possível remover da lista de favoritos.');
                }
            });
        } else {
            this.favoritosService.adicionarFavorito(anime.id).subscribe({
                next: () => {
                    this.favoritos.push(anime);
                    this.notificationService.sucesso('Favoritado!', `${anime.title.romaji} adicionado aos favoritos com sucesso.`);
                },
                error: (err) => {
                    console.error('Erro ao adicionar favorito:', err);
                    this.notificationService.erro('Falha', 'Não foi possível favoritar o anime neste momento.');
                }
            });
        }
    }
}
