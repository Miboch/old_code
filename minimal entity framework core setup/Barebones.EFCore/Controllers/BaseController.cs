using Barebones.EFCore.database;
using Barebones.EFCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barebones.EFCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController<ModelType> where ModelType : DataEntity, new()
    {

        protected MyDatabaseContext context;
        protected DbSet<ModelType> set;
        public BaseController(MyDatabaseContext context)
        {
            this.context = context;
            set = context.Set<ModelType>();
        }

        //list get
        [HttpGet]
        public virtual async Task<ActionResult> GetList()
        {

            return new JsonResult(await set.ToListAsync());
        }

        // single get
        [HttpGet("{id}")]
        public virtual async Task<ActionResult> GetSingle([FromRoute] int Id)
        {
            return new JsonResult(await set.FirstOrDefaultAsync(x => x.Id == Id));
        }

        [HttpPost]
        public virtual async Task<ActionResult> Post([FromBody] ModelType model)
        {
            set.Add(model);
            await context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpPut]
        public virtual async Task<ActionResult> Put([FromBody] ModelType model)
        {
            set.Update(model);
            await context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpDelete]
        public virtual async Task<ActionResult> Delete([FromRoute] int id)
        {
            var toRemove = await set.FindAsync(id);
            set.Remove(toRemove);
            await context.SaveChangesAsync();
            return new OkResult();
        }


    }
}
