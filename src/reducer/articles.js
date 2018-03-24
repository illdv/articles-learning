import { arrToMap } from '../helpers'
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, START, SUCCESS, LOAD_ARTICLE } from '../constants';
import { Record, OrderedMap } from 'immutable';

const ArticleRecord = Record({
    text: '',
    title: '',
    id: '',
    loading: false,
    comments: []
})

const ReducerState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})

const defaultArticles = ReducerState({});

export default (articleState = defaultArticles, action) => {
    const { type, payload, response, randomId } = action

    switch (type) {

        case DELETE_ARTICLE:
            return articleState.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articleState.updateIn(['entities', payload.articleId, 'comments'],
                comments => comments.concat(randomId))

        case LOAD_ALL_ARTICLES + START:
            return articleState.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articleState
                .set('entities', arrToMap(response, ArticleRecord))
                .set('loading', false)
                .set('loaded', true)

        case LOAD_ARTICLE + START:
            return articleState.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE + SUCCESS:
            return articleState.setIn(['entities', payload.id], new ArticleRecord(payload.response))


        default: return articleState
    }
}