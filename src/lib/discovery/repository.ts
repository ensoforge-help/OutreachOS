import { createClient } from "@supabase/supabase-js"
import type { Business } from "@/types/business"
import type { Campaign } from "@/types/campaign"

// We should ideally use the existing supabase server client, but since we are in a utility
// context, we might need a direct admin client or context-aware client.
// Assuming we have a way to get the supabase client. For now, we will create a generic admin client
// or accept the client as a parameter. It's better to accept the client as a parameter or use a 
// standard lib utility. Let's assume standard supabase env vars are available.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
})

export class DiscoveryRepository {
    async saveBusinesses(campaignId: string, businesses: Business[], providerName: string) {
        let newCount = 0
        let duplicateCount = 0

        for (const business of businesses) {
            // 1. Check if business already exists
            const { data: existingBusiness, error: fetchError } = await supabase
                .from('businesses')
                .select('id')
                .eq('provider', business.provider)
                .eq('provider_id', business.providerId)
                .maybeSingle()
            
            if (fetchError) {
                console.error("Error fetching business", fetchError)
                continue
            }

            let businessId = existingBusiness?.id

            // 2. If it doesn't exist, insert it
            if (!businessId) {
                const { data: newBusiness, error: insertError } = await supabase
                    .from('businesses')
                    .insert({
                        name: business.name,
                        category: business.category,
                        address: business.address,
                        city: business.city,
                        latitude: business.latitude,
                        longitude: business.longitude,
                        phone: business.phone,
                        website: business.website,
                        has_website: business.hasWebsite,
                        provider: business.provider,
                        provider_id: business.providerId,
                        metadata: business.metadata
                    })
                    .select('id')
                    .single()
                
                if (insertError) {
                    console.error("Error inserting business", insertError)
                    continue
                }
                
                businessId = newBusiness.id
                newCount++
            } else {
                duplicateCount++
            }

            // 3. Link business to campaign
            const { error: linkError } = await supabase
                .from('campaign_businesses')
                .upsert({
                    campaign_id: campaignId,
                    business_id: businessId,
                    discovery_provider: providerName
                }, { onConflict: 'campaign_id, business_id' })
                
            if (linkError) {
                console.error("Error linking business to campaign", linkError)
            }
        }

        return { newCount, duplicateCount }
    }

    async logDiscoveryRun(runData: {
        campaignId: string,
        provider: string,
        status: string,
        startedAt: string,
        completedAt?: string,
        foundCount: number,
        newCount: number,
        duplicateCount: number,
        errorCount: number,
        errorMessage?: string
    }) {
        const { error } = await supabase
            .from('discovery_runs')
            .insert({
                campaign_id: runData.campaignId,
                provider: runData.provider,
                status: runData.status,
                started_at: runData.startedAt,
                completed_at: runData.completedAt,
                found_count: runData.foundCount,
                new_count: runData.newCount,
                duplicate_count: runData.duplicateCount,
                error_count: runData.errorCount,
                error_message: runData.errorMessage
            })
            
        if (error) {
            console.error("Error logging discovery run", error)
        }
    }
}
