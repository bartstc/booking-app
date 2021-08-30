FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /src
COPY ["community-service/src/Community.Api/Community.Api.csproj", "community-service/src/Community.Api/"]
RUN dotnet restore "community-service/src/Community.Api/Community.Api.csproj"
COPY . .
WORKDIR "/src/community-service/src/Community.Api"
RUN dotnet build "Community.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Community.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Community.Api.dll"]
