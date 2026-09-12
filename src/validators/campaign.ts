import { z } from 'zod'

export const createCampaignSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  radius: z.number().min(1, 'Radius must be at least 1').max(1000, 'Radius must be less than 1000'),
  min_rating: z.number().min(1).max(5).optional().default(3.5),
  website_requirement: z.enum(['any', 'required', 'missing-only']).optional().default('any'),
  email_requirement: z.enum(['any', 'verified-only']).optional().default('verified-only'),
  lead_limit: z.number().min(1).max(10000).optional().default(100),
  status: z.enum(['draft', 'running', 'paused', 'completed']).optional().default('running')
})

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>
