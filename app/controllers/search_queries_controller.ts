import SearchQuery from '#models/search_query';
import { searchQueryValidator } from '#validators/search_query';
import type { HttpContext } from '@adonisjs/core/http'

export default class SearchQueriesController {
    async store({ request, response }: HttpContext) {
        let data = await request.validateUsing(searchQueryValidator);

        let newSearchQuery = await SearchQuery.create(data);

        return response.created(newSearchQuery);
    }
}