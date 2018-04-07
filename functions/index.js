module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //req             :POSTで貰うデータ
    //req.body.comment:BOTに喋らせる内容
    //req.body.return :DiscordのWebhookURL
    //req.body.timer  :Functionsが待つ時間
    if (req.body && req.body.comment && req.body.return && req.body.timer) {

        var request = require('request');
        var options = {
            uri: req.body.return,
            headers: {
                "Content-type": "application/json",
            },
            json: {
                "content": req.body.comment
            }
        };
        setTimeout(function(){
            request.post(options, function(error, response, body){})
        },req.body.timer)
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};