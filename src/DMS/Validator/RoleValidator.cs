using System;
using DMS.Abstraction;
using FluentValidation;

namespace DMS.Validator
{
    public class RoleValidator : AbstractValidator<IRole>, IValidator<IRole>
    {

        public RoleValidator()
        {
            RuleFor(p => p.RoleName).NotEmpty();
            RuleFor(p => p.RoleName).Length(1, 255);
            RuleFor(p => p.IsActive).NotEmpty();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="role"></param>
        public void IsValid(IRole role)
        {
            if (role == null) throw new ArgumentNullException(nameof(role));
            this.ValidateAndThrow(role);
        }
    }
}
