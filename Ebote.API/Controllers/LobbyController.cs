using System.Security.Claims;
using Ebote.Core;
using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ebote.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class LobbyController(ILobbyRepository lobbyRepository, IProfileRepository profileRepository, GameStorage gameStorage) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Lobby>> Create()
        {
            var profileId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            
            var lobby = await lobbyRepository.CreateAsync(profileId);
            await profileRepository.UpdateActiveLobbyAsync(profileId, lobby.Id);

            gameStorage.Lobbies.TryAdd(lobby.Id, new GameLobby(lobby.Id, profileId));

            return Ok(lobby);
        }

        [HttpGet("List")]
        public async Task<ActionResult<Lobby[]>> GetList(int? page, int? pageSize)
        {
            var profileId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var lobbies = await lobbyRepository.GetListAsync(profileId, page, pageSize);

            return Ok(lobbies);
        }

        [HttpGet("Active")]
        public ActionResult<DateTime[]> GetActiveLobbyStartTimeList()
        {
            return Ok(gameStorage.Lobbies.Values.Select(x => x.CreateTime).ToArray());
        }
    }
}
