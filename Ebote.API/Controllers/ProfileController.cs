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
                && gameStorage.GetGameLobby(profile.ActiveLobby.Id) is null)
            {
                await profileRepository.ClearActiveLobbyAsync(profileId);
            }

            return Ok(profile);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddWizard([FromBody] WizardModel model)
        {
            var profileId = Guid.Parse(HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var profile = await profileRepository.GetByIdAsync(profileId);

            if (profile.ActiveLobby is null)
                throw new Exception("Not found active lobby");

            var lobby = gameStorage.GetGameLobby(profile.ActiveLobby.Id)
                ?? throw new Exception("Not found lobby");

            if (lobby.IsGameStarted)
                throw new Exception("Lobby already started");

            if (lobby.IsWizardAlreadyAdded(profileId))
                throw new Exception("Wizard already added");

            lobby.AddWizard(profileId, model.MagicType, model.SideType, model.Name);

            return Ok();
        }
    }
}
