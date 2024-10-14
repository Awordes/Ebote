using System.Security.Claims;
using Ebote.API.Models;
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
    public class ProfileController(IProfileRepository profileRepository, GameStorage gameStorage) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<Profile>> Get()
        {
            var profileId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var profile = await profileRepository.GetByIdAsync(profileId);

            if (profile.ActiveLobby is not null
                && gameStorage.Lobbies.ContainsKey(profile.ActiveLobby.Id))
                await profileRepository.ClearActiveLobbyAsync(profileId);

            return Ok(profile);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddWizard([FromBody] WizardModel model)
        {
            var profileId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var profile = await profileRepository.GetByIdAsync(profileId);

            if (profile.ActiveLobby is null) throw new Exception("Not found active lobby");

            if (!gameStorage.Lobbies.TryGetValue(profile.ActiveLobby.Id, out var gameLobby))
                throw new Exception("Game lobby not found.");

            gameLobby.AddWizard(profileId, model.MagicType, model.SideType, model.Name);

            return Ok();
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<GameLobby>> GetActiveLobbyState()
        {
            
            var profileId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var profile = await profileRepository.GetByIdAsync(profileId);

            if (profile.ActiveLobby is null) throw new Exception("Not found active lobby");

            if (!gameStorage.Lobbies.TryGetValue(profile.ActiveLobby.Id, out var gameLobby))
                throw new Exception("Game lobby not found.");
            
            return Ok(gameLobby);
        }
    }
}
