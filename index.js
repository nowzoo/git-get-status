var exec = require('child_process').exec;
var cmd = 'git status --porcelain -b';

exec(cmd, function(err, stdout){
    var lines;
    var branch_line;
    var branches;
    var status = {};
    if (err) return callback(err);
    lines = stdout.split('\n');
    branch_line = lines.shift().replace(/\#\#\s+/, '');
    branches = branch_line.split('...');
    status.local = branches[0];
    if (branches[1]){
        
    }
    console.log(branches);


    //callback(err, stdout.length > 0);
});
