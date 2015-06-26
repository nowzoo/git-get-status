var exec = require('child_process').exec;
var cmd = 'git status --porcelain -b';

exec(cmd, function(err, stdout){
    var branches;
    var branch_rx = /^\#\#\s+([^\n]+)/;
    var status;
    if (err) return callback(err);
    branches = stdout.match(branch_rx)[1].split('...');
    status = {
        clean: stdout.split('\n').length === 1,
        local: branches[0],
        remote: branches.length === 2 ? branches[1] : null
    };
    console.log(status);


    //callback(err, stdout.length > 0);
});
