import {Marca} from '../interfaces/marca';

export interface Carro {
    id: number;
    marcaId: number;
    modelo: string;
    ano: string;
    marca: Marca;
}
