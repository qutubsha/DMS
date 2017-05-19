using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface ICompanyService
    {
        ICompany AddCompany(ICompany company);
    }
}
