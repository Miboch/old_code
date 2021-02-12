using System;
using System.Collections.Generic;
using System.Text;

namespace ReflectAttribute.actions
{
    [Actionable("goodbye")]
    public class GoodbyeAction : IActionable
    {
        public void VoidAction()
        {
            Console.WriteLine("Goodbye for now");
        }
    }
}
