import got from 'got';
import comicsApi from 'comicbooks-api'

const searchOpts = {
  schema: {
    query: {
      type: 'object',
      properties: {
        q: {
          type: 'string'
        },
        page: {
          type: 'number',
          default: 1
        }
      }
    },
    required: ['q']
  }
}

const downloadOpts = {
  schema: {
    query: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          minLength: 3
        },
        page: {
          type: 'number',
          default: 1
        },
        index: {
          type: 'number'
        }
      }
    },
    required: ['index', 'page', 'q']
  }
}



/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function routes (fastify, options) {
  fastify.get('/search', searchOpts, async (req, res) => {
    if (req.query.q.length === 0)
      return await comicsApi.getLatestComics(req.query.page)

    return await comicsApi.getComicsThroughSearch(req.query.q, req.query.page)
  })

  fastify.get('/getComic', downloadOpts, async (req, res) => {
    const comics = await comicsApi.getComicsThroughSearch(req.query.q, req.query.page)
    const wantedComic = comics[req.query.index]
    console.log({wantedComic})
    if (wantedComic && 'downloadLinks' in wantedComic && 'DownloadNow' in wantedComic.downloadLinks) {
      return got.stream.get(wantedComic.downloadLinks.DownloadNow)
    }
    //return got.stream.get('https://github.com/btzr-io/Villain/blob/master/packages/villain-web/dev-server/static/archives/example.zip?raw=true')

    throw Error("Not available");
  })
}