using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        // [StringLength(8, MinimumLength: 4, ErrorMessage: "You must specify password between 4 and 8 characters.")]
        [StringLength(8)]
        public string Password { get; set; }
    }

    public class UserForLoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}