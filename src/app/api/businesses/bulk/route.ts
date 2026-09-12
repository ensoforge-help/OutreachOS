import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { bulkBusinessActionSchema } from '@/validators/business'

export async function PUT(request: Request) {
  try {
    const json = await request.json()
    const result = bulkBusinessActionSchema.safeParse(json)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      )
    }

    const { action, businessIds, campaignId } = result.data

    const supabase = await createClient()

    if (action === 'add_to_campaign') {
      if (!campaignId) {
        return NextResponse.json({ error: 'campaignId is required' }, { status: 400 })
      }

      // Update the campaign_id for the given businesses
      const { data, error } = await supabase
        .from('businesses')
        .update({ campaign_id: campaignId })
        .in('id', businessIds)
        .select()

      if (error) throw error
      
      return NextResponse.json({ success: true, updated: data.length })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
