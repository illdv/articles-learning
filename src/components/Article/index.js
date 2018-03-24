import React from 'react';
import CommentList from '../CommentList';
import { connect } from 'react-redux';
import { deleteArticle, loadArticle } from '../../AC'
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './style.css';

class Article extends React.Component {

    componentWillReceiveProps({ isOpen, loadArticle, article }) {
        if (isOpen && !article.text && !article.loading) loadArticle(article.id)
    }
    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null
        if (article.loading) return <Loader />
        return (<CSSTransition
            classNames="article"
            timeout={{ enter: 500, exit: 300 }}
        >
            <section>{article.text}

                <CommentList article={article} />
            </section>
        </CSSTransition>)
    }
    handleDelete = () => {
        const { deleteArticle, article } = this.props
        deleteArticle(article.id);
    }
    render() {
        const { article, isOpen, toggleOpen } = this.props;
        return (
            < article >
                <h3>{article.title} </h3>
                <button onClick={toggleOpen}>
                    {isOpen ? 'Hidden' : 'Show'}
                </button>
                <button onClick={this.handleDelete}>Delete me</button>
                <TransitionGroup>
                    {this.getBody()}
                </TransitionGroup>
            </article >
        )
    }

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

export default connect(null, { deleteArticle, loadArticle })(Article)