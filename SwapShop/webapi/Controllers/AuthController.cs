using Microsoft.AspNetCore.Mvc;
using webapi.Contracts;
using webapi.Data;
using webapi.Services.Authentication;

namespace webapi.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly  DataContext _dbContext;

        public AuthController(IAuthService authenticationService, DataContext dataContext)
        {
            _authService = authenticationService;
            _dbContext = dataContext;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<RegistrationResponse>> Register([FromBody] RegistrationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.RegisterAsync(request.Email, request.Username, request.Password, "User");

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }
            
           

            return CreatedAtAction(nameof(Register), new RegistrationResponse(result.Email, result.UserName));
        }

        private void AddErrors(AuthResult result)
        {
            foreach (var error in result.ErrorMessages)
            {
                ModelState.AddModelError(error.Key, error.Value);
            }
        }
        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.LoginAsync(request.Email, request.Password);

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            return Ok(new AuthResponse(result.IdentityUserId ,result.Email, result.UserName, result.Token));
        }
    }
}

