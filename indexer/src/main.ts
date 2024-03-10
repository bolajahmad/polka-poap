import assert from 'assert'

import { Store, TypeormDatabase } from '@subsquid/typeorm-store'

import * as ss58 from '@subsquid/ss58'
import * as events from './handlers/events'
import { Activity, Organizer } from './model'
import { ProcessorContext, SS58_NETWORK, processor } from './processor'

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const txs: ActivityRecord[] = getActivityRecords(ctx)
  console.log({ txs })

  const activities = await createOrUpdateEvents(ctx, txs)

  // const owners: Map<string, Owner> = await createOwners(ctx, txs)
  // const transfers: Transfer[] = createTransfers(txs, owners)

  console.log({ activities })
  // await ctx.store.upsert([...owners.values()])
  if (txs && txs.length) {
    await ctx.store.save(activities)
  }
})

function getActivityRecords(ctx: ProcessorContext<Store>): ActivityRecord[] {
  const records: ActivityRecord[] = []
  for (const block of ctx.blocks) {
    assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
    for (const event of block.events) {
      if (!!event.name) {
        const decodedEvent = events.decodeEvent(event.args.data)
        console.log({ decodedEvent })
        if (decodedEvent.__kind === 'ActivityUpdated') {
          records.push({
            id: event.id,
            eventId: decodedEvent.eventId,
            updatedBy: ss58.codec(SS58_NETWORK).encode(decodedEvent.updatedBy),
            blockCreated: decodedEvent.updatedWhen,
            updatedWhen: new Date(block.header.timestamp),
          })
        }
      }
    }
  }
  return records
}

async function createOrUpdateEvents(
  ctx: ProcessorContext<Store>,
  activities: ActivityRecord[],
): Promise<Activity[]> {
  // id!: string

  //   @Index_()
  //   @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  //   eventId!: bigint

  //   @Index_()
  //   @ManyToOne_(() => Organizer, {nullable: true})
  //   organizer!: Organizer

  //   @Index_()
  //   @ManyToOne_(() => Collection, {nullable: true})
  //   collection!: Collection

  //   @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  //   createdAt!: bigint

  //   @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  //   mintDate!: bigint
  let activitiesToReturn: Activity[] = []
  for (const { eventId, id, updatedWhen, updatedBy, mintDate } of activities) {
    const activity = new Activity({
      id,
      eventId,
      organizer: await ctx.store.findBy(Organizer, { account: updatedBy }).then((org) => org[0]),
      createdAt: BigInt(updatedWhen?.getTime() || 0),
      mintDate: BigInt((mintDate as Date)?.getTime() || 0n),
    })
    activitiesToReturn.push(activity)
  }
  console.log({ activitiesToReturn })

  return activitiesToReturn
}

// function createTransfers(txs: ActivityRecord[], owners: Map<string, Owner>): Transfer[] {
//     return txs.map(tx => {
//         const transfer = new Transfer({
//             id: tx.id,
//             amount: tx.amount,
//             block: tx.block,
//             timestamp: tx.timestamp,
//             extrinsicHash: tx.extrinsicHash
//         })

//         if (tx.from) {
//             transfer.from = owners.get(tx.from)
//             if (transfer.from == null) {
//                 transfer.from = new Owner({id: tx.from, balance: 0n})
//                 owners.set(tx.from, transfer.from)
//             }
//             transfer.from.balance -= tx.amount
//         }

//         if (tx.to) {
//             transfer.to = owners.get(tx.to)
//             if (transfer.to == null) {
//                 transfer.to = new Owner({id: tx.to, balance: 0n})
//                 owners.set(tx.to, transfer.to)
//             }
//             transfer.to.balance += tx.amount
//         }

//         return transfer
//     })
// }
