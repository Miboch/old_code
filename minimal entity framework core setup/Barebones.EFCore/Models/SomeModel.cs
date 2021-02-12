using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barebones.EFCore.Models
{
    public class SomeModel : DataEntity
    {
        public string FieldOne { get; set; }
        public string FieldTwo { get; set; }
        public string FieldThree { get; set; }
        public string FieldFour { get; set; }
    }
}
