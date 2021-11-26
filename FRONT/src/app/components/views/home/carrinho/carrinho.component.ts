import { Component, OnInit } from "@angular/core";
import { FormaPagamento } from "src/app/models/forma-pagamento";
import { ItemVenda } from "src/app/models/item-venda";
import { Venda } from "src/app/models/venda";
import { CartService } from "src/app/services/carrinho.service";
import { FormaPagamentoService } from "src/app/services/forma-pagamento.service";
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
    colunasVendas: String[] = ["cliente", "preco", "formaPagamento", "criadoEm"];
    valorTotal!: number;
    vendasAnteriores: Venda[] = [];
    formasPagamento: FormaPagamento[] = [];
    selectedPaymentMethod = "";
    constructor(
        private cartService: CartService,
        private formaPagamentoService: FormaPagamentoService,
        ) {
        this.cartService.getFromLocalStorage();
    }

    ngOnInit(): void {
        this.carrinho = this.cartService.getCarrinho();
        this.retornarVendasAnteriores();
        this.calculateTotal();
        this.listFormasPagamento();
        
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
                this.retornarVendasAnteriores();
            },
            (error) => alert("Erro ao realizar a compra!")
            )
    }

    listFormasPagamento() {
        this.formaPagamentoService.list().subscribe(
            (formasPagamento: any) => {
                this.formasPagamento = formasPagamento
                console.log(formasPagamento)
                this.carrinho.FormaPagamento = formasPagamento[0];
            },
            console.log
        )
    }

    retornarVendasAnteriores(){
        this.cartService.list().subscribe(
            (vendas: any) => {
                let VendasAnteriores = vendas
                console.log(VendasAnteriores)
                VendasAnteriores.map((venda: any) => {
                    let valorTotal = 0;
                    console.log(venda)
                    venda.itens.forEach((item: any) => {
                        valorTotal += item.preco * item.quantidade;
                    })
                    venda.ValorTotal = valorTotal;
                    return venda;
                })
                this.vendasAnteriores = VendasAnteriores
            },
            console.log
        )

    }
}
