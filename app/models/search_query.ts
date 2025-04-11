import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SearchQuery extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string;

  @column()
  declare price_min: number;

  @column()
  declare price_max: number;

  @column()
  declare location_id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}