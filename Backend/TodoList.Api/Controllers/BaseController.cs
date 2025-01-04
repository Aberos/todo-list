using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.Api.Controllers;

public class BaseController : ControllerBase
{
    public IMediator Mediator { get; private set; }

    public BaseController(IMediator mediator)
    {
        Mediator = mediator;
    }
}
