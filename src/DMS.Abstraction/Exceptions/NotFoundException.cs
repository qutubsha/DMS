using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : this("Record not found")
        {

        }

        public NotFoundException(string message) : base(message)
        {

        }
    }
}
