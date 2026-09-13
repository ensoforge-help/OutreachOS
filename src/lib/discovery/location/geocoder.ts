import type { Geocoder } from "./types"
import { NominatimGeocoder } from "./providers/nominatim"

export function getGeocoder(): Geocoder {
  // In the future, this can be switched to Google Maps Geocoder, Mapbox, etc. based on env vars
  return new NominatimGeocoder()
}
