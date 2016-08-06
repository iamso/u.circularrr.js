module.exports = {
  options: {
    separator: '\n\n',
    stripBanners: {
      block: false,
      line: false
    },
    banner: '<%= banner %>',
  },
  ujs: {
    src: [
      'src/umd/ujs.js',
      'src/plugin.js',
      'src/umd/end.js',
    ],
    dest: 'dist/u.circularrr.js'
  },
  jquery: {
    src: [
      'src/umd/jquery.js',
      'src/plugin.js',
      'src/umd/end.js',
    ],
    dest: 'dist/jquery.circularrr.js'
  }
};
