using System.Security.Claims;
using Ebote.API.Models;
using Ebote.Domain.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ebote.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController(IAccountRepository accountRepository) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] AccountModel model)
        {
            await accountRepository.AddAsync(new Domain.Entities.Account
            {
                Login = model.Login,
                PasswordHash = model.PasswordHash
            });

            return Ok();
        }
        
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] AccountModel loginModel)
        {
            if (!await accountRepository.CheckAccountAsync(loginModel.Login, loginModel.PasswordHash))
                return Unauthorized();
            
            var claims = new List<Claim> { new (ClaimTypes.Name, loginModel.Login) };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            return Ok();
        }
        
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult CheckAuth() => Ok();
    }
}
