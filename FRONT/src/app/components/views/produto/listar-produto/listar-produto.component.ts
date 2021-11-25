import { Component, OnInit } from "@angular/core";
import { ItemVenda } from "src/app/models/item-venda";
import { Produto } from "src/app/models/produto";
import { CartService } from "src/app/services/carrinho.service";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: "app-listar-produto",
    templateUrl: "./listar-produto.component.html",
    styleUrls: ["./listar-produto.component.css"],
})
export class ListarProdutoComponent implements OnInit {
    produtos: Produto[] = [];
    colunasExibidas: String[] = [
        "id",
        "nome",
        "descricao",
        "preco",
        "quantidade",
        "categoria",
        "adicionar"
    ];

    constructor(
        private service: ProdutoService,
        private cartService: CartService
        ) {}

    ngOnInit(): void {
        this.service.list().subscribe((produtos) => {
            this.produtos = produtos;
        });
    }

    addToCart(produto: Produto): void {
        let item = {} as ItemVenda
        item.produto = produto;
        item.quantidade = 1;
        item.preco = produto.preco;
        item.criadoEm = new Date();
        this.cartService.addItensToCart(item);
    }
}
