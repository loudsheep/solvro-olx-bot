/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SearchQueriesController from '#controllers/search_queries_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')


router.post('/api/v1/search-queries', [SearchQueriesController, 'store']);