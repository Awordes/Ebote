using Ebote.Core;
using Microsoft.AspNetCore.Mvc;

namespace Ebote.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ConstantsController: ControllerBase
{
    [HttpGet]
    public ActionResult<GameConstantsModel> GetGameConstants()
    {
        return Ok(GameConstants.Consts);
    }
}