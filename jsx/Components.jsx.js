var Reflux = require("reflux");
var React = require("react");
var ReactDOM = require("react-dom");
var Actions = require("./Actions.js");
var Store = require("./Store.js");
var CommentActions = Actions.CommentActions;
var CommentStore = Store.CommentStore

var CommentInput = React.createClass({
  submitComment: function(){
    var author = this.refs.authorInput.value;
    var text = this.refs.textInput.value;
    if(author != "" && text != ""){
      CommentActions.addComment({id: CommentStore.commentCount+1, author: author, text: text})
      this.refs.authorInput.value = "";
      this.refs.textInput.value = "";
    }
  },
  render: function(){
    return (
      <div style={CommentInputStyle} className="commentInput">
        <table>
          <tbody>
            <tr><td style={formTableCellStyle}><input type="text" ref="authorInput" placeholder="Author"/></td></tr>
            <tr><td style={formTableCellStyle}><input type="text" ref="textInput" placeholder="Text"/></td></tr>
            <tr><td style={formTableCellStyle}><button onClick={this.submitComment}>submit!</button></td></tr>
          </tbody>
        </table>
      </div>
    )
  }
});

var Comment = React.createClass({
  handleRemoveButton: function(){
    CommentActions.removeComment(this.props.comment);
  },
  render: function(){
    var comment = this.props.comment;
    return(
      <div className="comment">
        <h2>{comment.author} <button className="btn-link" onClick={this.handleRemoveButton}>[X]</button></h2>
        {comment.text}
      </div>
    )
  }
});

var CommentList = React.createClass({
  mixins: [Reflux.connect(CommentStore,"list")],
  render: function(){
    var comments = "No comments"
    if(this.state.list){
      comments = this.state.list.map(function(comment, index){
        return(
          <Comment comment={comment} key={index} />
        )
      });
    }
    return(
      <div className="commentList">
        <h1>Comments:</h1>
        {comments}
        <CommentInput />
      </div>
    )
  }
});

var CommentInputStyle = {
  marginTop: "50px"
}

var formTableCellStyle = {
  padding: "4px"
}

exports.render = function(){
  ReactDOM.render(React.createElement(CommentList, null), document.getElementById('container'));
};
