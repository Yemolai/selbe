import React from "react";
import { connect } from "react-redux";
import "../style/PostList.css";
import * as actions from '../actions';
import PostListItem from './PostListItem';
import NothingHere from '../img/nothing+here.jpg';

class PostList extends React.Component {
  state = {
    addFormVisible: false,
    addFormTitle: '',
    addFormContent: '',
    addFormTags: []
  }
  handleTitleInputChange = event => {
    this.setState({ addFormTitle: event.target.value });
  }
  handleContentInputChange = event => {
    this.setState({ addFormContent: event.target.value });
  }
  handleTagsInputChange = event => {
    this.setState({ addFormTags: event.target.value.split(',').map(v => v.trim()) });
  }
  handleSubmitNewPost = event => {
    event.preventDefault();
    const { addFormTitle, addFormContent, addFormTags } = this.state;
    const { addPost } = this.props;
    addPost({
      title: addFormTitle,
      content: addFormContent,
      tags: addFormTags
    });
    this.setState({
      addFormTitle: '',
      addFormContent: '',
      addFormTags: []
    });
  }
  componentWillMount() {
    this.props.fetchPosts();
  }
  renderAddForm = () => {
    const { addFormVisible, addFormTitle, addFormContent, addFormTags } = this.state;
    if (!addFormVisible) {
      return (<span></span>);
    }
    return (
      <div className="post-add-form">
        <form onSubmit={this.handleSubmitNewPost}>
          <div className="input-field">
            <label for="add-form-title">Título</label>
            <input
              id="add-form-title"
              value={addFormTitle}
              onChange={this.handleTitleInputChange}
            />
          </div>
          <div className="input-field">
            <label for="add-form-content">Content</label>
            <input
              id="add-form-content"
              value={addFormContent}
              onChange={this.handleContentInputChange}
            />
          </div>
          <div className="input-field">
            <label for="add-form-tags">Tags</label>
            <input
              id="add-form-tags"
              value={addFormTags.join(', ')}
              onChange={this.handleTagsInputChange}
            />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
  renderPosts = () => {
    const { data } = this.props;
    if (Object.keys(data).length < 1) {
      return (
        <div className="col s10 offset-s1 center-align">
          <img alt="Nothing was found" id="nothing-here" src={NothingHere}/>
          <h4>No posts found</h4>
          <p>
            Apparently you have no posts to show.
          </p>
          <p>
            Create a new one clicking on the plus button below.
          </p>
        </div>
      );
    }
    const posts = Object.keys(data).map(key => {
      const post = data[key];
      return (<PostListItem key={key} postId={key} post={post}/>);
    });
    return posts;
  }
  renderAddButton = () => (
    <div className="fixed-action-button">
      <button
        onClick={() => this.setState({addFormVisible: !this.state.addFormVisible})}
        className="btn-floating btn-large teal darken-4"
      >
        { this.state.addFormVisible ? 'x' : '+' }
      </button>
    </div>
  )
  render () {
    return (
      <div className="post-list-container">
        {this.renderAddButton()}
        {this.renderAddForm()}
        <div className="post-list row">
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => ({ data });

export default connect(mapStateToProps, actions)(PostList);