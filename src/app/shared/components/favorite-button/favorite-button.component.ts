import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FavoritosService } from '../../../domain/favoritos/favoritos.service';
import { NotificationService } from '../../../domain/notification/notification.service';
import { PesquisaResponse } from '../../../domain/pesquisa/pesquisa-response';

@Component({
    selector: 'app-favorite-button',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './favorite-button.component.html',
    providers: [FavoritosService]
})
export class FavoriteButtonComponent {
    @Input() anime!: PesquisaResponse;
    @Input() styleClass: string = '';

    constructor(
        private readonly favoritosService: FavoritosService,
        private readonly notificationService: NotificationService
    ) { }

    alternarFavorito(event: Event) {
        event.stopPropagation();
        if (!this.anime || !this.anime.id) return;

        if (this.anime.isFavorite) {
            this.favoritosService.removerFavorito(this.anime.id).subscribe({
                next: () => {
                    this.anime.isFavorite = false;
                    this.notificationService.sucesso('Desfavoritado', `${this.anime.title.romaji} foi removido dos seus favoritos.`);
                },
                error: (err) => {
                    console.error('Erro ao remover favorito:', err);
                    this.notificationService.notificarErroHttp(err, 'Falha ao remover');
                }
            });
        } else {
            this.favoritosService.adicionarFavorito(this.anime.id).subscribe({
                next: () => {
                    this.anime.isFavorite = true;
                    this.notificationService.sucesso('Favoritado!', `${this.anime.title.romaji} adicionado aos favoritos com sucesso.`);
                },
                error: (err) => {
                    console.error('Erro ao adicionar favorito:', err);
                    this.notificationService.notificarErroHttp(err, 'Falha ao favoritar');
                }
            });
        }
    }
}
