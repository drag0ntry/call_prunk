var fs = require('fs'); 
const request = require('request-promise');
const { VK } = require('vk-io');
const vk = new VK();

var users = require("./base/users.json");
var cmds = require('./settings/cmds.js').cmds;
var f = require("./settings/functions.js");
var { config } = require("./settings/config.js");
var { audio } = require("./settings/audio.js");

vk.setOptions({ token: (config.token), pollingGroupId: (config.id)});

//express↓
var express = require('express')
 var app = express();
 var md5 = require('md5');
 var { URLSearchParams } = require('url');
 
 var send = ("$");
 var send_a = ("$");

app.get("/zing", async function (req, res) {
	if(req.query.field2){
		var user = users.find(x=> x.id == req.query.field1);
		if(!user) return;
		user.money += (Number(req.query.amount));
		vk.api.messages.send({
			user_id: (user.id),
			message: (`💵 На ваш баланс зачислено: ${req.query.amount} руб.
			💜Спасибо за покупку!`)
			});
		}else{
	res.send("Привет: )");
	if(req.query.status == 0){
		var user = users.find(x=> x.num == req.query.num);
		if(!user) return;
		user.num = (false);
		user.money -= (1);
return send("🙇Произошла ошибка!", {user_id: user.id});
};
var user = users.find(x=> x.num == req.query.num);
if(!user) return;
user.num = (false);
user.money -= (5);
	send_a(req.query.audios, {user_id: user.id, message: "😘Готово:"});
	};
      })
      app.listen(2552)
//express↑

setInterval(() => {
	fs.writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));
}, 10000);

const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (msg) => {
	if(Number(msg.senderId) <= 0) return;
	
	msg.user = msg.senderId;
	
send = (text, params) => { msg.send(text, params) };
send_a = (link, params) => { msg.sendAudioMessage(link, params) };

var [vk_user] = await vk.api.users.get({ user_ids: msg.senderId });

if(!users.find(t=> t.id == msg.user)) {
	users.push({
		id: msg.user, //vk?
		name:  vk_user.first_name,
		money: 7,
		num: false,
		rights: 0,
		date: f.createDate(),
		uid: users.length
		});
	};
	
	 i = users.find(t=> t.id == msg.user);

const command = cmds.find(x=> x[0].test(msg.text));
	if(!command) return;
args = msg.text.match(command[0]);
	if(i.rights < command[1]) return send("📛 Не хватает прав!");
	command[2](send, send_a, vk, msg, users);
	})