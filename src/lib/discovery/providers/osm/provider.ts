import type { BusinessDiscoveryProvider } from "../types"
import type { Campaign } from "@/types/campaign"
import type { Business } from "@/types/business"
import { executeOverpassQuery } from "./client"
import { calculateBBox, buildCategoryQuery } from "./query-builder"
import { getOSMTagsForCategory } from "./category-map"
import { mapOSMPlace } from "./mapper"

export class OSMProvider implements BusinessDiscoveryProvider {
  name = "openstreetmap"

  async searchBusinesses(
    campaign: Campaign,
    locationCoords: { latitude: number, longitude: number, radius?: number }
  ): Promise<Business[]> {
    // 1. Resolve radius (default to 5km if not specified)
    const radius = locationCoords.radius || campaign.radius || 5

    // 2. Build BBox
    const bbox = calculateBBox(locationCoords.latitude, locationCoords.longitude, radius)

    // 3. Get OSM tags for category
    const categoryTags = getOSMTagsForCategory(campaign.category)
    console.log(categoryTags)

    // 4. Build Overpass query
    const query = buildCategoryQuery(categoryTags, bbox)
    console.log(query)

    // 5. Call Overpass
    const response = await executeOverpassQuery(query)

    // 6. Map response & filter out nodes without names (often meaningless data)
    if (!response.elements) return []

    return response.elements
      .map((place: any) => mapOSMPlace(place, campaign.category))
      .filter((business: Business) => business.name !== "Unnamed Business")
  }
}
