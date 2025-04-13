import type { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { searchQueryValidator } from "#validators/search_query";

export default class SearchQueriesController {
  async index({ request, response }: HttpContext) {
    const page = request.input("page", 1);
    const perPage = request.input("perPage", 10);

    const queries = await SearchQuery.query().paginate(page, perPage);

    return response.json(queries);
  }

  async store({ request, response }: HttpContext) {
    let data = await request.validateUsing(searchQueryValidator);

    let newSearchQuery = await SearchQuery.create(data);

    return response.created(newSearchQuery);
  }

  async show({ params, response }: HttpContext) {
    const searchQuery = await SearchQuery.find(params.id);

    if (searchQuery == null) {
      return response.status(404).json({ message: "Not found" });
    }

    return response.json(searchQuery);
  }
}
