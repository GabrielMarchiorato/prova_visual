import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria";
import { FormaPagamento } from "src/app/models/forma-pagamento";
import { Produto } from "src/app/models/produto";
import { CategoriaService } from "src/app/services/categoria.service";
import { FormaPagamentoService } from "src/app/services/forma-pagamento.service";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
    selector: "app-cadastrar-forma-pagamento",
    templateUrl: "./cadastrar-forma-pagamento.component.html",
    styleUrls: ["./cadastrar-forma-pagamento.component.css"],
})
export class CadastrarFormaPagamentoComponent implements OnInit {
    nome!: string;
    descricao!: string;
    quantidade!: number;
    preco!: number;
    categorias!: Categoria[];
    formaId!: number;

    constructor(
        private router: Router,
        private service: FormaPagamentoService,
    ) {}

    ngOnInit(): void {
    }

    cadastrar(): void {
        let forma: FormaPagamento = {
            nome: this.nome,
            descricao: this.descricao,
            formaPagamentoId: this.formaId,
            CriadoEm: new Date(),
        };
        this.service.create(forma).subscribe((forma) => {
            console.log(forma);
            this.router.navigate(["forma-pagamento/listar"]);
        });
    }
}
