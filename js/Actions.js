var Reflux = require("reflux");
'use strict';

var CommentActions = Reflux.createActions([
    "addComment",
    "removeComment"
]);

exports.CommentActions = CommentActions;
