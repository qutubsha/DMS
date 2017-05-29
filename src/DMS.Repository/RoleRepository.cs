using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Abstraction.Roles;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;

namespace DMS.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DMSContext _context = null;

        public RoleRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);

        }
        public List<IRole> GetRoles()
        {
            var lstRepositoryRole = _context.Roles.AsQueryable().ToList();
            var lstAbstractRole = new List<IRole>();
            if (lstRepositoryRole == null || lstRepositoryRole.Count <= 0) { throw new NullReferenceException(nameof(lstRepositoryRole)); }
            foreach (Role role in lstRepositoryRole)
            {
                var localRole = new Role()
                {
                    RoleId = role.RoleId,
                    RoleName = role.RoleName,
                    IsActive = role.IsActive,
                    CreatedOn = role.CreatedOn,
                    UpdatedOn = role.UpdatedOn,
                    Rights = role.Rights
                };

                lstAbstractRole.Add(localRole);
            }
            return lstAbstractRole;
        }

        public IRole AddRole(Role role)
        {
            if (role == null) { throw new ArgumentNullException(nameof(role), "role should not be null."); }

            // TO Do: PropertyName.ToLower() is not supported for Mongo Linq

            //if (_context.Roles.AsQueryable().Count(x => x.RoleName.ToLower().Trim() == role.RoleName.ToLower().Trim()) > 0)
            //{
            //    throw new ArgumentException(role.RoleName + " : RoleName already exist in a system.");
            //}

            // To Do: demo purpose - to be improved
            var maxRoleId = _context.Roles.AsQueryable().Max(p => p.RoleId);

            var varRole = new Role()
            {
                RoleId = ++maxRoleId,
                RoleName = role.RoleName,
                IsActive = role.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = role.UpdatedOn
            };

            _context.Roles.InsertOne(varRole);

            return varRole;
        }

        public IRole UpdateRole(Role role)
        {
            if (role == null) { throw new ArgumentNullException(nameof(role), "role should not be null."); }

            var repositoryRole = _context.Roles.AsQueryable().FirstOrDefault(x => x.RoleId == role.RoleId);
            if (repositoryRole == null) { throw new ArgumentNullException(nameof(role), "No such Role exists in the system."); }

            // TO Do: PropertyName.ToLower() is not supported for Mongo Linq

            //if (_context.Roles.AsQueryable().Count(x => x.RoleName.ToLower().Trim() == role.RoleName.ToLower().Trim()) > 0)
            //{
            //    throw new ArgumentException(role.RoleName + " : RoleName already exist in a system.");
            //}

            repositoryRole.RoleName = role.RoleName;
            repositoryRole.IsActive = role.IsActive;
            repositoryRole.UpdatedOn = DateTime.Now;

            //If rights are passed for the specific role
            if (role.Rights != null && role.Rights.Count > 0)
            {
                repositoryRole.Rights = new List<Rights>();
                foreach (var sngleRight in role.Rights)
                {
                    repositoryRole.Rights.Add(sngleRight);
                }
            }


            var filter = Builders<Role>.Filter.Eq(s => s.RoleId, role.RoleId);
            _context.Roles.ReplaceOne(filter, repositoryRole);

            return repositoryRole;
        }

        public List<IRights> GetRights()
        {
            var lstRepositoryRight = _context.Rights.AsQueryable().ToList();
            var lstAbstractRight = new List<IRights>();
            if (lstRepositoryRight == null || lstRepositoryRight.Count <= 0) { throw new NullReferenceException(nameof(lstRepositoryRight)); }
            foreach (Rights right in lstRepositoryRight)
            {
                var localRole = new Rights()
                {
                    RightId = right.RightId,
                    RightName = right.RightName
                };
                lstAbstractRight.Add(localRole);
            }
            return lstAbstractRight;
        }
    }
}
