var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.Pushtrigger = functions.database.ref('/tasks/{taskId}').onCreate((event) => {
	// var taskData = event.data.val();
	// var taskStateChanged = false;
	// var taskCreated = false;
	// if (!event.data.previous.exists()) {
	// 	taskCreated = true;
	// }

	// if (!taskCreated && event.data.changed()) {
	// 	taskStateChanged = true;
	// }

	    var msg = 'Anyone has added new task. Please check your list. Thankyou';
		// if (taskCreated) {
		// 	msg = 'The following new task was added to the list: ' + taskData.name;
		// }


		 var tokens = [];
		 var dbRef = admin.database().ref('/tokens');
		        dbRef.once('value', (snap) => {
		        	var tokens = [];
		            var data = snap.val();
		            for (var property in data) {
		                tokens.push(data[property]);
		            }

		 			var tucks = [];	
			        for (var took of tokens) {
			            tucks.push(took.pushtoken);
			        }
				        var payload = {
				            notification: {
				                title: 'Tasker Assignment Notification',
				                body: msg,
				                sound: 'default',
				                badge: '1'
				            }
				        };
				        return admin.messaging().sendToDevice(tucks, payload);
		        }, (err) => {
			            reject(err);
			        });

        // var payload = {
            
        //         "notification":{
        //             "title":"Notofocation form Tasker",
        //             "body":msg,
        //             "sound":"default",
        //             "badge": '1'
        //             },
        //         "data":{
        //             "sendername":"Zill-e-Abbas",
        //             "message":"Yes done it"
        //         }
        // }

        // var tokens = ['dyIx-2qxxfk:APA91bFrMJ0XchtLZmOeGvh1zWyxJG6gg8tLf1kgGhgfM9sHnU-rVdM-qFR6gByi3xkbwMZoPNc-XRm2QPbHzGjlUa65_VbAvEWtKPN-D2xd-0BXInmgQ6Zq5Mq7BmM6LoSd7Qycd88MkIddU7J4hMLg1HNhFvM07A']      
        //   return admin.messaging().sendToDevice(tokens, payload);
})








