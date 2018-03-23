import React from 'react';
import CommentList from '../CommentList';
import { connect } from 'react-redux';
import { deleteArticle } from '../../AC'
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './style.css';

const Article = ({ article, isOpen, toggleOpen, deleteArticle }) => {

    const body =
        <CSSTransition
            classNames="article"
            timeout={{ enter: 500, exit: 300 }}
        >
            <section>{article.text}

                <CommentList article={article} />
            </section>
        </CSSTransition>



    const handleDelete = () => deleteArticle(article.id);


    return (
        < article >
            <h3>{article.title} </h3>
            <button onClick={toggleOpen}>
                {isOpen ? 'Hidden' : 'Show'}
            </button>
            <button onClick={handleDelete}>Delete me</button>
            <TransitionGroup>
                {isOpen ? body : null}
            </TransitionGroup>
        </article >
    )
}











Article.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string
    }).isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
}

export default connect(null, { deleteArticle })(Article)