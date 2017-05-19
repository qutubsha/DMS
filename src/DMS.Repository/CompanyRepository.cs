using DMS.Abstraction;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DMSContext _context = null;

        public CompanyRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }

        public async Task AddCompany(Company company)
        {
            await _context.Companies.InsertOneAsync(company);
        }
    }
}
