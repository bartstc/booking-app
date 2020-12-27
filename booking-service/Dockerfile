FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["booking-service/src/Booking.Api/Booking.Api.csproj", "booking-service/src/Booking.Api/"]
RUN dotnet restore "booking-service/src/Booking.Api/Booking.Api.csproj"
COPY . .
WORKDIR "/src/booking-service/src/Booking.Api"
RUN dotnet build "Booking.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Booking.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Booking.Api.dll"]
