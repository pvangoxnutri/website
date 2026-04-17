export type WaitlistEntry = {
  id: number
  email: string
  instagram: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  hasFullAccess: boolean
}

export type FeedbackEntry = {
  id: number
  name: string
  message: string
  email?: string
  timestamp: string
  isRead: boolean
}

export const TOTAL_SPOTS = 100

export const waitlistEntries: WaitlistEntry[] = [
  { id: 1,  email: 'marcus.v@design.co',       instagram: 'marcus.designs',  date: 'Oct 24, 2023', status: 'approved', hasFullAccess: true  },
  { id: 2,  email: 'elena.s@travel.io',         instagram: 'elena.travel',    date: 'Oct 25, 2023', status: 'pending',  hasFullAccess: false },
  { id: 3,  email: 'james.miller@outlook.com',  instagram: 'jamesmiller',     date: 'Oct 26, 2023', status: 'pending',  hasFullAccess: false },
  { id: 4,  email: 'sarah.j@creative.co',       instagram: 'sarahjcreative',  date: 'Oct 27, 2023', status: 'approved', hasFullAccess: true  },
  { id: 5,  email: 'tom.w@studio.io',           instagram: 'tomwstudio',      date: 'Oct 28, 2023', status: 'rejected', hasFullAccess: false },
  { id: 6,  email: 'anna.r@photo.se',           instagram: 'annarphoto',      date: 'Oct 29, 2023', status: 'pending',  hasFullAccess: false },
  { id: 7,  email: 'david.k@nomad.com',         instagram: 'davidnomad',      date: 'Oct 30, 2023', status: 'approved', hasFullAccess: true  },
  { id: 8,  email: 'lisa.m@wander.net',         instagram: 'lisamwander',     date: 'Nov 1, 2023',  status: 'pending',  hasFullAccess: false },
  { id: 9,  email: 'carlos.v@trip.mx',          instagram: 'carlostrip',      date: 'Nov 2, 2023',  status: 'pending',  hasFullAccess: false },
  { id: 10, email: 'emma.b@explore.co',         instagram: 'emmaexplores',    date: 'Nov 3, 2023',  status: 'rejected', hasFullAccess: false },
  { id: 11, email: 'felix.h@travel.de',         instagram: 'felixhtravel',    date: 'Nov 4, 2023',  status: 'approved', hasFullAccess: true  },
  { id: 12, email: 'mia.o@journey.no',          instagram: 'miaojourney',     date: 'Nov 5, 2023',  status: 'pending',  hasFullAccess: false },
]

export const feedbackEntries: FeedbackEntry[] = [
  {
    id: 1,
    name: 'Sarah J.',
    message: 'Loving the new curator tools! Would be great to have more map customization options in the next update.',
    email: 'sarah.j@creative.co',
    timestamp: '2h ago',
    isRead: false,
  },
  {
    id: 2,
    name: 'Tom Walker',
    message: 'Is there a mobile app in the works? The dashboard works great but on mobile it feels a bit tight.',
    timestamp: '5h ago',
    isRead: false,
  },
  {
    id: 3,
    name: 'Kevin Lee',
    message: "Found a small bug in the analytics export. Some dates aren't formatting correctly when exported to CSV.",
    timestamp: 'Yesterday',
    isRead: true,
  },
  {
    id: 4,
    name: 'Anna R.',
    message: 'The waitlist feature is super clean. Would love to see an option to add collaborators to a trip.',
    email: 'anna.r@photo.se',
    timestamp: '2 days ago',
    isRead: false,
  },
  {
    id: 5,
    name: 'Marcus V.',
    message: 'Really solid product. The UX feels very intentional. Keep it up.',
    email: 'marcus.v@design.co',
    timestamp: '3 days ago',
    isRead: true,
  },
]
