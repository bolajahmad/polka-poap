import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Organizer} from "./organizer.model"
import {Collection} from "./collection.model"

@Entity_()
export class Activity {
    constructor(props?: Partial<Activity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    eventId!: bigint

    @Index_()
    @ManyToOne_(() => Organizer, {nullable: true})
    organizer!: Organizer

    @Index_()
    @ManyToOne_(() => Collection, {nullable: true})
    collection!: Collection

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    createdAt!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    mintDate!: bigint
}
