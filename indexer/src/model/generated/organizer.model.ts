import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, Index as Index_} from "typeorm"
import {Activity} from "./activity.model"
import {Collection} from "./collection.model"

@Entity_()
export class Organizer {
    constructor(props?: Partial<Organizer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Activity, e => e.organizer)
    activities!: Activity[]

    @OneToMany_(() => Collection, e => e.createdBy)
    collections!: Collection[]

    @Column_("text", {nullable: false})
    username!: string

    @Index_()
    @Column_("text", {nullable: false})
    account!: string
}
