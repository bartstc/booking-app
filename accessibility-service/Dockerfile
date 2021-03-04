FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /src
COPY ["accessibility-service/src/Accessibility.Api/Accessibility.Api.csproj", "accessibility-service/src/Accessibility.Api/"]
RUN dotnet restore "accessibility-service/src/Accessibility.Api/Accessibility.Api.csproj"
COPY . .
WORKDIR "/src/accessibility-service/src/Accessibility.Api"
RUN dotnet build "Accessibility.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Accessibility.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Accessibility.Api.dll"]
