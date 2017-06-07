using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.UserProfile
{
    /// <summary>
    /// 
    /// </summary>
    public class UserProfilePhoto : IUserProfilePhoto
    {
        /// <summary>
        /// 
        /// </summary>
        public int ImageID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public byte[] Image1 { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ContentType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Nullable<System.DateTime> CreatedOn { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ConvertedImage { get; set; }
    }
}
