using FluentValidation;
using TodoList.Domain.Dtos;

namespace TodoList.Application.Extensions;

public static class ValidationExceptionExtensions
{
    public static List<ValidationError> GetValidationErrors(this ValidationException exception)
    {
        var errors = new List<ValidationError>();

        if(!string.IsNullOrEmpty(exception.Message))
            errors.Add(new ValidationError { PropertyName = string.Empty, ErrorMessage = exception.Message });

        if (exception?.Errors is null)
            return errors;

        foreach (var error in exception.Errors)
        {
            errors.Add(new ValidationError
            {
                PropertyName = error.PropertyName,
                ErrorMessage = error.ErrorMessage
            });
        }

        return errors;
    }
}
