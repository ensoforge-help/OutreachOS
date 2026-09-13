import type { Campaign } from "@/types/campaign"
import type { Business } from "@/types/business"

export interface BusinessDiscoveryProvider {
  name: string
  searchBusinesses(campaign: Campaign, locationCoords: { latitude: number, longitude: number, radius?: number }): Promise<Business[]>
}
