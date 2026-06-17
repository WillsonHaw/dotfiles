#!/usr/bin/env python3

import json
import sys
from datetime import datetime

try:
    import requests
except ImportError:
    print(json.dumps({"text": "?°", "tooltip": "requests not available"}))
    sys.exit(0)

WEATHER_CODES = {
    '113': '☀️',
    '116': '⛅',
    '119': '☁️',
    '122': '☁️',
    '143': '☁️',
    '176': '🌧️',
    '179': '🌧️',
    '182': '🌧️',
    '185': '🌧️',
    '200': '⛈️',
    '227': '🌨️',
    '230': '🌨️',
    '248': '☁️',
    '260': '☁️',
    '263': '🌧️',
    '266': '🌧️',
    '281': '🌧️',
    '284': '🌧️',
    '293': '🌧️',
    '296': '🌧️',
    '299': '🌧️',
    '302': '🌧️',
    '305': '🌧️',
    '308': '🌧️',
    '311': '🌧️',
    '314': '🌧️',
    '317': '🌧️',
    '320': '🌨️',
    '323': '🌨️',
    '326': '🌨️',
    '329': '❄️',
    '332': '❄️',
    '335': '❄️',
    '338': '❄️',
    '350': '🌧️',
    '353': '🌧️',
    '356': '🌧️',
    '359': '🌧️',
    '362': '🌧️',
    '365': '🌧️',
    '368': '🌧️',
    '371': '❄️',
    '374': '🌨️',
    '377': '🌨️',
    '386': '🌨️',
    '389': '🌨️',
    '392': '🌧️',
    '395': '❄️',
}


def format_time(time):
    return time.replace("00", "").zfill(2)


def format_temp(temp):
    return (temp + "°").ljust(3)


def format_chances(hour):
    chances = {
        "chanceoffog": "Fog",
        "chanceoffrost": "Frost",
        "chanceofovercast": "Overcast",
        "chanceofrain": "Rain",
        "chanceofsnow": "Snow",
        "chanceofsunshine": "Sunshine",
        "chanceofthunder": "Thunder",
        "chanceofwindy": "Wind",
    }
    conditions = []
    for event, label in chances.items():
        if int(hour.get(event, 0)) > 0:
            conditions.append(label + " " + hour[event] + "%")
    return ", ".join(conditions)


try:
    weather = requests.get("https://wttr.in/?format=j1", timeout=10).json()
    cur = weather['current_condition'][0]

    data = {}
    data['text'] = WEATHER_CODES.get(cur['weatherCode'], '?') + " " + cur['FeelsLikeC'] + "°"

    data['tooltip'] = f"<b>{cur['weatherDesc'][0]['value']} {cur['temp_C']}°C</b>\n"
    data['tooltip'] += f"Feels like: {cur['FeelsLikeC']}°C\n"
    data['tooltip'] += f"Wind: {cur['windspeedKmph']} km/h\n"
    data['tooltip'] += f"Humidity: {cur['humidity']}%\n"

    for i, day in enumerate(weather['weather']):
        data['tooltip'] += "\n<b>"
        if i == 0:
            data['tooltip'] += "Today, "
        elif i == 1:
            data['tooltip'] += "Tomorrow, "
        data['tooltip'] += f"{day['date']}</b>\n"
        data['tooltip'] += f"⬆️ {day['maxtempC']}° ⬇️ {day['mintempC']}°  "
        data['tooltip'] += f"🌅 {day['astronomy'][0]['sunrise']}  🌇 {day['astronomy'][0]['sunset']}\n"
        for hour in day['hourly']:
            if i == 0 and int(format_time(hour['time'])) < datetime.now().hour - 2:
                continue
            data['tooltip'] += (
                f"{format_time(hour['time'])} "
                f"{WEATHER_CODES.get(hour['weatherCode'], '?')} "
                f"{format_temp(hour['FeelsLikeC'])} "
                f"{hour['weatherDesc'][0]['value']}, "
                f"{format_chances(hour)}\n"
            )

    print(json.dumps(data))

except Exception as e:
    print(json.dumps({"text": "⚠️", "tooltip": str(e)}))
