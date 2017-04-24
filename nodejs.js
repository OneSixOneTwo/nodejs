//var module = require("./module/module.js");
//console.log(module)
//引入http创建服务器
var http = require("http");
//引入url模块和querystring模块就是为解析路由的参数
var url = require("url");
var querystring = require("querystring");

//cnpm install mysql
var mysql = require("mysql");

//创建连接
var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "asm"
	})
	//执行数据库连接
connection.connect();

//console.log(http)
//创建服务器
http.createServer(function(request, response) {
		//url.parse(string).query
		//改写头部，允许跨域
		response.setHeader('Access-Control-Allow-Origin', '*');
		//$_GET[]/$_POST[]
		// /?name=ABC&title=ASD
		console.log("url:" + request.url)
			// name=ABC&title=ASD
		console.log(url.parse(request.url).query)

		var paramsStr = url.parse(request.url).query
		var params = querystring.parse(paramsStr)
		console.log("params:")
		console.log(params)

		// http://localhost:12345/[xxx]?name=ABC&title=ASD&skill=PS
		//url.parse(request.url).pathname
		console.log("pathname:" + url.parse(request.url).pathname);
		var pathname = url.parse(request.url).pathname;
		var obj = {
			name: 'wscats',
			age: 88
		}
		switch(pathname) {
			//增加的逻辑
			case "/add":
				//执行查询语句
				connection.query("insert into news (title,text,channel_id) values ('" + params.title + "','" + params.descrition + "','" + params.channel + "')", function(err, data) {
					if(err) {
						throw err
					} else {
						connection.query("select * from news", function(err, data) {
							if(err) {
								throw err
							} else {
								//data => array
								var news = {};
								news.newlists = data;
								response.end(JSON.stringify(news));
							}
						})
					}
				})
				break;
			case "/select":
				connection.query("select * from news", function(err, data) {
					if(err) {
						throw err
					} else {
						//data => array
						var news = {};
						news.newlists = data;
						response.end(JSON.stringify(news));
					}
				})
				break;
			case "/delete":
				connection.query("delete from news where id = " + params.id, function(err, data) {
					if(err) {
						throw err
					} else {
						connection.query("select * from news", function(err, data) {
							if(err) {
								throw err
							} else {
								//data => array
								var news = {};
								news.newlists = data;
								response.end(JSON.stringify(news));
							}
						})
					}
				})
				break;
			case "/editdetail":
				connection.query("select * from news where id = " + params.id, function(err, data) {
					if(err) {
						throw err
					} else {
						var news = {};
						news.newlists = data;
						response.end(JSON.stringify(news));
					}
				})
				break;
			case "/edit":
				connection.query("update news set text='" + params.text + "',title='" + params.title + "' where id =" + params.id, function(err, data) {
					if(err) {
						throw err
					} else {
						var news = {};
						news.newlists = data;
						response.end(JSON.stringify(news));
					}
				})
				break;
		}

	}).listen(12345)
	//0~65536
console.log("开启服务器")
	//module.obj.skill()
	/*setInterval(function() {
		console.log(a);
		a++
	}, 1000)*/