// import github from 'github-api';
// import axios from 'axios';

class Github {
  
  static pulls (path='') {
    if (!path.length)
      throw Error('Github user/repo is required');
    return require('../stubs/hapijs.joi.pulls.json');
  }

}

export {Github};