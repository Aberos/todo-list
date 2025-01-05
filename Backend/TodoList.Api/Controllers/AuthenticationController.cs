using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common.Constants;
using TodoList.Application.Extensions;
using TodoList.Application.UseCases.Users.RecoverUserPassword;
using TodoList.Application.UseCases.Users.SignInUser;
using TodoList.Application.UseCases.Users.SignUpUser;
using TodoList.Application.UseCases.Users.UpdateActiveUser;
using TodoList.Application.UseCases.Users.UpdateActiveUserPassword;
using TodoList.Domain.Dtos;

namespace TodoList.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class AuthenticationController : BaseController
{
    public AuthenticationController(IMediator mediator) : base(mediator)
    {
    }

    [HttpPost("sign-in")]
    [AllowAnonymous]
    public async Task<ActionResult<SignInUserResponse>> SignIn([FromBody] SignInUserRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await Mediator.Send(request, cancellationToken);
            return Ok(result);
        }
        catch(ValidationException e)
        {
            return BadRequest(e.GetValidationErrors());
        }
        catch (Exception) 
        {
            return BadRequest(ConstantExceptions.DefaultError);
        }
    }

    [HttpPost("sign-up")]
    [AllowAnonymous]
    public async Task<ActionResult> SingUp([FromBody] SignUpUserRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await Mediator.Send(request, cancellationToken);
            return Ok();
        }
        catch (ValidationException e)
        {
            return BadRequest(e.GetValidationErrors());
        }
        catch (Exception)
        {
            return BadRequest(ConstantExceptions.DefaultError);
        }
    }

    [HttpPost("recovery-password")]
    [AllowAnonymous]
    public async Task<ActionResult> RecoveryPassword([FromBody] RecoverUserPasswordRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await Mediator.Send(request, cancellationToken);
            return Ok();
        }
        catch (ValidationException e)
        {
            return BadRequest(e.GetValidationErrors());
        }
        catch (Exception)
        {
            return BadRequest(ConstantExceptions.DefaultError);
        }
    }

    [HttpPut]
    [Authorize]
    public async Task<ActionResult> UpdateActiveUser([FromBody] UpdateActiveUserRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await Mediator.Send(request, cancellationToken);
            return Ok();
        }
        catch (ValidationException e)
        {
            return BadRequest(e.GetValidationErrors());
        }
        catch (Exception)
        {
            return BadRequest(ConstantExceptions.DefaultError);
        }
    }

    [HttpPatch("change-password")]
    [Authorize]
    public async Task<ActionResult> UpdateActiveUserPassword([FromBody] UpdateActiveUserPasswordRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await Mediator.Send(request, cancellationToken);
            return Ok();
        }
        catch (ValidationException e)
        {
            return BadRequest(e.GetValidationErrors());
        }
        catch (Exception)
        {
            return BadRequest(ConstantExceptions.DefaultError);
        }
    }

    [HttpGet("validate")]
    [Authorize]
    public ActionResult Validate()
    {
        return Ok();
    }
}
