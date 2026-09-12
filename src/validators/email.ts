import { z } from 'zod'

export const updateEmailSchema = z.object({
  status: z.enum(['draft', 'approved', 'rejected', 'sent']),
  subject: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  campaign_id: z.string().uuid().optional(),
  business_id: z.string().uuid().optional()
})

export type UpdateEmailInput = z.infer<typeof updateEmailSchema>
