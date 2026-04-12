import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private messageService: MessageService) { }

    sucesso(summary: string, detail: string = '') {
        this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
    }

    informacao(summary: string, detail: string = '') {
        this.messageService.add({ severity: 'info', summary, detail, life: 3000 });
    }

    aviso(summary: string, detail: string = '') {
        this.messageService.add({ severity: 'warn', summary, detail, life: 3000 });
    }

    erro(summary: string, detail: string = '') {
        this.messageService.add({ severity: 'error', summary, detail, life: 3000 });
    }

    notificarErroHttp(error: any, summary: string = 'Erro') {
        const detail = error?.error?.detail || error?.detail || 'Ocorreu um erro inesperado.';
        this.erro(summary, detail);
    }
}
