var Reflux = require("reflux");
var Actions = require("./Actions.js");
var CommentActions = Actions.CommentActions;
    'use strict';

    var localStorageKey = "comments";
    var CommentStore = Reflux.createStore({
            listenables: [CommentActions],

            commentCount: 0,

            onAddComment: function(comment){
              this.updateCommentList([comment].concat(this.list));
            },

            onRemoveComment: function(comment){
              var index = this.list.indexOf(comment);
              this.list.splice(index, 1);
              this.updateCommentList(this.list);
            },

            updateCommentList: function(list){
              localStorage.setItem(localStorageKey, JSON.stringify(list));
              this.list = list;
              this.trigger(list);
              this.updateCommentCount();
            },

            updateCommentCount: function(){
              this.commentCount = this.list.length;
            },

            getInitialState: function() {
                var loadedList = localStorage.getItem(localStorageKey);
                if (!loadedList) {
                    this.list = [{
                        id: 1,
                        author: "Joe",
                        text: "example comment"
                    }];
                } else {
                    this.list = _.map(JSON.parse(loadedList), function(item) {
                        return item;
                    });
                }
                this.updateCommentCount();
                return this.list;
            }

    })

exports.CommentStore = CommentStore;
