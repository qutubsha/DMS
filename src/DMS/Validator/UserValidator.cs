using DMS.Abstraction;
using FluentValidation;
using System;

namespace DMS.Validator
{
    /// <summary>
    /// User Validation rule
    /// </summary>
    public class UserValidator : AbstractValidator<IUser>, IValidator<IUser>
    {
        /// <summary>
        /// 
        /// </summary>
        public UserValidator()
        {
            RuleFor(p => p.Email).NotEmpty();
            RuleFor(p => p.UserName).NotEmpty();
            RuleFor(p => p.UserName).Length(1, 30);
            RuleFor(p => p.Password).NotEmpty();
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        public void IsValid(IUser user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            this.ValidateAndThrow(user);
        }

    }
}
