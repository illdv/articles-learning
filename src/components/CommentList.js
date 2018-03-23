import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import CommentForm from './CommentForm'
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends React.Component {


    render() {

        const { article, isOpen, toggleOpen } = this.props
        return (
            <div>
                <button onClick={toggleOpen}>{isOpen ? 'hide comments' : 'show comments'}</button>
                {getBody({ article, isOpen })}
            </div>
        )
    }

}




CommentList.propTypes = {
    comments: PropTypes.array,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
}

function getBody({ article: { comments = [], id }, isOpen }) {
    if (!isOpen) return null
    if (!comments.length) return (
        <div>
            <p>No comments yet</p>
            <CommentForm articleId={id} />
        </div>
    )

    return (
        <div>
            <ul>
                {comments.map(id => <li key={id}><Comment id={id} /></li>)}
            </ul>
            <CommentForm articleId={id} />
        </div>
    )
}

export default toggleOpen(CommentList)