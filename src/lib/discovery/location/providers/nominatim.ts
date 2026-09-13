import type { Geocoder } from "../types"

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
const MAX_RETRIES = 3
const INITIAL_BACKOFF = 1500 // 1.5 seconds

// Simple in-memory cache for development (in production, use Redis or similar)
const geocodeCache = new Map<string, { latitude: number, longitude: number }>()

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class NominatimGeocoder implements Geocoder {
  async geocode(location: string, retries = 0): Promise<{ latitude: number, longitude: number }> {
    const cacheKey = location.toLowerCase().trim()
    if (geocodeCache.has(cacheKey)) {
      return geocodeCache.get(cacheKey)!
    }

    try {
      const url = new URL(NOMINATIM_URL)
      url.searchParams.append("q", location)
      url.searchParams.append("format", "json")
      url.searchParams.append("limit", "1")

      const response = await fetch(url.toString(), {
        headers: {
          // Nominatim requires a valid User-Agent
          "User-Agent": "OutreachOS/1.0 (contact@outreachos.com)",
        }
      })

      if (response.status === 429) {
          if (retries >= MAX_RETRIES) {
              throw new Error("Nominatim API rate limit exceeded.")
          }
          const backoff = INITIAL_BACKOFF * Math.pow(2, retries)
          console.warn(`Nominatim API rate limited. Retrying in ${backoff}ms...`)
          await wait(backoff)
          return this.geocode(location, retries + 1)
      }

      if (!response.ok) {
        throw new Error(`Nominatim request failed: ${response.status}`)
      }

      const data = await response.json()

      if (!data || data.length === 0) {
        throw new Error(`Location not found: ${location}`)
      }

      const result = {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      }

      // Store in cache
      geocodeCache.set(cacheKey, result)

      return result
    } catch (error) {
      if (retries < MAX_RETRIES && !(error instanceof Error && error.message.startsWith('Location not found'))) {
          const backoff = INITIAL_BACKOFF * Math.pow(2, retries)
          console.warn(`Nominatim request failed. Retrying in ${backoff}ms...`, error)
          await wait(backoff)
          return this.geocode(location, retries + 1)
      }
      throw error
    }
  }
}
