import type { EmailDraft, ScheduledEmail } from '@/types/email'

export const emailDrafts: EmailDraft[] = [
  {
    id: 'eml-001',
    businessId: 'biz-001',
    businessName: 'Spice Garden Restaurant',
    contactId: 'cnt-001',
    contactName: 'Rajesh Kumar',
    contactEmail: 'rajesh@spicegarden.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'A quick idea for Spice Garden Restaurant',
    body: `Hi Rajesh,

I came across Spice Garden Restaurant while researching popular dining spots in Bandra. Your 4.3-star rating and 287 reviews clearly show that customers love the experience you offer.

I noticed that your website doesn't currently have an online ordering system. With the growing trend of food delivery and takeaway orders, adding this feature could help capture more revenue from customers who prefer ordering from home.

We specialize in helping restaurants like yours set up seamless online ordering experiences that integrate with your existing operations.

Would you be open to a quick 15-minute call this week to explore how this could work for Spice Garden?

Best regards`,
    score: 92,
    opportunity: 'No online ordering system detected on website.',
    status: 'pending',
    createdAt: '2024-09-10T10:39:00Z',
  },
  {
    id: 'eml-002',
    businessId: 'biz-003',
    businessName: 'HealthFirst Clinic',
    contactId: 'cnt-003',
    contactName: 'Dr. Anita Desai',
    contactEmail: 'anita@healthfirst.example.com',
    campaignId: 'cmp-002',
    campaignName: 'Mumbai Clinics',
    subject: 'Helping HealthFirst Clinic reach more patients online',
    body: `Dear Dr. Desai,

I recently visited the HealthFirst Clinic website and noticed some opportunities to improve your online presence. Your clinic has an excellent reputation with a 4.1-star rating, but there are a few digital improvements that could help you attract more patients.

Specifically, I noticed that your website lacks a contact page, making it harder for potential patients to reach you. Additionally, an online booking system could significantly reduce no-shows and streamline your appointments.

We help healthcare providers modernize their digital presence with patient-friendly booking systems and optimized websites.

Would a brief conversation next week work for you?

Warm regards`,
    score: 88,
    opportunity: 'Missing contact page and no online booking system.',
    status: 'pending',
    createdAt: '2024-09-10T10:40:00Z',
  },
  {
    id: 'eml-003',
    businessId: 'biz-004',
    businessName: 'FitZone Gym',
    contactId: 'cnt-004',
    contactName: 'Vikram Patel',
    contactEmail: 'vikram@fitzone.example.com',
    campaignId: 'cmp-003',
    campaignName: 'Mumbai Fitness Businesses',
    subject: 'Getting FitZone Gym online',
    body: `Hi Vikram,

I noticed that FitZone Gym doesn't currently have a website. In today's digital world, having an online presence is essential for attracting new members and retaining existing ones.

With a 3.9-star rating from 76 reviews, your gym clearly has a loyal following. A professional website could help you showcase your facilities, class schedules, membership plans, and member testimonials.

We help fitness businesses like yours get online quickly with modern, mobile-first websites that convert visitors into members.

Would you be interested in learning more?

Best regards`,
    score: 95,
    opportunity: 'No website detected. High-potential business without online presence.',
    status: 'pending',
    createdAt: '2024-09-10T10:41:00Z',
  },
  {
    id: 'eml-004',
    businessId: 'biz-005',
    businessName: 'Glamour Studio Salon',
    contactId: 'cnt-005',
    contactName: 'Neha Gupta',
    contactEmail: 'neha@glamourstudio.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'Online booking could transform Glamour Studio',
    body: `Hi Neha,

Glamour Studio has a fantastic 4.5-star rating — clearly your clients love what you do! I noticed your website is built on Squarespace, which is a great foundation.

However, I saw that you don't currently offer online booking. For salons, online booking can reduce phone calls by up to 60% and fill empty slots through automated reminders.

We could help you add a seamless booking system to your existing website without any major redesign.

Quick call this week?

Best regards`,
    score: 84,
    opportunity: 'No online booking on salon website.',
    status: 'approved',
    scheduledAt: '2024-09-18T10:30:00Z',
    createdAt: '2024-09-09T14:00:00Z',
  },
  {
    id: 'eml-005',
    businessId: 'biz-007',
    businessName: 'AutoCare Service Center',
    contactId: 'cnt-007',
    contactName: 'Suresh Mehta',
    contactEmail: 'suresh@autocare.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'Building an online presence for AutoCare',
    body: `Hi Suresh,

I came across AutoCare Service Center and saw you have a strong 4.0 rating with loyal customers. However, I noticed you don't have a website yet.

A professional website could help you showcase services, let customers book appointments online, and appear in local search results when people look for auto services in Goregaon.

We specialize in creating effective websites for service businesses.

Let me know if you'd like to explore this further.

Best regards`,
    score: 91,
    opportunity: 'No website detected for established business.',
    status: 'approved',
    scheduledAt: '2024-09-18T11:00:00Z',
    createdAt: '2024-09-09T14:10:00Z',
  },
  {
    id: 'eml-006',
    businessId: 'biz-008',
    businessName: 'Urban Bites Café',
    contactId: 'cnt-008',
    contactName: 'Aisha Khan',
    contactEmail: 'aisha@urbanbites.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'A digital upgrade for Urban Bites Café',
    body: `Hi Aisha,

Urban Bites Café looks like a fantastic spot on Carter Road! Your 4.4-star rating and 456 reviews speak volumes about the experience you provide.

I noticed your WordPress site could benefit from some improvements — specifically, there's no online ordering functionality, which is increasingly expected by customers.

We could help you add online ordering directly to your existing website.

Would you have 15 minutes this week for a quick chat?

Best regards`,
    score: 86,
    opportunity: 'WordPress site without online ordering.',
    status: 'sent',
    scheduledAt: '2024-09-12T10:30:00Z',
    sentAt: '2024-09-12T10:30:00Z',
    createdAt: '2024-09-08T11:00:00Z',
  },
  {
    id: 'eml-007',
    businessId: 'biz-010',
    businessName: 'PowerLift Fitness Studio',
    contactId: 'cnt-010',
    contactName: 'Arjun Nair',
    contactEmail: 'arjun@powerlift.example.com',
    campaignId: 'cmp-003',
    campaignName: 'Mumbai Fitness Businesses',
    subject: 'Modernizing PowerLift\'s online presence',
    body: `Hi Arjun,

Your 4.8-star rating at PowerLift Fitness Studio is impressive! Clearly, you've built something special in Lokhandwala.

I noticed your website is quite basic (HTML/CSS) and doesn't have a contact page or online booking. A modern website with class booking, membership management, and a mobile-friendly design could help you scale.

We've helped several fitness studios make this transition. Would you be open to a conversation?

Best regards`,
    score: 89,
    opportunity: 'Basic HTML website without booking or contact page.',
    status: 'pending',
    createdAt: '2024-09-10T10:42:00Z',
  },
  {
    id: 'eml-008',
    businessId: 'biz-011',
    businessName: 'Royal Residency Hotel',
    contactId: 'cnt-011',
    contactName: 'Meera Iyer',
    contactEmail: 'meera@royalresidency.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'Improving Royal Residency\'s digital experience',
    body: `Dear Meera,

Royal Residency Hotel on Marine Drive is a prime location. With 678 reviews, you clearly have significant foot traffic.

I noticed your website's mobile experience could use some improvement, which is critical since most travelers browse on their phones. A responsive redesign could significantly boost your direct bookings.

We help hotels improve their digital presence to compete with OTAs and increase direct bookings.

Would you have time for a brief discussion?

Warm regards`,
    score: 73,
    opportunity: 'Poor mobile experience on hotel website.',
    status: 'sent',
    sentAt: '2024-09-11T09:00:00Z',
    openedAt: '2024-09-11T11:30:00Z',
    createdAt: '2024-09-07T13:00:00Z',
  },
  {
    id: 'eml-009',
    businessId: 'biz-012',
    businessName: 'TechEd Learning Center',
    contactId: 'cnt-012',
    contactName: 'Karan Singh',
    contactEmail: 'karan@teched.example.com',
    campaignId: 'cmp-004',
    campaignName: 'Mumbai Educational Institutes',
    subject: 'Getting TechEd Learning Center online',
    body: `Hi Karan,

TechEd Learning Center has a great reputation with a 4.3-star rating from 112 reviews. However, I noticed you don't currently have a website.

For educational institutes, a website is essential for showcasing courses, faculty, student testimonials, and enabling online enrollment. Parents and students increasingly research online before choosing an institute.

We specialize in building educational websites with LMS integration.

Interested in discussing this further?

Best regards`,
    score: 94,
    opportunity: 'No website for educational institute. High-value prospect.',
    status: 'pending',
    createdAt: '2024-09-10T10:43:00Z',
  },
  {
    id: 'eml-010',
    businessId: 'biz-016',
    businessName: 'Curry House Kitchen',
    contactId: 'cnt-016',
    contactName: 'Manish Kulkarni',
    contactEmail: 'manish@curryhouse.example.com',
    campaignId: 'cmp-005',
    campaignName: 'Pune Restaurants',
    subject: 'Enhancing Curry House Kitchen\'s website',
    body: `Hi Manish,

Curry House Kitchen on FC Road is clearly a favourite — 4.2 stars and 203 reviews! I checked your Wix website and see some room for improvement.

Your site doesn't have a contact page, and the mobile experience could be better. These are small changes that could make a big difference in attracting walk-ins and delivery orders.

We help restaurants optimize their digital presence for maximum customer engagement.

Quick chat this week?

Best regards`,
    score: 83,
    opportunity: 'Wix website missing contact page with poor mobile experience.',
    status: 'sent',
    sentAt: '2024-09-06T10:00:00Z',
    openedAt: '2024-09-06T14:20:00Z',
    repliedAt: '2024-09-07T09:15:00Z',
    createdAt: '2024-09-04T11:00:00Z',
  },
  {
    id: 'eml-011',
    businessId: 'biz-014',
    businessName: 'Metro Real Estate',
    contactId: 'cnt-014',
    contactName: 'Deepak Chopra',
    contactEmail: 'deepak@metrorealestate.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'Improving Metro Real Estate\'s online presence',
    body: `Hi Deepak,

I reviewed Metro Real Estate's WordPress website and noticed the mobile experience could be significantly improved. In real estate, most property searches start on mobile devices.

A responsive redesign with better property listings, virtual tours, and lead capture forms could help you generate more qualified inquiries.

We've worked with several real estate firms on similar improvements. Would a brief call work for you?

Best regards`,
    score: 76,
    opportunity: 'Poor mobile experience on real estate website.',
    status: 'pending',
    createdAt: '2024-09-10T10:44:00Z',
  },
  {
    id: 'eml-012',
    businessId: 'biz-015',
    businessName: 'Fresh Basket Retail',
    contactId: 'cnt-015',
    contactName: 'Pooja Verma',
    contactEmail: 'pooja@freshbasket.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'Building Fresh Basket\'s online store',
    body: `Hi Pooja,

Fresh Basket is well-loved in the Khar area with a 4.0-star rating. I noticed you don't have a website yet.

An online store could help you take orders, manage inventory, and reach customers beyond your physical location. Many retail stores have seen significant revenue growth after going digital.

We help retail businesses launch e-commerce quickly and affordably.

Interested in exploring this?

Best regards`,
    score: 87,
    opportunity: 'No website for retail store. E-commerce opportunity.',
    status: 'rejected',
    createdAt: '2024-09-10T10:45:00Z',
  },
  {
    id: 'eml-013',
    businessId: 'biz-019',
    businessName: 'Krishna Yoga Studio',
    contactId: 'cnt-019',
    contactName: 'Maya Deshpande',
    contactEmail: 'maya@krishnayoga.example.com',
    campaignId: 'cmp-003',
    campaignName: 'Mumbai Fitness Businesses',
    subject: 'Creating a digital home for Krishna Yoga Studio',
    body: `Hi Maya,

Krishna Yoga Studio has an incredible 4.7-star rating from 298 reviews — your students clearly love what you offer!

Without a website, you may be missing out on reaching new students who search for yoga classes online. A website with class schedules, instructor profiles, and online booking could expand your reach significantly.

We specialize in building beautiful websites for yoga and wellness studios.

Would you like to learn more?

Namaste`,
    score: 96,
    opportunity: 'No website for highly-rated yoga studio.',
    status: 'pending',
    createdAt: '2024-09-10T10:46:00Z',
  },
  {
    id: 'eml-014',
    businessId: 'biz-020',
    businessName: 'Grandeur Banquets',
    contactId: 'cnt-020',
    contactName: 'Sanjay Malhotra',
    contactEmail: 'sanjay@grandeur.example.com',
    campaignId: 'cmp-001',
    campaignName: 'Mumbai Restaurants',
    subject: 'Enhancing Grandeur Banquets\' online experience',
    body: `Hi Sanjay,

Grandeur Banquets on Powai Lake Road is a great venue. I checked your website and noticed the mobile experience and online booking could use improvement.

For a banquet hall, having a modern website with virtual tours, event package listings, and online inquiry forms is crucial for capturing corporate and wedding inquiries.

We help hospitality businesses modernize their digital presence. Shall we discuss?

Best regards`,
    score: 81,
    opportunity: 'Poor mobile experience, no online booking for banquet hall.',
    status: 'pending',
    createdAt: '2024-09-10T10:47:00Z',
  },
]

