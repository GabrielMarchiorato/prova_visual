import { Component, OnInit } from "@angular/core";
import { FormaPagamento } from "src/app/models/forma-pagamento";
import { Produto } from "src/app/models/produto";
import { FormaPagamentoService } from "src/app/services/forma-pagamento.service";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: "app-listar-forma-pagamento",
    templateUrl: "./listar-forma-pagamento.component.html",
    styleUrls: ["./listar-forma-pagamento.component.css"],
})
export class ListarFormaPagamentoComponent implements OnInit {
    formas: FormaPagamento[] = [];
    colunasExibidas: String[] = [
        "formaId",
        "nome",
        "descricao",
    ];

    constructor(private service: FormaPagamentoService) {}

    ngOnInit(): void {
        this.service.list().subscribe((formas) => {
            this.formas = formas;
        });
    }
}
