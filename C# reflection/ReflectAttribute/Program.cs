using System;
using System.Collections.Generic;
using System.Linq;

namespace ReflectAttribute
{
    class Program
    {
        static void Main(string[] args)
        {
            // look for actions
            var searchForType = typeof(IActionable);
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => searchForType.IsAssignableFrom(p) && p.IsClass);

            // Initialize empty list to hold our Actionables
            List<IActionable> Actions = new List<IActionable>();

            foreach (var t in types)
            {
                // add a new instance cast to our interface to the list: We know the interface is valid 
                // because we used reflection to find only classes that implement the interface.
                Actions.Add((IActionable)Activator.CreateInstance(t));
            }
            string userIn;
            while (true)
            {
                Console.WriteLine("type action or type \"list\" for a list of actions.");
                userIn = Console.ReadLine();
                // return early. We don't want to check the list if the user wants to quit.
                if (userIn == "exit")
                    return;
                var actionable = Actions.FirstOrDefault(a => ((Actionable)Attribute.GetCustomAttribute(a.GetType(), typeof(Actionable))).getCommandName() == userIn);
                if (actionable != null)
                    actionable.VoidAction();
                else
                    Console.WriteLine("Found no action matching: " + userIn);
            }
        }
    }
}
