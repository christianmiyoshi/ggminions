import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"
import { SummonerDTO } from "../dto/SummonerDTO"

@Entity()
export class Summoner {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    riotId: string

    @Column()
    accountId: string

    @Column()
    name: string

    @Column({ unique: true })
    puuid: string

    @Column()
    summonerLevel: number
}