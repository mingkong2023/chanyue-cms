const schedule = require('node-schedule');
const exec = require('child_process').exec;
const cmd = 'pm2 flush';
module.exports = function () {
    schedule.scheduleJob('* * 23 * * *', function () {
        exec(cmd, function (err, stdout) {
            if (err) {
                console.error('清除日志失败')
            } else {
                console.error('清除日志成功')
            }
        });
    });
}

