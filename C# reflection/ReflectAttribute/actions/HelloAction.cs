using System;
using System.Collections.Generic;
using System.Text;

namespace ReflectAttribute.actions
{
    [Actionable("hello")]
    public class HelloAction : IActionable
    {
        public void VoidAction()
        {
            Console.WriteLine("Hello There");
        }
    }
}
