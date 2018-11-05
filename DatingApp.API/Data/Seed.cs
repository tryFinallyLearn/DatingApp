using System.Collections.Generic;
using System.IO;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext context;
        public Seed(DataContext context)
        {
            this.context = context;
        }

        public void SeedUsers()
        {
            var userData = File.ReadAllText("Data/userSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var item in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);

                item.passwordHash = passwordHash;
                item.PasswordSalt = passwordSalt;
                item.Username = item.Username.ToLower();

                context.Users.Add(item);
            }
            context.SaveChanges();
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}