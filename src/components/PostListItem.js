import React from "react";
import { connect } from "react-redux";
import { delPost } from "../actions";

/* intersperse: Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > _([1,2,3]).intersperse(0)
 * [1,0,2,0,3]
 */
function intersperse(arr, sep) {
    if (arr.length === 0) {
        return [];
    }

    return arr.slice(1).reduce(function(xs, x, i) {
        return xs.concat([sep, x]);
    }, [arr[0]]);
}

class PostListItem extends React.Component {
  handleDeletePost = postId => {
    const { delPost } = this.props;
    delPost(postId);
  }
  spanTags = tags => {
    return intersperse(tags.map((tag, idx) => {
      return (<span key={idx} href={"/search/" + tag}>{tag}</span>);
    }), ", ");
  }
  render () {
    const { postId, post } = this.props;
    console.log('post', post);
    return (
      <div className="postItem" key={postId}>
        <h4>{post.title || "Untitled"}</h4>
        <p>{post.content || ""}</p>
        <p>
          {this.spanTags(post.tags)}
        </p>
        <button onClick={() => this.handleDeletePost(postId)}>
          Delete post
        </button>
      </div>
    );
  }
}

export default connect(null, { delPost })(PostListItem);