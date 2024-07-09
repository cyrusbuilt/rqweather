#!/bin/sh

echo "Generating .env file ..."

file=".env"
if [ -f ${file} ]; then
    echo "Making backup of ${file} ..."
    cp -f "${file}" "${file}.bak"
fi

echo "PORT=3001" > ${file}
echo "WEATHER_API_KEY=your_openweather_map_api_key_goes_here" > ${file}
echo "ICON_BASE_URL=https://openweathermap.org/img/wn/" >> ${file}
echo "API_BASE_URL=http://api.openweathermap.org/" >> ${file}
echo "APP_BASE_URL=http://localhost:3001" >> ${file}
echo "# Change the above line to match your host (and port if necessary). The default is the local dev server." >> ${file}
echo
echo "Done."
