Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/board/:_id', {
  name: 'board'
})

Router.route('/', {
  name: 'boards'
});
