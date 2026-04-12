import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { Menubar } from 'primeng/menubar';
import { InputText } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GeneroService } from '../../domain/genero/genero.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, Menubar, InputText, Ripple, Button, FormsModule],
    providers: [GeneroService],
    template: ` <p-menubar [model]="items" styleClass="glass-effect rounded-none border-t-0 border-x-0">
        <ng-template #start>
            <div class="flex items-center gap-2 px-4">
                <i class="pi pi-star text-pink-400 text-xl animate-pulse"></i>
                <span class="font-bold text-xl tracking-wider uppercase">My<span class="text-pink-400">Anime</span>List</span>
            </div>
        </ng-template>
        <ng-template #item let-item let-root="root">
            <a [routerLink]="item.routerLink" pRipple class="flex items-center p-menubar-item-link transition-colors hover:text-pink-300">
                <span>{{ item.label }}</span>
                <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                <i *ngIf="item.items" [ngClass]="['ml-auto pi', root ? 'pi-angle-down' : 'pi-angle-right']"></i>
            </a>
        </ng-template>
        <ng-template #end>
            <div class="flex items-center gap-3 pr-4">
                <div class="relative">
                    <input type="text" pInputText placeholder="Buscar anime..." class="w-48 glass-effect focus:ring-2 focus:ring-pink-400" [(ngModel)]="buscaInput" />
                </div>
                <p-button [icon]="'pi pi-search'" (click)="buscar()" styleClass="p-button-rounded bg-pink-500 hover:bg-pink-600 border-none shadow-lg"></p-button>
            </div>
        </ng-template>
    </p-menubar>`
})
export class AppTopbar implements OnInit {
    items!: MenuItem[];
    buscaInput: string = '';

    constructor(
        public layoutService: LayoutService,
        private readonly router: Router,
        private readonly generoService: GeneroService
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Início',
                icon: 'pi pi-home',
                routerLink: '/'
            },
            {
                label: 'Favoritos',
                icon: 'pi pi-heart',
                routerLink: '/favoritos'
            }
        ];
    }

    buscar(): void {
        if (this.buscaInput.trim().length > 0) this.router.navigate([`busca/${this.buscaInput}`]).then();
    }
}
