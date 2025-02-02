# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# install NodeJS 13.x and yarn
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g yarn


# copy csproj and restore as distinct layers
COPY *.sln .
COPY IllusoryWall/*.csproj ./IllusoryWall/
COPY WebScraper/*.csproj ./WebScraper/
RUN dotnet restore

# copy everything else and build app
COPY IllusoryWall/. ./IllusoryWall/
COPY WebScraper/. ./WebScraper/
WORKDIR /source/IllusoryWall
RUN dotnet publish -c release -o /app --no-restore -v minimal

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "IllusoryWall.dll"]
