# RQWeather
[![RQWeather GitHub CI](https://github.com/cyrusbuilt/rqweather/actions/workflows/ci.yml/badge.svg)](https://github.com/cyrusbuilt/rqweather/actions/workflows/ci.yml)

RQWeather is a [NestJS-based](https://nestjs.com/) wrapper API around the [OpenWeatherMap API](https://openweathermap.org/api) intended for use with [RedQueen](https://github.com/cyrusbuilt/RedQueen) (though can certainly be used indedpendently) that also provides icon caching and compatibility with legacy (often more esoteric) clients that need good HEAD responses before the GETs (I personally use it to support apps I still develop to run on MacOS 9).

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

## Code linting

```bash
$ npm run lint
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