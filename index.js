var exec = require('child_process').exec;
var cmd = 'git status --porcelain -b';

exec(cmd, function(err, stdout){
    var branches;
    var branch_rx = /^\#\#\s+([^]+)(...([^\s]+)(\s\[([^\]]+))?)?/;
    var status;
    if (err) return callback(err);
    branches = stdout.match(branch_rx)[1].split('...');
    status = stdout.match(branch_rx);
    console.log(status);


    //callback(err, stdout.length > 0);
});
