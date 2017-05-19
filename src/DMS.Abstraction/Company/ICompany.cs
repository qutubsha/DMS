using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface ICompany
    {
        string CompanyID { get; set; }
        string CompanyName { get; set; }
        string Description { get; set; }
    }
}
