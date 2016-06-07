/**
 * 
 */

import path from 'path';

const projectRoot = path.resolve(path.join(__dirname, '..', '..'));

export default {
  src  : {
    client: {
      entry : path.join(projectRoot, 'src', 'client', 'resources', 'index.html'),
      root  : path.join(projectRoot, 'src', 'client'),
      public: path.join(projectRoot, 'src', 'client', 'public'),
    },
  },
  build: {
    client: {
      public    : path.join(projectRoot, 'build', 'client'),
      entry     : path.join(projectRoot, 'build', 'client', 'public', 'index.html'),
      asset     : path.join(projectRoot, 'build', 'client', 'public', 'assets.js'),
      style     : path.join(projectRoot, 'build', 'client', 'public', 'main.css'),
      pathPrefix: 'static/',
      dest      : {
        root : path.join(projectRoot, 'build', 'client', 'public', 'static'),
        image: path.join(projectRoot, 'build', 'client', 'public', 'static', 'img'),
        font : path.join(projectRoot, 'build', 'client', 'public', 'static', 'font'),
      },
    },
  },
};
