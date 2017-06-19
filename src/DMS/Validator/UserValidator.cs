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
            RuleFor(p => p.Email).NotNull().NotEmpty();
            // RuleFor(p => p.UserName).NotEmpty();
            // RuleFor(p => p.UserName).Length(1, 5);
            RuleFor(p => p.Password).NotEmpty();
            RuleFor(p => p.Password).Length(8, 255);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        public void IsValid(IUser user)
        {
            try
            {
                if (user == null) throw new ArgumentNullException(nameof(user));

                //var result=this.Validate(user);
                //if(result.Errors.Count > 0)
                //{
                //    throw new Exception(result.Errors[0].ErrorMessage);
                //}

                this.ValidateAndThrow(user);

                //this.ValidateAndThrowAsync(user);
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

    }
}
