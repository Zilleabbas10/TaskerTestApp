var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.Pushtrigger = functions.database.ref('/task-list/').onCreate((event) => {
        
        var payload = {
            
                "notification":{
                    "title":"Notofocation form Tasker",
                    "body":"New notification created",
                    "sound":"default",
                    },
                "data":{
                    "sendername":"Zill-e-Abbas",
                    "message":"Yes done it"
                }
        }      
            admin.messaging().sendToDevice('e6331a1336f8f499', payload);
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });






