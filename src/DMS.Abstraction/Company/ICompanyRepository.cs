﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface ICompanyRepository
    {
        ICompany AddCompany(ICompany company);
    }
}
