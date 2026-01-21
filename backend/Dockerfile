# Multi-stage build для оптимизации размера образа

# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Копируем файлы проектов для восстановления зависимостей
COPY ["RenessansAPI/RenessansAPI.csproj", "RenessansAPI/"]
COPY ["RenessansAPI.Service/RenessansAPI.Service.csproj", "RenessansAPI.Service/"]
COPY ["RenessansAPI.DataAccess/RenessansAPI.DataAccess.csproj", "RenessansAPI.DataAccess/"]
COPY ["RenessansAPI.Domain/RenessansAPI.Domain.csproj", "RenessansAPI.Domain/"]

# Очистка NuGet конфигурации для чистой сборки
RUN dotnet nuget locals all --clear

# Восстанавливаем зависимости
RUN dotnet restore "RenessansAPI/RenessansAPI.csproj" --disable-parallel

# Копируем весь исходный код
COPY . .

# Собираем проект
WORKDIR "/src/RenessansAPI"
RUN dotnet build "RenessansAPI.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "RenessansAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Устанавливаем переменные окружения
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

# Создаем директории для изображений
RUN mkdir -p wwwroot/images/camps \
    && mkdir -p wwwroot/images/events \
    && mkdir -p wwwroot/images/news \
    && mkdir -p wwwroot/images/overallImages \
    && mkdir -p wwwroot/images/possibility

# Копируем опубликованное приложение
COPY --from=publish /app/publish .

# Открываем порт
EXPOSE 80
EXPOSE 443

# Запускаем приложение
ENTRYPOINT ["dotnet", "RenessansAPI.dll"]
