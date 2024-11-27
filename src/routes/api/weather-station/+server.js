import { queryInfluxDB } from '../../../lib/js/query'
import { TOKEN, ORG, BUCKET, URL } from '$env/static/private';

const token = TOKEN
const org = ORG
const bucket = BUCKET
const url = URL

const query = `
      from(bucket: "${bucket}")
        |> range(start: -1m)
        |> filter(fn: (r) => r._measurement == "weather_station")
        |> filter(fn: (r) => r._field == "Air Temperature" or r._field == "External Temperature" or r._field == "Global Irradiance" or r._field == "Wind Direction" or r._field == "Wind Speed" or r._field == "Relative Humidity")
        |> last()
    `;

export const GET = async () => {
  try {
    const result = await queryInfluxDB(token, org, url, query)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Caught error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}