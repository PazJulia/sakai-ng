import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PesquisaService } from '../../domain/pesquisa/pesquisa.service';
import { PesquisaResponse } from '../../domain/pesquisa/pesquisa-response';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FavoriteButtonComponent } from '../../shared/components/favorite-button/favorite-button.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { FavoritosService } from '../../domain/favoritos/favoritos.service';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';


@Component({
    selector: 'app-detalhes',
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule, 
        ButtonModule, 
        ChipModule, 
        SkeletonModule, 
        FavoriteButtonComponent,
        TagModule,
        RatingModule,
        FormsModule
    ],
    templateUrl: './detalhes.component.html',
    styleUrl: './detalhes.component.scss',
    providers: [PesquisaService]
})
export class Detalhes implements OnInit {
    anime?: PesquisaResponse;
    loading = true;
    error = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly pesquisaService: PesquisaService,
        private readonly favoritosService: FavoritosService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.loadAnime(Number(id));
            }
        });
    }

    onRatingChange(rating: number): void {
        if (!this.anime) return;
        
        this.favoritosService.atualizarNotaFavorito(this.anime.id, rating).subscribe({
            next: () => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Sucesso', 
                    detail: 'Avaliação atualizada!' 
                });
            },
            error: (err) => {
                console.error('Erro ao atualizar nota:', err);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Erro', 
                    detail: 'Não foi possível atualizar a avaliação. Verifique se o anime está nos favoritos.' 
                });
            }
        });
    }

    private loadAnime(id: number) {
        this.loading = true;
        this.error = false;
        this.pesquisaService.getAnimeById(id).subscribe({
            next: (data) => {
                this.anime = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erro ao carregar anime:', err);
                this.error = true;
                this.loading = false;
            }
        });
    }

    getScoreSeverity(score: number): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        if (score >= 80) return 'success';
        if (score >= 60) return 'info';
        if (score >= 40) return 'warn';
        return 'danger';
    }
}
