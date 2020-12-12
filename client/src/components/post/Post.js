import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])
  return (
    <div>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className="comments">
            {post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)