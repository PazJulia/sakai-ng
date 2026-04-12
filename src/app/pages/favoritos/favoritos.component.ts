import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritosService, FavoriteListItem } from '../../domain/favoritos/favoritos.service';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../domain/notification/notification.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-favoritos',
    standalone: true,
    imports: [CommonModule, RouterModule, PaginatorModule, ButtonModule, RatingModule, FormsModule],
    templateUrl: './favoritos.component.html',
    styleUrl: './favoritos.component.scss'
})
export class Favoritos implements OnInit {
    allFavorites: FavoriteListItem[] = [];
    paginatedFavorites: FavoriteListItem[] = [];
    loading = false;
    
    // Pagination
    first = 0;
    rows = 12;

    constructor(
        private readonly favoritosService: FavoritosService,
        private readonly notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.loadFavorites();
    }

    onRatingChange(animeId: number, rating: number): void {
        this.favoritosService.atualizarNotaFavorito(animeId, rating).subscribe({
            next: () => {
                this.notificationService.sucesso('Nota atualizada', 'Sua avaliação foi salva com sucesso.');
            },
            error: (err) => {
                console.error('Erro ao atualizar nota:', err);
                this.notificationService.notificarErroHttp(err, 'Falha ao avaliar');
            }
        });
    }

    loadFavorites(): void {
        this.loading = true;
        this.favoritosService.getFavoritesList().pipe(
            finalize(() => this.loading = false)
        ).subscribe({
            next: (data) => {
                this.allFavorites = data;
                this.updatePage();
            },
            error: (err) => console.error('Erro ao carregar favoritos', err)
        });
    }

    onPageChange(event: any): void {
        this.first = event.first;
        this.rows = event.rows;
        this.updatePage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updatePage(): void {
        this.paginatedFavorites = this.allFavorites.slice(this.first, this.first + this.rows);
    }

    remover(animeId: number): void {
        if (confirm('Tem certeza que deseja remover este anime dos favoritos?')) {
            this.favoritosService.removerFavorito(animeId).subscribe({
                next: () => {
                    this.allFavorites = this.allFavorites.filter(item => item.anime_id !== animeId);
                    this.updatePage();
                    // If page becomes empty and we aren't on the first page, go back
                    if (this.paginatedFavorites.length === 0 && this.first > 0) {
                        this.first = Math.max(0, this.first - this.rows);
                        this.updatePage();
                    }
                },
                error: (err) => console.error('Erro ao remover favorito', err)
            });
        }
    }
}
