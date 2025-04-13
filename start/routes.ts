/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from "@adonisjs/core/services/router";

import SearchQueriesController from "#controllers/search_queries_controller";

router.where("id", router.matchers.number());

router.get("/api/v1/search-queries", [SearchQueriesController, "index"]);
router.post("/api/v1/search-queries", [SearchQueriesController, "store"]);
router
  .get("/api/v1/search-queries/:id", [SearchQueriesController, "show"])
  .where("id", router.matchers.number());
