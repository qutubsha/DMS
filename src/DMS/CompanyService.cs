using DMS.Abstraction;
using DMS.Validator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS
{
    public class CompanyService : ICompanyService
    {
        private static CompanyValidator CompanyValidator { get; } = new CompanyValidator();

        /// <summary>
        /// Private ICompanyRepository variable
        /// </summary>
        private ICompanyRepository _repository;

        /// <summary>
        /// Setting private ICompanyRepository variable
        /// </summary>
        /// <param name="repository"></param>
        public CompanyService(ICompanyRepository repository)
        {
            _repository = repository;
        }

        public async Task AddCompany(Company company)
        {
            // Throws null exception if company value is null
            if (company == null) throw new ArgumentNullException(nameof(company), "Company should not be null");

            // Validate company before saving it to database
            CompanyValidator.IsValid(company);

            // returns new company with DepartmentId
            await _repository.AddCompany(company);
        }
    }
}
