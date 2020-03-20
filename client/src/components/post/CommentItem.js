import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeComment } from '../../actions/post'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const CommentItem = ({
  auth,
  removeComment,
  comment: { _id, user, text, name, avatar, date },
  postId
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger"
            onClick={e => {
              console.log(postId, _id)
              removeComment(postId, _id)
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
