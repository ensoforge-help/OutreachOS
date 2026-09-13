import { DiscoveryService } from "./service"
import { OSMProvider } from "./providers/osm/provider"
import { getGeocoder } from "./location/geocoder"
import { DiscoveryRepository } from "./repository"
import type { BusinessDiscoveryProvider } from "./providers/types"

export function getBusinessDiscoveryProvider(): BusinessDiscoveryProvider {
  const providerType = process.env.BUSINESS_DISCOVERY_PROVIDER || "openstreetmap"

  switch (providerType.toLowerCase()) {
    // case "google":
    //   return new GoogleProvider()
    // case "foursquare":
    //   return new FoursquareProvider()
    case "openstreetmap":
    default:
      return new OSMProvider()
  }
}

export function getDiscoveryService() {
  const provider = getBusinessDiscoveryProvider()
  const geocoder = getGeocoder()
  const repository = new DiscoveryRepository()
  
  return new DiscoveryService(provider, geocoder, repository)
}
