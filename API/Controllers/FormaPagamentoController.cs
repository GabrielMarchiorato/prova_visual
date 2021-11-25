using System;
using System.Linq;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/forma-pagamento")]
    public class FormaPagamentoController : ControllerBase
    {
        private readonly DataContext _context;
        public FormaPagamentoController(DataContext context)
        {
            _context = context;
        }

        //POST: api/FormaPagamento/create
        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] FormaPagamento FormaPagamento)
        {
            _context.FormasPagamento.Add(FormaPagamento);
            _context.SaveChanges();
            return Created("", FormaPagamento);
        }

        //GET: api/FormaPagamento/list
        [HttpGet]
        [Route("list")]
        public IActionResult List() =>
            Ok(_context.FormasPagamento
            .ToList());

        //GET: api/FormaPagamento/getbyid/1
        [HttpGet]
        [Route("getbyid/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            FormaPagamento FormaPagamento = _context.FormasPagamento.Find(id);
            if (FormaPagamento == null)
            {
                return NotFound();
            }
            return Ok(FormaPagamento);
        }

        //DELETE: /api/FormaPagamento/delete/bolacha
        [HttpDelete]
        [Route("delete/{name}")]
        public IActionResult Delete([FromRoute] string name)
        {
            //Expressão lambda
            //Buscar um objeto na tabela de FormasPagamento com base no nome
            FormaPagamento FormaPagamento = _context.FormasPagamento.FirstOrDefault(FormaPagamento => FormaPagamento.Nome == name);

            if (FormaPagamento == null)
            {
                return NotFound();
            }
            _context.FormasPagamento.Remove(FormaPagamento);
            _context.SaveChanges();
            return Ok(_context.FormasPagamento.ToList());
        }


        //PUT: api/FormaPagamento/update
        [HttpPut]
        [Route("update")]
        public IActionResult Update([FromBody] FormaPagamento FormaPagamento)
        {
            _context.FormasPagamento.Update(FormaPagamento);
            _context.SaveChanges();
            return Ok(FormaPagamento);
        }
    }
}