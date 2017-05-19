using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using FluentValidation;

namespace DMS.Validator
{
    public class CompanyValidator : AbstractValidator<ICompany>, IValidator<ICompany>
    {
        public CompanyValidator()
        {
            RuleFor(p => p.CompanyID).NotEmpty();
            RuleFor(p => p.CompanyName).NotEmpty();
            RuleFor(p => p.CompanyName).Length(1, 255);
            RuleFor(p => p.Description).NotEmpty();
        }

        public void IsValid(ICompany company)
        {
            if (company == null) throw new ArgumentNullException(nameof(company));
            this.ValidateAndThrow(company);
        }
    }
}
