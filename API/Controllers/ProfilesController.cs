using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }
        [HttpPut]
        public async Task<IActionResult> Edit(Profile profile)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Profile = profile }));
        }
    }
}