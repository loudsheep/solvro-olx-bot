import { DateTime } from "luxon";

import { BaseCommand } from "@adonisjs/core/ace";
import type { CommandOptions } from "@adonisjs/core/types/ace";

import SearchQuery from "#models/search_query";

interface ResponseType {
  data: { created_time: string; title: string }[];
}

export default class Apartment extends BaseCommand {
  static commandName = "apartment";
  static description = "";

  static options: CommandOptions = {
    startApp: true,
  };

  async run() {
    const queries = await SearchQuery.all();

    for (const query of queries) {
      const url = `https://www.olx.pl/api/v1/offers?category_id=1307&city_id=${query.locationId}&region_id=3&filter_float_price:from=${query.priceMin}&filter_float_price:to=${query.priceMax}&sort_by=created_at:desc&limit=10`;
      const res = await fetch(url);

      const { data } = (await res.json()) as ResponseType;

      for (const apt of data) {
        const createdTime = new Date(apt.created_time);

        if (createdTime < query.refreshedAt.toJSDate()) {
          continue;
        }

        query.refreshedAt = DateTime.local();
        await query.save();

        this.logger.success(
          `Znaleziono mieszkanie spełniające wymagania: ${apt.title}`,
        );
        return;
      }
    }

    this.logger.error("Brak mieszkań spełniających warunki");
  }
}
