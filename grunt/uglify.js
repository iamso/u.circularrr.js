module.exports = {
  options: {
    mangle: {
      except: ['u', 'µ']
    },
    compress: {
      //drop_console: true
    },
    preserveComments: false,
    sourceMap: true
  },
  ujs: {
    options: {
      banner: '<%= banner %>'
    },
    src: ['dist/u.circularrr.js'],
    dest: 'dist/u.circularrr.min.js'
  },
  jquery: {
    options: {
      banner: '<%= banner %>'
    },
    src: ['dist/jquery.circularrr.js'],
    dest: 'dist/jquery.circularrr.min.js'
  }
};
