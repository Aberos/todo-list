﻿using System;
using System.Security.Cryptography;
using System.Text;

namespace TodoList.Domain.Helpers;

public static class UserHelper
{
    public static string EncryptPassword(string password)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        var builder = new StringBuilder();
        foreach (var t in bytes)
            builder.Append(t.ToString("x2"));

        return builder.ToString();
    }

    public static string GenerateRandomPassword()
    {
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var randomPassword = new string(Enumerable.Range(0, 6)
                                            .Select(_ => characters[new Random().Next(characters.Length)])
                                            .ToArray());

        return randomPassword;
    }
}
