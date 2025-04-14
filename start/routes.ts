/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from "@adonisjs/core/services/router";

const SearchQueriesController = () =>
  import("#controllers/search_queries_controller");

router.where("id", router.matchers.number());

router.resource("/api/v1/search-queries", SearchQueriesController);
