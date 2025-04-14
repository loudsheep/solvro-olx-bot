import type { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import {
  createSearchQueryValidator,
  updateSearchQueryValidator,
} from "#validators/search_query";

export default class SearchQueriesController {
  async index({ request, response }: HttpContext) {
    const page = Number(request.input("page", 1)) || 1;
    const perPage = Number(request.input("perPage", 10)) || 10;

    const queries = await SearchQuery.query().paginate(page, perPage);

    return response.json(queries);
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);

    const newSearchQuery = await SearchQuery.create(data);

    return response.created(newSearchQuery);
  }

  async show({ params, response }: HttpContext) {
    const searchQuery = await SearchQuery.findOrFail(params.id);

    return response.json(searchQuery);
  }

  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(updateSearchQueryValidator);

    const searchQuery = await SearchQuery.findOrFail(params.id);

    await searchQuery.merge(data).save();

    return response.ok(searchQuery);
  }
}
