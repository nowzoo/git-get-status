var git_get_status = require('../index');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
describe('git-get-status', function(){
    describe('#parse_show_ref()', function(){

        it('should return no references for a newly initialized repo', function(){
            var input = fs.readFileSync(path.join(__dirname, 'show-ref-newly-initialized-repo.txt'), {encoding:'utf8'});
            var refs = git_get_status.parse_show_ref(input);
            expect(refs).to.be.an('object');
            expect(_.size(refs)).to.equal(0);
        });

        it('should return three references for a repo with three', function(){
            var input = fs.readFileSync(path.join(__dirname, 'show-ref-repo-with three-refs.txt'), {encoding:'utf8'});
            var refs = git_get_status.parse_show_ref(input);
            expect(refs).to.be.an('object');
            expect(_.size(refs)).to.equal(3);
            expect(refs).to.contain.key('refs/heads/master');
        });

        it('should return one references for a repo with one', function(){
            var input = fs.readFileSync(path.join(__dirname, 'show-ref-reop-with-one-ref.txt'), {encoding:'utf8'});
            var refs = git_get_status.parse_show_ref(input);
            expect(refs).to.be.an('object');
            expect(_.size(refs)).to.equal(1);
            expect(refs).to.contain.key('refs/heads/master');
        });
    });

    describe('#parse_status()', function(){

        it('should return the correct results for a newly initialized repo', function(){
            var input = fs.readFileSync(path.join(__dirname, 'status-newly-init.txt'), {encoding:'utf8'});
            var status = git_get_status.parse_status(input);
            expect(status).to.be.an('object');
            expect(status).to.have.keys(['local_branch', 'remote_branch', 'remote_diff', 'clean', 'files']);
            expect(status.local_branch).to.equal('master');
            expect(status.remote_branch).to.be.null;
            expect(status.remote_diff).to.be.null;
            expect(status.clean).to.be.true;
            expect(status.files).to.be.an('array');
            expect(status.files).to.have.length(0);
        });

        it('should return the correct results for a repo with unadded changes', function(){
            var input = fs.readFileSync(path.join(__dirname, 'status-unadded-changes.txt'), {encoding:'utf8'});
            var status = git_get_status.parse_status(input);
            expect(status).to.be.an('object');
            expect(status).to.have.keys(['local_branch', 'remote_branch', 'remote_diff', 'clean', 'files']);
            expect(status.local_branch).to.equal('master');
            expect(status.remote_branch).to.equal('origin/master');
            expect(status.remote_diff).to.be.null;
            expect(status.clean).to.be.false;
            expect(status.files).to.be.an('array');
            expect(status.files).to.have.length(3);
        });

        it('should return the correct results for a repo with added but not commited changes', function(){
            var input = fs.readFileSync(path.join(__dirname, 'status-added-but-not-committed.txt'), {encoding:'utf8'});
            var status = git_get_status.parse_status(input);
            expect(status).to.be.an('object');
            expect(status).to.have.keys(['local_branch', 'remote_branch', 'remote_diff', 'clean', 'files']);
            expect(status.local_branch).to.equal('master');
            expect(status.remote_branch).to.equal('origin/master');
            expect(status.remote_diff).to.be.null;
            expect(status.clean).to.be.false;
            expect(status.files).to.be.an('array');
            expect(status.files).to.have.length(8);
        });

        it('should return the correct results for a repo with committed changes but not pushed', function(){
            var input = fs.readFileSync(path.join(__dirname, 'status-committed-unpushed.txt'), {encoding:'utf8'});
            var status = git_get_status.parse_status(input);
            expect(status).to.be.an('object');
            expect(status).to.have.keys(['local_branch', 'remote_branch', 'remote_diff', 'clean', 'files']);
            expect(status.local_branch).to.equal('master');
            expect(status.remote_branch).to.equal('origin/master');
            expect(status.remote_diff).not.to.be.null;
            expect(status.clean).to.be.true;
            expect(status.files).to.be.an('array');
            expect(status.files).to.have.length(0);
        });

        it('should return the correct results for a repo with committed and pushed changes', function(){
            var input = fs.readFileSync(path.join(__dirname, 'status-pushed.txt'), {encoding:'utf8'});
            var status = git_get_status.parse_status(input);
            expect(status).to.be.an('object');
            expect(status).to.have.keys(['local_branch', 'remote_branch', 'remote_diff', 'clean', 'files']);
            expect(status.local_branch).to.equal('master');
            expect(status.remote_branch).to.equal('origin/master');
            expect(status.remote_diff).to.be.null;
            expect(status.clean).to.be.true;
            expect(status.files).to.be.an('array');
            expect(status.files).to.have.length(0);
        });


    });


});

