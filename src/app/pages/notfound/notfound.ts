import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, ButtonModule],
    template: `
        <main
            role="main"
            class="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-surface-ground to-transparent"
            aria-labelledby="notfound-title"
        >
            <section class="max-w-md w-full text-center p-8 rounded-2xl shadow-lg bg-surface-0 dark:bg-surface-900">
                <!-- Cute chibi SVG -->
                <div class="mx-auto w-40 h-40 mb-6" aria-hidden="true">
                    <img
                        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGh0MW9jbmJieHV5bzNubHA5dTJtdHo4aHhxc3d3MzR4ZjFsOGplcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0Pky6C83SzkzU55a/giphy.gif"
                        alt="Mascote chibi procurando"
                        class="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <p class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2">Página não encontrada</p>
                <p class="text-surface-600 dark:text-surface-200 mb-6">
                    Parece que esse episódio não existe — vamos voltar para a lista?
                </p>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button pButton type="button" label="Voltar à lista de animes" routerLink="/animes" class="flex-1" aria-label="Voltar à lista de animes"></button>
                    <button pButton type="button" label="Início" routerLink="/" class="p-button-outlined flex-1" aria-label="Ir para a página inicial"></button>
                </div>

                <p class="mt-4 text-sm text-surface-500 dark:text-surface-300">
                    Dica: verifique a URL ou use a busca para encontrar outro anime.
                </p>
            </section>
        </main>
    `,
    styles: [`
    :host { display: block; }
    /* pequeno bounce para o SVG para dar vida */
    .w-40 svg { animation: float 4s ease-in-out infinite; }
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-6px) scale(1.01); }
      100% { transform: translateY(0); }
    }

    /* accessibility focus visible */
    button:focus { outline: 3px solid color-mix(in srgb, var(--primary-color), black 10%); outline-offset: 3px; }
  `]
})
export class Notfound {}
