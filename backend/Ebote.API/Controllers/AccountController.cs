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
    [Route("[controller]")]
    public class AccountController(IAccountRepository accountRepository) : ControllerBase
    {
        [HttpPost("[action]")]
        public async Task<IActionResult> SignUp([FromBody] AccountModel model)
        {
            await accountRepository.CreateAsync(model.Login, model.PasswordHash);

            return Ok();
        }
        
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] AccountModel loginModel)
        {
            var account = await accountRepository.CheckAccountAsync(loginModel.Login, loginModel.PasswordHash);

            if (account?.Profile is null)
                return Unauthorized();
            
            var claims = new List<Claim>
            {
                new (ClaimTypes.Name, loginModel.Login),
                new (ClaimTypes.NameIdentifier, account.Profile.Id.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

            return Ok();
        }
        
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult CheckAuth() => Ok();
    }
}
