using System;
using System.Collections.Generic;

namespace API.Models
{
    public class FormaPagamento
    {
        public FormaPagamento() => CriadoEm = DateTime.Now;
        public int FormaPagamentoId { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime CriadoEm { get; set; }
        // public List<Produto> Produtos { get; set; }
    }
}