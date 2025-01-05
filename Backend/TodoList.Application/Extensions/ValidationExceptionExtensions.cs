using FluentValidation;
using TodoList.Domain.Dtos;

namespace TodoList.Application.Extensions;

public static class ValidationExceptionExtensions
{
    public static List<ValidationError> GetValidationErrors(this ValidationException exception)
    {
        var errors = new List<ValidationError>();

        if (exception?.Errors?.Any() ?? false)
        {
            foreach (var error in exception.Errors)
            {
                errors.Add(new ValidationError
                {
                    PropertyName = error.PropertyName,
                    ErrorMessage = error.ErrorMessage
                });
            }
        }
        else
        {
            if (!string.IsNullOrEmpty(exception?.Message))
                errors.Add(new ValidationError { PropertyName = string.Empty, ErrorMessage = exception.Message });
        }

        return errors;
    }
}
