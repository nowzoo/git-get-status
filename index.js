var exec = require('child_process').exec;
var cmd = 'git status --porcelain -b';

exec(cmd, function(err, stdout){
    var lines;
    var branch_line;
    var branches;
    var status = {};
    var result;
    if (err) return callback(err);
    lines = stdout.split('\n');
    branch_line = lines.shift().replace(/\#\#\s+/, '');
    console.log(stdout);
    branches = branch_line.split('...');
    status.local = branches[0];
    status.remote_diff = null;
    if (branches[1]){
        result = branches[1].match(/^([^\s]+)/);
        status.remote = result[1];
        result = branches[1].match(/\[([^\]]+)\]/);
        status.remote_diff = result ? result[1] : null;
    }
    status.clean = lines.length === 0;
    console.log(status);


    //callback(err, stdout.length > 0);
});
