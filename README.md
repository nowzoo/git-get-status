# git-get-status
A small node.js utility for parsing `git status --porcelain`.

## Install

```
$ npm install git-get-status
```

## Usage

```
var git_get_status = require('git-get-status');

git_get_status(function(err, result){
    var status = result;
});
```

## The `status` object
```
{
   // the local branch...
   local_branch: 'master',
   
   // the remote branch, if any...
   remote_branch: 'origin/master',
   
   // whether and by how many commits the local branch is 
   // ahead or behind the remote. If the local and remote
   // branch are caught up, this will be null
   remote_diff: 'ahead 1',
   
   // if there are unadded or uncommited local changes,
   // clean will be false. Otherwise clean will be true.
   clean: true,
   
   // a list of unadded or uncommited files
   files: []
}
```
