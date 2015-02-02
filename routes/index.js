module.exports = function(app, io){

	var messages =[ ];			
	app.get('/', function(req, res) {
  	res.render('index', {title: 'Group Chat'});
	});

	io.sockets.on('connection', function (socket){

		console.log('connection made')

		socket.on('user_joined', function (data){
			//user = {name: data.name, id: socket.id}
			// from server to ONE client, give all users
			//users[socket.id] = user;
			messages.push({name:data.name, message: 'Joined the chat'})
			socket.emit('current_users', messages);
			// this will broadcast to the CURRENT USERS that a new user had joined!!
			socket.broadcast.emit('new_user', messages[messages.length - 1])
			// add a new object into our users object
			
		})

		socket.on('message', function(msg){
			//users[socket.id] = {name: msg.name, id: socket.id, message: msg.user_, timestamp:time }
			messages.push({name:msg.name, message: msg.user_message})

			socket.broadcast.emit('new_message',msg )	
		})

		socket.on('disconnect',function (data){
			socket.broadcast.emit('user_left', {name: data.name, messsage:'left the chat'});
			
			messages=[];
		})
	})

}

/* GET home page. */



