namespace TodoList.Application.Common.Constants;

public static class TaskConstantExceptions
{
    public static string NotFound => $"Tarefa não encontrada.";
    public static string TitleRequired => "Titulo é obrigatório.";
    public static string IdRequired => "ID é obrigatório.";
}
