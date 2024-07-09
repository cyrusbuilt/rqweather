# RQWeather

RQWeather is a wrapper API around the [OpenWeatherMap API](https://openweathermap.org/api) intended for use with [RedQueen](https://github.com/cyrusbuilt/RedQueen) (though can certainly be used indedpendently) but also provides icon caching and compatibility with legacy (often more esoteric) clients that need good HEAD responses before the GET responses.

## Installation

```bash
$ npm install
```

## Generating the .ENV file

```bash
$ npm run env:generate
```

## Running the app

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Watch mode with debug
$ npm run start:debug

# Production mode
$ npm run start:prod
```

## Containerizing the app

```bash
# Create docker image
$ npm run dockerize

# Create and run docker container
$ npm run docker:run

# Export the docker image to be imported on another machine
$ npm run docker:export
```