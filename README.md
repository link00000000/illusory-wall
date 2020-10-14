# Illusory Wall 🧱👻🚪

A project for Database Management 🔐 @ The University of Akron 🎓

## Development 🏗

### Requirements

-   .NET Core 3.1
-   ASP\.NET Core 3.1
-   NodeJS 14.x
-   Yarn
-   Docker and docker-compose

### Usage

```bash
# Start MySQL Database
docker-compose up -d db phpmyadmin

# Start application in development watch mode with live-reload
cd IllusoryWall && dotnet watch -p IllusoryWall run
```

### Locations

-   Database: port 3306
-   PHPMyAdmin Interface: http://localhost:8080
-   Application: http://localhost:5000 or https://localhost:5001

## Production ✨

### Requirements

-   Docker

### Usage

```bash
# Build application for production and start all containers
docker-compose up -d -f docker-compose.yml db illusorywall
```

### Locations

-   Application: http://localhost

## Structure 🏛

-   `/db`: Build files for MySQL docker image
-   `/.mysql_data`: Data volume used by MySQL docker image
-   `/IllusoryWall`: Project solution
-   `/IllusoryWall/IllusoryWall`: IllusoryWall server application
-   `/IllusoryWall/IllusoryWall/ClientApp`: Web Client
-   `/IllusoryWall/WebScraper`: Web scraper shared library
-   `/Client`: Symbolic link to `/IllusoryWall/IllusoryWall/ClientApp`
