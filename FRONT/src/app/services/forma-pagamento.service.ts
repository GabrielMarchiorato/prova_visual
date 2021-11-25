import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FormaPagamento } from "../models/forma-pagamento";
import { Produto } from "../models/produto";

@Injectable({
    providedIn: "root",
})
export class FormaPagamentoService {
    private baseUrl = "http://localhost:5000/api/forma-pagamento";

    constructor(private http: HttpClient) {}

    list(): Observable<FormaPagamento[]> {
        return this.http.get<FormaPagamento[]>(`${this.baseUrl}/list`);
    }
    create(forma: FormaPagamento): Observable<FormaPagamento> {
        return this.http.post<FormaPagamento>(`${this.baseUrl}/create`, forma);
    }
}
