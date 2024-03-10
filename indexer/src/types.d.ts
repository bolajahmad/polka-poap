interface ActivityRecord {
  id: string
  eventId: bigint
  blockCreated: number
  updatedBy?: string
  updatedWhen?: Date
  mintDate?: Date
}

type EventsType = 'ActivityUpdated'
