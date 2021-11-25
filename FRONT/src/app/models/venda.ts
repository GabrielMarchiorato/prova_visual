import { ItemVenda } from "./item-venda";

export interface Venda {
    VendaId?: number;
    Cliente: string;
    Itens: ItemVenda[];
    CriadoEm?: Date;
}
