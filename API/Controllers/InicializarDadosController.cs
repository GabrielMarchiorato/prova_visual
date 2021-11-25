using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/inicializar")]
    public class InicializarDadosController : ControllerBase
    {
        private readonly DataContext _context;
        public InicializarDadosController(DataContext context)
        {
            _context = context;
        }

        //POST: api/inicializar/create
        [HttpPost]
        [Route("create")]
        public IActionResult Create()
        {
            _context.Categorias.AddRange(new Categoria[]
                {
                    new Categoria { CategoriaId = 1, Nome = "Mini Árvores" },
                    new Categoria { CategoriaId = 2, Nome = "Coisas de chão" },
                }
            );
            _context.Produtos.AddRange(new Produto[]
                {
                    new Produto { ProdutoId = 1, Nome = "Brócolis", Preco = 5, Quantidade = 1, CategoriaId = 1, Descricao = "Mini árvore, verde" },
                    new Produto { ProdutoId = 2, Nome = "Couve-flor", Preco = 3, Quantidade = 1, CategoriaId = 1, Descricao = "Mini árvore, não verde" },
                    new Produto { ProdutoId = 3, Nome = "Batata", Preco = 4, Quantidade = 1, CategoriaId = 2, Descricao = "Fica no chão, por baixo" },
                }
            );
            _context.SaveChanges();
            return Ok(new { message = "Dados inicializados com sucesso!" });
        }
    }
}