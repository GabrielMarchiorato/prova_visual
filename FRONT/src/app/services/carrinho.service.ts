import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemVenda } from "../models/item-venda";
import { Venda } from "../models/venda";

@Injectable({
    providedIn: "root",
})
export class CartService {
    private baseUrl = "http://localhost:5000/api/venda";

    venda: Venda = {
        Itens: [],
        Cliente: "",
        CriadoEm: new Date(Date.now()),
    };

    constructor(private http: HttpClient) {}

    list(): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.baseUrl}/list`);
    }

    create(venda: Venda): Observable<Venda> {
        let payload = {...venda}
        payload.Itens.forEach(item => {
            item.produtoId = item.produto!.produtoId!;
            delete item.produto;
        });

        return this.http.post<Venda>(`${this.baseUrl}/create`, payload);
    }

    addItensToCart(item: ItemVenda): void {
        let itens = this.venda.Itens;

        let foundItem = itens.find((i: ItemVenda) => i.produto!.produtoId === item.produto!.produtoId);
        if (foundItem){
            foundItem.quantidade += item.quantidade;
        } else {
            itens.push(item);
        }
        this.updateInLocalStorage();
    }
    
    removeItemFromCart(item: ItemVenda): void {
        this.venda.Itens.splice(this.venda.Itens.indexOf(item), 1);
        this.updateInLocalStorage();
    }

    updateInLocalStorage(): void {
        localStorage.setItem("venda", JSON.stringify(this.venda));
    }

    getFromLocalStorage(): void {
        let stored = localStorage.getItem("venda");
        if (stored) {
            this.venda = JSON.parse(stored);
        } else {
            this.venda = {
                Itens: [],
                Cliente: "",
                CriadoEm: new Date(Date.now()),
            };
        }
    }

    clear() {
        this.venda.Itens = [];
        this.deleteCartFromLocalStorage();
    }

    deleteCartFromLocalStorage(): void {
        localStorage.removeItem("venda");
    }

    getCarrinho(): Venda {
        return this.venda;
    }
}
