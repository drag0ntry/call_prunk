const request = require('request-promise');
var numcap = require('numcap');
var md5 = require('md5');
 var { URLSearchParams } = require('url');

var f = require("./functions.js");
var { config } = require("./config.js");
var { audio } = require("./audio.js");


var cmds = [];

var cmd = (name, rights, func) => {
		cmds.push([name, rights, func]);
		};
		
		cmd(/^(?:Начать|Помощь|Команды)$/i, 0, (send, send_a, vk, msg, users) => {
			send(`📓 Список команд:
🀄 Инфо - информация (правила).
💰 Баланс - баланс.
💳 Купить [сумма рублей] - пополнение средств.
📖 Список - список пранк звонков.
📞 Звонок [номер записи] [номер телефона]`, {keyboard: JSON.stringify(f.kb( [[{text: `💰Баланс`, color: "positive"}], [{text: `🀄Инфо`, color: "negative"}], [{text: `📖Список`, color: "primary"}]] ))});
			});
			
		cmd(/^(?:Донат|Купить)(\s[^]+|)$/i, 0, (send, send_a, vk, msg, users) => {
			if(!args[1]) return send("📝 Введите сумму!\n✅ Пример: Купить 10");
			if(!Number(args[1]) || args[1] < 1) return send("📛 Сумма должна быть числом!");
			args[1] = (Number(Number(args[1]).toFixed(0)));
			var doshik = {
           shop_id: config.donate.id,
           secret_key: config.donate.key,
           desc: "Донат",
           amount: (args[1]),
           pay_id: Number(i.id + f.rand(11111111, 99999999)),
           currency: "RUB",
           field: i.id,
           field2: 1
        };
        var sex_fire = new URLSearchParams({
             merchant_id: doshik.shop_id,
             amount: doshik.amount,
             pay_id: doshik.pay_id,
             currency: doshik.currency,
             desc: doshik.desc,
             field1: doshik.field,
             field2: doshik.field2,
             sign: md5(`${doshik.currency}:${doshik.amount}:${doshik.secret_key}:${doshik.shop_id}:${doshik.pay_id}`)
        });
        var sexx0 = (`https://anypay.io/merchant?${sex_fire}`);
        vk.api.utils.getShortLink({ url: sexx0 }).then((res) => {
        send(`💸 Ссылка для оплаты --> ${res.short_url}`);
        });
			});
			
			cmd(/^(?:Инфо|Информация|Правила|🀄Инфо)$/i, 0, (send, send_a, vk, msg, users) => {
			send(`🀄 Информация:
🔹 Звонки доступны только на номера России.
🔸 Перед заказом звонка рекомендуется убедиться в том что человек на чей номер совершается звонок сможет ответить.
🔹 Цена удачного звонка - 5 руб.
🔸 В случае неудачного звонка (не ответит клиент) с баланса будет списано 1 руб.
🔹В случае если ответит автоответчик, будет засчитано как успешный звонок.

❔ По всем вопросам: [id${config.owner.id}|${config.owner.name}] `);
			});
			
			cmd(/^(?:Баланс|💰Баланс)$/i, 0, (send, send_a, vk, msg, users) => {
		send(`💰 Баланс: ${i.money}руб.
(Этого хватит на ${Math.floor(i.money/5)} звонков)`);
		});
		
		cmd(/^(?:Список|📖Список)$/i, 0, (send, send_a, vk, msg, users) => {
	audio.filter(x=> x.id > 0).map(x=> {
		send_a(x.url, { message: (x.id + ". " + x.name + ":") } );
		});
		send("🔥 Цена 1 звонка --> 5 руб.\n💦 Совершение звонка: Звонок [ид] [номер]\n✅ Пример: Звонок 1 89034508440");
	});
	
	cmd(/^(?:Звонок)(\s([^]+)\s([^]+)|\s([^]+)|)$/i, 0, (send, send_a, vk, msg, users) => {
	if(!args[1]) return send("📝 Введите ИД записи!\n✅ Пример: Звонок 1 89034508440");
	if(!args[3]) return send("📝 Введите номер телефона!\n✅ Пример: Звонок 1 89034508440");
	if(!audio[args[2]] || args[2] < 1) return send("📛 Запись не найдена!");
	var aud0 = (audio[args[2]]);
	var finder = new numcap();
finder.getData(args[3], function (err, data){
    if(err) return send("📛 Не верный номер!");
    args[3] = args[3].replace("+", "");
    if(!(/(7|8)([^]+)/ig).test(args[3]) || args[3].length != 11) return send("📛 Не верный номер!");
    args[3] = args[3].replace(args[3][0], "");
    if(i.num != false) return send("📛 Подождите заверщения предидущего звонка!");
    if(i.money < 5) return send("📛 У вас не хватает рублей!");
    i.num = ("8"+args[3]);
    var url = (`https://zvonok.com/manager/cabapi_external/api/v1/phones/call/?campaign_id=${aud0.uid}&phone=${args[3]}&public_key=${config.call.token}`);
	request.post(url);
	send("📞 Я уже набираю..");
});
	});

module.exports = {
	cmds
	};