// Scheduled emails derived from approved/scheduled drafts
export const scheduledEmails: ScheduledEmail[] = [
  {
    id: 'sch-001',
    emailDraftId: 'eml-004',
    businessName: 'Glamour Studio Salon',
    campaignName: 'Mumbai Restaurants',
    contactEmail: 'neha@glamourstudio.example.com',
    subject: 'Online booking could transform Glamour Studio',
    scheduledDate: '2024-09-18',
    scheduledTime: '10:30 AM',
    status: 'scheduled',
  },
  {
    id: 'sch-002',
    emailDraftId: 'eml-005',
    businessName: 'AutoCare Service Center',
    campaignName: 'Mumbai Restaurants',
    contactEmail: 'suresh@autocare.example.com',
    subject: 'Building an online presence for AutoCare',
    scheduledDate: '2024-09-18',
    scheduledTime: '11:00 AM',
    status: 'scheduled',
  },
  {
    id: 'sch-003',
    emailDraftId: 'eml-001',
    businessName: 'Spice Garden Restaurant',
    campaignName: 'Mumbai Restaurants',
    contactEmail: 'rajesh@spicegarden.example.com',
    subject: 'A quick idea for Spice Garden Restaurant',
    scheduledDate: '2024-09-19',
    scheduledTime: '09:30 AM',
    status: 'scheduled',
  },
  {
    id: 'sch-004',
    emailDraftId: 'eml-003',
    businessName: 'FitZone Gym',
    campaignName: 'Mumbai Fitness Businesses',
    contactEmail: 'vikram@fitzone.example.com',
    subject: 'Getting FitZone Gym online',
    scheduledDate: '2024-09-19',
    scheduledTime: '10:00 AM',
    status: 'scheduled',
  },
  {
    id: 'sch-005',
    emailDraftId: 'eml-002',
    businessName: 'HealthFirst Clinic',
    campaignName: 'Mumbai Clinics',
    contactEmail: 'anita@healthfirst.example.com',
    subject: 'Helping HealthFirst Clinic reach more patients online',
    scheduledDate: '2024-09-19',
    scheduledTime: '11:30 AM',
    status: 'scheduled',
  },
  {
    id: 'sch-006',
    emailDraftId: 'eml-007',
    businessName: 'PowerLift Fitness Studio',
    campaignName: 'Mumbai Fitness Businesses',
    contactEmail: 'arjun@powerlift.example.com',
    subject: "Modernizing PowerLift's online presence",
    scheduledDate: '2024-09-20',
    scheduledTime: '10:30 AM',
    status: 'scheduled',
  },
  {
    id: 'sch-007',
    emailDraftId: 'eml-009',
    businessName: 'TechEd Learning Center',
    campaignName: 'Mumbai Educational Institutes',
    contactEmail: 'karan@teched.example.com',
    subject: 'Getting TechEd Learning Center online',
    scheduledDate: '2024-09-20',
    scheduledTime: '02:00 PM',
    status: 'scheduled',
  },
  {
    id: 'sch-008',
    emailDraftId: 'eml-013',
    businessName: 'Krishna Yoga Studio',
    campaignName: 'Mumbai Fitness Businesses',
    contactEmail: 'maya@krishnayoga.example.com',
    subject: 'Creating a digital home for Krishna Yoga Studio',
    scheduledDate: '2024-09-21',
    scheduledTime: '09:00 AM',
    status: 'scheduled',
  },
]
