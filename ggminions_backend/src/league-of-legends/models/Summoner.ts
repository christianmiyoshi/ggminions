import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity('sumonners')
export class Summoner {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    riot_id: string

    @Column()
    account_id: string

    @Column()
    name: string

    @Column({ unique: true })
    puuid: string

    @Column()
    summoner_level: number
}