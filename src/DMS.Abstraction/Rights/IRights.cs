﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IRights
    {
        int RightId { get; set; }
        string RightName { get; set; }
    }
}
