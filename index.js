var exec = require('child_process').exec;
var cmd = 'git status --porcelain -b';

exec(cmd, function(err, stdout){
    var lines;
    var branch_line;
    var branches;
    var status = {};
    var result;
    var files = [];
    if (err) return callback(err);
    lines = stdout.trim().split('\n');
    branch_line = lines.shift().replace(/\#\#\s+/, '');
    branches = branch_line.split('...');
    status.local_branch = branches[0];
    status.remote_diff = null;
    if (branches[1]){
        result = branches[1].match(/^([^\s]+)/);
        status.remote_branch = result[1];
        result = branches[1].match(/\[([^\]]+)\]/);
        status.remote_diff = result ? result[1] : null;
    }


    lines.forEach(function(str){
        if (str.match(/\S/)){
            files.push(str);
        }
    });
    status.clean = files.length === 0;
    status.files = files;
    console.log(status);
    //callback(err, stdout.length > 0);
});
