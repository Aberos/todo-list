import { ValidationError } from "@/types/validation-error";

export function parseValidationErrorArray(data: any): ValidationError[] {
    if (!Array.isArray(data)) {
        return null!;
    }

    if (data.every(item => typeof item === 'object' && typeof item.errorMessage === 'string' &&
        (item.propertyName === undefined || typeof item.propertyName === 'string'))) {
        return data;
    }

    return null!;
}