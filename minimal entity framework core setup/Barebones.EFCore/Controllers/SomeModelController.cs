using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Barebones.EFCore.database;
using Barebones.EFCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barebones.EFCore.Controllers
{

    public class SomeModelController : BaseController<SomeModel>
    {
        public SomeModelController(MyDatabaseContext context) : base(context) { }

    }
}