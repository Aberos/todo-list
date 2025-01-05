namespace TodoList.Application.Common.EmailTemplates;

public static class RecoveryPasswordTemplate
{
    public static string GetTemplate(string password)
    {
        return @$"<!DOCTYPE html>
            <html lang=""pt-br"">
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Recuperação de Senha</title>
            </head>
            <body style=""font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;"">
                <div style=""max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"">
                    <h2 style=""color: #007bff; text-align: center;"">Recuperação de Senha</h2>
                    <p>Olá,</p>
                    <p>Recebemos uma solicitação para a recuperação da sua senha.</p>
                    <p>Aqui está a sua nova senha temporária:</p>
                    <h3 style=""text-align: center; background-color: #f1f1f1; padding: 10px; border-radius: 4px; font-size: 24px; color: #333;"">{password}</h3>
                    <p>Recomendamos que você altere esta senha assim que possível em sua conta.</p>
                    <p>Se você não solicitou a recuperação de senha, por favor entre em contato com nossa equipe.</p>
                    <p>Atenciosamente,</p>
                    <p><strong>Equipe Todo List</strong></p>
                    <hr style=""border: 0; border-top: 1px solid #ddd; margin: 20px 0;"">
                    <p style=""font-size: 12px; text-align: center; color: #aaa;"">&copy; 2025 Todo List. Todos os direitos reservados.</p>
                </div>
            </body>
            </html>";
    }
}
