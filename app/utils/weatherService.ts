//weather
import axios from "axios";

const API_KEY = "d734f951c52155a9771143721b7eb908"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"; // Example API

export async function getWeather(lat: number, lon: number) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        lat,
        lon,
        units: "metric",
        appid: API_KEY,
      },
    });

    const forecasts = response.data.list;

    // Extract unique days and get forecast for 12:00 PM
    const dailyForecast: Record<string, any> = {};

    forecasts.forEach((entry: any) => {
      const date = entry.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD
      const time = entry.dt_txt.split(" ")[1]; // Extract time

      if (time === "12:00:00" && !dailyForecast[date]) {
        dailyForecast[date] = {
          date: entry.dt_txt, // Full date and time
          icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`,
          temp: Math.round(entry.main.temp),
          condition: entry.weather[0].description,
        };
      }
    });

    return Object.values(dailyForecast); // Convert object back to array
  } catch (error) {
    console.error("Error fetching weather:", error);
    return [];
  }
}
