var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Discord Bot Activated.");

});

var port = process.env.PORT || 1337;
server.listen(port);

const Eris = require("eris");
var bot = new Eris("DiscordAppで作成したBotのToken");
bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    if(msg.content === "LT始めます") {
        bot.createMessage(msg.channel.id, "LTタイマースタートします。5分後にお知らせするよ！");
        var request = require('request');
        var options = {
            uri: "Azure Functionsの関数URL",
            headers: {
                "Content-type": "application/json",
            },
            json: {
                "return" : "Discordサーバ設定で作成したWebhookのURL",
                "comment": "後5分だよ〜",
                "timer"  : "300000"
            }
        };
        request.post(options, function(error, response, body){});    
    } else if(msg.content === "死んだ？"){
        bot.createMessage(msg.channel.id, "生きてるよ！（＠益＠#）");
    } else if(msg.content === "後5分だよ〜"){
        bot.createMessage(msg.channel.id, "後5分ですと！？");
        var request = require('request');
        var options = {
            uri: "Azure Functionsの関数URL",
            headers: {
                "Content-type": "application/json",
            },
            json: {
                "return" : "Discordサーバ設定で作成したWebhookのURL",
                "comment": "時間切れ！終わり！お疲れ様！（＠益＠#）",
                "timer"  : "300000"
            }
        };
        request.post(options, function(error, response, body){});    
    } 
});

// Discord に接続します。
bot.connect();