import { Component, OnInit } from "@angular/core";
import { ItemVenda } from "src/app/models/item-venda";
import { Venda } from "src/app/models/venda";
import { CartService } from "src/app/services/carrinho.service";
import { ItemService } from "src/app/services/item.service";

@Component({
    selector: "app-carrinho",
    templateUrl: "./carrinho.component.html",
    styleUrls: ["./carrinho.component.css"],
})
export class CarrinhoComponent implements OnInit {
    itens: ItemVenda[] = [];
    carrinho: Venda = {} as Venda;
    colunasExibidas: String[] = ["nome", "preco", "quantidade", "imagem"];
    valorTotal!: number;
    constructor(private cartService: CartService) {
        this.cartService.getFromLocalStorage();
    }

    ngOnInit(): void {
        this.carrinho = this.cartService.getCarrinho();

        this.calculateTotal()
    }

    calculateTotal() {
        let total = 0;
        this.carrinho.Itens.forEach((item) => {
            total += item.preco * item.quantidade;
        });
        this.valorTotal = total;
    }

    checkout() {
        this.cartService.create(this.carrinho).subscribe(
            (venda) => {
                alert("Compra realizada com sucesso!")
                this.cartService.clear();
                this.valorTotal = 0;
            },
            (error) => alert("Erro ao realizar a compra!")
            )
    }
}
