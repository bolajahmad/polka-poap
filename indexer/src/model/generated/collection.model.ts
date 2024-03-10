import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Organizer} from "./organizer.model"
import {Activity} from "./activity.model"

@Entity_()
export class Collection {
    constructor(props?: Partial<Collection>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    collectionId!: bigint

    @Index_()
    @ManyToOne_(() => Organizer, {nullable: true})
    createdBy!: Organizer

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    mintedAt!: bigint

    @Index_()
    @ManyToOne_(() => Activity, {nullable: true})
    event!: Activity

    @Column_("text", {nullable: false})
    collectionHash!: string
}
