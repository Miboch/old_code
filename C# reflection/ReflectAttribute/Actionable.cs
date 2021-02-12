using System;
using System.Collections.Generic;
using System.Text;

namespace ReflectAttribute
{
    [System.AttributeUsage(System.AttributeTargets.Class)]
    class Actionable : System.Attribute
    {
        private string commandName;
        public Actionable(string command)
        {
            commandName = command;
        }

        public string getCommandName()
        {
            return commandName;
        }

    }
}
