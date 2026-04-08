import { Expose } from 'class-transformer';

export class UsuarioResponseModel {
    @Expose({ name: 'balancoTotal' })
    balanco_total!: number;

    @Expose({ name: 'saldoDisponivel' })
    saldo_disponivel!: number;

    id!: number;
}
