using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers {
    [Route("api/IsDone")]
    public class IsDoneController : Controller {
        private readonly TodoContext _context;

        public IsDoneController(TodoContext context) {
            _context = context;

            if (_context.TodoItems.Count() == 0) {
                _context.TodoItems.Add(new TodoItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<TodoItem> GetAll() {
            return _context.TodoItems.Where(x=> x.IsComplete).ToList();
        }

        [HttpGet("{id}", Name = "GetIsDone")]
        public IActionResult GetById(long id) {
            var item = _context.TodoItems.FirstOrDefault(t => (t.Id == id) && t.IsComplete);
            if (item == null) {
                return NotFound();
            }
            return new ObjectResult(item);
        }
    }
}