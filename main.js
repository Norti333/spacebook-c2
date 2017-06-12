var SpacebookApp = function () {
    {text: "Hello world 1", comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world 2", comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
  var postsObj = {
    posts: [

    ]
  };

  var $posts = $('.posts');

  var createPost = function (text) {
    postsObj.posts.push({
      text: text,
      comments: []
    });
  };



  var renderPosts = function () {
    $posts.empty();
    var source = $('#render-post').html();
    var template = Handlebars.compile(source);
    var newHTML = template(postsObj);
    $('.posts').append(newHTML);
  };


  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var index = $clickedPost.index();
    postsObj.posts.splice(index, 1);
    $clickedPost.remove();
  };

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  };

  var createComment = function (text, postIndex) {
    var comment = {
      text: text
    };
    postsObj.posts[postIndex].comments.push(comment);
  };

  var removeComment = function (commentButton) {
    debugger
    var $clickedComment = $(commentButton).closest('.comment');
    var commentIndex = $clickedComment.index();
    var postIndex = $clickedComment.closest('.post').index();
    $clickedComment.remove();
    postsObj.posts[postIndex].comments.splice(commentIndex, 1);
  };

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    createComment: createComment,

    removeComment: removeComment,
    toggleComments: toggleComments
  };
};

var app = SpacebookApp();




$('.add-post').on('click', function (e) {
  var text = $('#post-name').val();
  app.createPost(text);
  app.renderPosts()

});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var text = $(this).siblings('.comment-name').val();

  var postIndex = $(this).closest('.post').index();
  app.createComment(text, postIndex);
  app.renderPosts()
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
});