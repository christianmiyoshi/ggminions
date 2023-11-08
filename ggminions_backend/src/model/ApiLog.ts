import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, CreateDateColumn, Index } from "typeorm"

@Entity('api_logs')
export class ApiLog {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column()
    url: string

    @Column('json', { default: {}})
    url_parameters: {[key: string]: string}

    @Column()
    @Index()
    path: string

    @Column()
    method: string

    @Column('json', { default: {}})
    body: {[key: string]: any}

    @Column('json')
    response: {[key: string]: any}

    @CreateDateColumn()
    @Index()
    created_at: Date
}