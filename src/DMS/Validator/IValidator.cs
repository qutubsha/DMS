using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Validator
{
    public interface IValidator<in T>
    {
        void IsValid(T t);
    }
}
