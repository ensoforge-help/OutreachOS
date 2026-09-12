import { z } from 'zod'

export const bulkBusinessActionSchema = z.object({
  action: z.enum(['add_to_campaign', 'delete', 'export']),
  businessIds: z.array(z.string().uuid()).min(1, 'At least one business must be selected'),
  campaignId: z.string().uuid().optional()
}).refine(data => {
  if (data.action === 'add_to_campaign' && !data.campaignId) {
    return false
  }
  return true
}, {
  message: "campaignId is required when action is 'add_to_campaign'",
  path: ['campaignId']
})

export type BulkBusinessActionInput = z.infer<typeof bulkBusinessActionSchema>
