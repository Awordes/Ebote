using System.Security.Claims;
using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ebote.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class LobbyController(ILobbyRepository lobbyRepository) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Lobby>> Create()
        {
            var accountId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            
            var lobby = await lobbyRepository.CreateAsync(accountId);

            return Ok(lobby);
        }

        [HttpGet]
        public async Task<ActionResult<Lobby[]>> GetList(int? page, int? pageSize)
        {
            var accountId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var lobbies = await lobbyRepository.GetListAsync(accountId, page, pageSize);

            return Ok(lobbies);
        }
    }
}
