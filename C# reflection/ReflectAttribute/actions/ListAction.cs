using System;
using System.Collections.Generic;
using System.Text;

namespace ReflectAttribute.actions
{
    [Actionable("list")]
    class ListAction : IActionable
    {
        public void VoidAction()
        {
            // being lazy, but here you could just re-use the reflect code to loop through all the actions getting the value of their Actionable attribute.
            // if you really wanted to, you could add a second parameter to the attribute for a "description" field.
            Console.WriteLine("hello");
            Console.WriteLine("goodbye");
            Console.WriteLine("exit (quit the program)");
        }
    }
}
