using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Exceptions
{
    public class RecordAlreadyExist : Exception
    {
        public RecordAlreadyExist() : this("Record already exist")
        {

        }
        public RecordAlreadyExist(string message) : base(message)
        {

        }
    }
}
