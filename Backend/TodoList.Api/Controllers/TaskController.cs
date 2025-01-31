using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoList.Application.Common.Constants;
using TodoList.Application.Extensions;
using TodoList.Application.UseCases.Tasks.CreateTask;
using TodoList.Application.UseCases.Tasks.DeleteTask;
using TodoList.Application.UseCases.Tasks.GetFilteredTaskList;
using TodoList.Application.UseCases.Tasks.GetTaskById;
using TodoList.Application.UseCases.Tasks.UpdateTask;
using TodoList.Domain.Dtos;

namespace TodoList.Api.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public class TaskController : BaseController
{
    public TaskController(IMediator mediator) : base(mediator)
    {
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateTaskRequest request, CancellationToken cancellationToken)
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

    [HttpPut("{taskId}")]
    public async Task<ActionResult> Update(string taskId, [FromBody] UpdateTaskRequest request, CancellationToken cancellationToken)
    {
        try
        {
            request.Id = taskId;
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

    [HttpDelete("{taskId}")]
    public async Task<ActionResult> Delete(string taskId, CancellationToken cancellationToken)
    {
        try
        {
            await Mediator.Send(new DeleteTaskRequest(taskId), cancellationToken);
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

    [HttpGet("{taskId}")]
    public async Task<ActionResult<Domain.Entities.Task>> GetById(string taskId, CancellationToken cancellationToken)
    {
        try
        {
            var task = await Mediator.Send(new GetTaskByIdRequest(taskId), cancellationToken);
            return Ok(task);
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

    [HttpGet]
    public async Task<ActionResult<FilterResponse<Domain.Entities.Task>>> GetFilterList([FromQuery] GetFilteredTaskListRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await Mediator.Send(request, cancellationToken);
            return Ok(result);
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
}
