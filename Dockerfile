FROM node:20.17-alpine AS presentation-build-env
WORKDIR /App
COPY . .
WORKDIR /App/Ebote.Presentation
RUN npm install
RUN npm run build
RUN rm -rf node_modules

FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS app-build-env
WORKDIR /App
COPY --from=presentation-build-env /App .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine
WORKDIR /App
COPY --from=app-build-env /App/out .
ENTRYPOINT ["dotnet", "Ebote.API.dll"]
