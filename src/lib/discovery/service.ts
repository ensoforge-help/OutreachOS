import type { BusinessDiscoveryProvider } from "./providers/types"
import type { Geocoder } from "./location/types"
import type { Campaign } from "@/types/campaign"
import type { DiscoveryResult } from "@/types/discovery"
import { DiscoveryRepository } from "./repository"

export class DiscoveryService {
  constructor(
    private provider: BusinessDiscoveryProvider,
    private geocoder: Geocoder,
    private repository: DiscoveryRepository
  ) { }

  async discover(campaign: Campaign): Promise<DiscoveryResult> {
    const startedAt = new Date().toISOString()
    let errorCount = 0
    let errorMessage = undefined
    let businesses: string | any[] = []
    let saveResult = { newCount: 0, duplicateCount: 0 }

    try {
      // 1. Geocode location
      const coords = await this.geocoder.geocode(campaign.location)

      // 2. Search businesses
      businesses = await this.provider.searchBusinesses(campaign, {
        latitude: coords.latitude,
        longitude: coords.longitude,
        radius: campaign.radius
      })

      // 3. Save businesses
      if (businesses.length > 0) {
        saveResult = await this.repository.saveBusinesses(campaign.id, businesses, this.provider.name)
      }

    } catch (error) {
      console.error("Discovery error:", error)
      errorCount = 1
      errorMessage = error instanceof Error ? error.message : "Unknown error during discovery"
    } finally {
      // 4. Log the run
      await this.repository.logDiscoveryRun({
        campaignId: campaign.id,
        provider: this.provider.name,
        status: errorCount > 0 ? 'failed' : 'completed',
        startedAt,
        completedAt: new Date().toISOString(),
        foundCount: businesses.length,
        newCount: saveResult.newCount,
        duplicateCount: saveResult.duplicateCount,
        errorCount,
        errorMessage
      })
    }

    return {
      count: businesses.length,
      businesses,
      newCount: saveResult.newCount,
      duplicateCount: saveResult.duplicateCount,
      errorCount,
      errorMessage
    }
  }
}
