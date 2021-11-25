import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categoria } from "../models/categoria";
import { ItemVenda } from "../models/item-venda";
import { Venda } from "../models/venda";

@Injectable({
    providedIn: "root",
})
export class CategoriaService {
    private baseUrl = "http://localhost:5000/api/venda";

    venda: Venda = {} as Venda;

    constructor(private http: HttpClient) {}

    list(): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.baseUrl}/list`);
    }

    create(venda: Venda): Observable<Venda> {
        return this.http.post<Venda>(`${this.baseUrl}/create`, venda);
    }

    addItensToCart(item: ItemVenda): void {
        this.venda.Itens.push(item);
    }
    
    removeItemFromCart(item: ItemVenda): void {
        this.venda.Itens.splice(this.venda.Itens.indexOf(item), 1);
    }
}
