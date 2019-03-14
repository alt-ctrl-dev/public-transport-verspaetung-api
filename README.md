# API for the Public Transport of Verspaetung

## Problem

In the fictional city of Verspaetung, public transport is notoriously unreliable. To tackle the problem, the city council has decided to make the public transport timetable and delay information public, opening up opportunities for innovative use cases.
You are given the task of writing a web API to expose the Verspaetung public transport information.
As a side note, the city of Verspaetung has been built on a strict grid - all location information can be assumed to be from a cartesian coordinate system.

## Assumptions

- Timezones are not considered
- X & Y of the stops information are based on a planar system (in this city, the earth is flat)
- Time will always be in the format HH:MM:SS
- Delays are considered as minutes
- Stop IDs are unique to X and Y

## How to run the program

1. `git clone git@github.com:reubenkcoutinho/public-transport-verspaetung-api.git`
2. `npm install` OR `yarn`
3. `npm start` OR `yarn start`

## How to test

1. `git clone git@github.com:reubenkcoutinho/public-transport-verspaetung-api.git`
2. `npm install` OR `yarn`
3. `npm test` OR `yarn test`
