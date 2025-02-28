﻿namespace TodoList.Domain.Entities;
using TaskStatus = Enums.TaskStatus;

public class Task : EntityBase
{
    public required string Title { get; set; }

    public string? Description { get; set; }

    public TaskStatus Status { get; set; }

    public string? UserId { get; set; }

    public User? User { get; set; }
}
