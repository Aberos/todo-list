namespace TodoList.Application.Common.Constants;

public static class UserConstantExceptions
{
    public static string EmailRequired => "E-mail é obrigatório.";
    public static string EmailFormat => "E-mail inválido.";
    public static string EmailAlreadyRegistered => "E-mail já cadastrado.";
    public static string NameRequired => "Nome é obrigatório.";
    public static string PasswordRequired => "Senha é obrigatória.";
    public static string PasswordMinimumLength => "Senha deve ser maior ou igual a {MinLength} caracter(es).";
    public static string NewPasswordRequired => "Nova senha é obrigatória.";
    public static string NewPasswordMinimumLength => "Nova senha deve ser maior ou igual a {MinLength} caracter(es).";
    public static string EmailPasswordInvalid => "Email e senha inválidos.";
    public static string UserInvalid => "Usuário inválido.";
    public static string PasswordInvalid => "Senha inválido.";
}
