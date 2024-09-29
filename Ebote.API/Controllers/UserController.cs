using Ebote.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Ebote.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(GameStorage gameStorage) : ControllerBase
    {
        public ActionResult<Guid> CreateLobby()
        {
            return gameStorage.CreateLobby(Guid.NewGuid());
        }
    }
}
