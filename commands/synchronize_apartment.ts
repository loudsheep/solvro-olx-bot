import { DateTime } from "luxon";

import { BaseCommand } from "@adonisjs/core/ace";
import type { CommandOptions } from "@adonisjs/core/types/ace";

import SearchQuery from "#models/search_query";

interface ResponseType {
  data: { created_time: string; title: string }[];
}

export default class SynchronizeApartment extends BaseCommand {
  static commandName = "synchronize:apartment";
  static description = "";

  static options: CommandOptions = {
    startApp: true,
  };

  async run() {
    const queries = await SearchQuery.all();

    for (const query of queries) {
      const url = new URL("https://www.olx.pl/api/v1/offers");
      url.searchParams.set("category_id", "1307");
      url.searchParams.set("region_id", "3");
      url.searchParams.set("city_id", "19701");
      url.searchParams.set("district_id", "391");
      url.searchParams.set("sort_by", "created_at:desc");
      url.searchParams.set("limit", "50");

      url.searchParams.set(
        "filter_float_price:from",
        query.priceMin.toString(),
      );
      url.searchParams.set("filter_float_price:to", query.priceMax.toString());

      const response = await fetch(url);

      const { data } = (await response.json()) as ResponseType;

      for (const apartment of data) {
        const createdTime = new Date(apartment.created_time);

        if (createdTime < query.refreshedAt.toJSDate()) {
          continue;
        }

        query.refreshedAt = DateTime.local();
        await query.save();

        this.logger.success(
          `Znaleziono mieszkanie spełniające wymagania: ${apartment.title}`,
        );
        return;
      }
    }

    this.logger.error("Brak mieszkań spełniających warunki");
  }
}
