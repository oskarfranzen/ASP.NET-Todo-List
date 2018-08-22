using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers {
    [Route("api/todo")]
    public class TodoController : Controller {
        private readonly TodoContext _context;

        public TodoController(TodoContext context) {
            _context = context;

            if (_context.TodoItems.Count() == 0) {
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<TodoItem> GetAll() {
            return _context.TodoItems.ToList();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(long id) {
            var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (item == null) {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult CreateTodoItem([FromBody] TodoItem itemToCreate) {
            if (itemToCreate == null) {
                return BadRequest();
            }
            _context.TodoItems.Add(itemToCreate);
            _context.SaveChanges();

            
            return CreatedAtRoute("GetTodo", new {Id = itemToCreate.Id }, itemToCreate);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodoItem(long id, [FromBody] TodoItem itemToUpdate) {
            if (itemToUpdate == null) {
                return NotFound();
            }
            var item = _context.TodoItems.FirstOrDefault(x => x.Id == id);
            if (item != null) {
                item.Name = itemToUpdate.Name;
                item.IsComplete = itemToUpdate.IsComplete;
                _context.TodoItems.Update(item);
                _context.SaveChanges();
            }

            return new NoContentResult();

        }
    }
}