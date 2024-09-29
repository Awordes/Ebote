FROM node:20-alpine AS presentatiion-build-env
WORKDIR /App
COPY . .
WORKDIR /App/Ebote.Presentation
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build-env
WORKDIR /App
COPY --from=presentatiion-build-env /App .
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "Ebote.API.dll"]