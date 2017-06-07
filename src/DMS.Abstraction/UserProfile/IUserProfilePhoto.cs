using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.UserProfile
{
    /// <summary>
    /// 
    /// </summary>
    public interface IUserProfilePhoto
    {
        /// <summary>
        /// 
        /// </summary>
        int ImageID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        byte[] Image1 { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string ContentType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string FileName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        Nullable<System.DateTime> CreatedOn { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string ConvertedImage { get; set; }
    }
}
