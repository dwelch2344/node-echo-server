var express = require('express')
   , app = express()
   , port = process.env.PORT || 3000

   , HEADER = '======================================'

   , moment = require('moment')
   , uuid = require('node-uuid')
   ;


app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

/*
{ path: '/**',
  method: 'get',
  callbacks: [ [Function] ],
  keys: [],
  regexp: /^\/(.*)(.*)\/?$/i,
  params: [ 'favicon.ico', '' ] 
}
*/
var handler = function(req, res, next){
	if( 'favicon.ico' == req.route.params[0] ){
		return res.send(404);
	}

	var id = uuid.v4();

	var files = [];
	for(var i in req.files){
		files.push({
		 	field: req.files[i].fieldName,
			filename: req.files[i].name,
			type: req.files[i].type,
			size: req.files[i].size
		});
	}

	console.log(HEADER);
	console.log(id);
	console.log(moment().format());
	console.log(req.method, "-", req.route.params[0], "\n");
	console.log("Query:", req.query);
	console.log("Params:", req.params);
	console.log("Body:", req.body);
	console.log("Files:", files);
	console.log("Headers:", req.headers);
	console.log(HEADER, "\n\n\n");

	res.send(200, "OK " + id);
};

app.get("/**", handler);
app.post("/**", handler);


app.listen(port);
console.log('Listening on port', port);