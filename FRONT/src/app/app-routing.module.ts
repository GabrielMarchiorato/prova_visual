import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastrarFormaPagamentoComponent } from "./components/views/forma-pagamento/cadastrar-forma/cadastrar-forma-pagamento.component";
import { ListarFormaPagamentoComponent } from "./components/views/forma-pagamento/listar-formas/listar-forma-pagamento.component";
import { CarrinhoComponent } from "./components/views/home/carrinho/carrinho.component";
import { IndexComponent } from "./components/views/home/index/index.component";
import { CadastrarProdutoComponent } from "./components/views/produto/cadastrar-produto/cadastrar-produto.component";
import { ListarProdutoComponent } from "./components/views/produto/listar-produto/listar-produto.component";

const routes: Routes = [
    {
        path: "",
        component: IndexComponent,
    },
    {
        path: "home/carrinho",
        component: CarrinhoComponent,
    },
    {
        path: "produto/listar",
        component: ListarProdutoComponent,
    },
    {
        path: "produto/cadastrar",
        component: CadastrarProdutoComponent,
    },
    {
        path: "forma-pagamento/listar",
        component: ListarFormaPagamentoComponent,
    },
    {
        path: "forma-pagamento/cadastrar",
        component: CadastrarFormaPagamentoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
