import { ValidationError } from "@/@types/validation-error";

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

export function formatDate(value: any): string {
    const valueSplit = value?.split('+') ?? [];
    const date = new Date(valueSplit[0])
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};