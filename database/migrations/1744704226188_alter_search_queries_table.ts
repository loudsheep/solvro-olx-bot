import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "search_queries";

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp("refreshed_at").defaultTo(this.now());
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("refreshed_at");
    });
  }
}
