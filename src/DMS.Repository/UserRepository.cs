using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace DMS.Repository
{
    public class UserRepository : IUserRepository
    {
        public readonly DMSContext _context=null;

        public UserRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }


    }
}
