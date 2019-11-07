import {describe, it} from 'mocha';
import 'chai/register-should';
import 'chai/register-expect';

import validator from 'validator';
import {Github} from '../util/github';

let user,
  repo,
  pulls;

describe('GitHub', function() {
  
  describe('#pulls()', function() {

    beforeEach(function () {
      user = 'hapijs';
      repo = 'joi';
      pulls = Github.pulls([user,repo].join('/'));
    });

    it('Should return JSON', function() {
      expect(validator.isJSON(JSON.stringify(pulls))).to.be.true;
    });

    
    it('Should return an array of objects', function() {
      expect(Array.isArray(pulls)).to.be.true;
      expect(typeof pulls[0]).to.equal('object');
    });

    it('Should throw an error if user/repo path is not specified', function() {
      try {
        Github.pulls();
      } catch (error) {
        expect(error).to.be.an('error');
        error.toString().should.include('user/repo is required');
      }
    });

    it('Should return pull requests for repository specified', function() {
      let wrongPath = 'DGZN/he-ghapi';
      let wrong = Github.pulls(wrongPath);
      pulls[0].head.repo.name.should.equal(repo);
      wrong[0].head.repo.name.should.not.equal('he-ghapi');
    });

  });

});
