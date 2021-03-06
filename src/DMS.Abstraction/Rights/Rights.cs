﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    [BsonIgnoreExtraElements]
    public class Rights : IRights
    {
        public int RightId { get; set; }
        public string RightName { get; set; }
    }
}
