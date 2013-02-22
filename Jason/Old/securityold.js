//Security

//Mobile Device Security Module

    //Hardware ID
        //when app needs to connect to server, send server a request to connect
        //Receive request from server for Hardware ID
        //Retreive Hardware ID from App Logic ***********from Richard
        var HID = getHID;
        //Send ID to server
        //receive login access token from server

    //User Credentials
        //Create credentials for a new user
            //Admin user Login page
            //Receive Username and Password from Application Logic***********from richard
            var usercred = getcred(getsecdata);
            //Receive Security questions and answers from Application Logic************from richard
            var getsecdata;

        //User Login
        function login()
        {
            //Receive username and password from App Logic *********from richard
            var usercred = getcred;
            //Encrypt password
            //Send username and encrypted password to server
            //Receive status message(s) from server and pass them to App Logic **********to richard
            displaymessage(message);
            //Security Question
                //receive security question from Server and send to App Logic *********to richard
                displaysecQ(question);

                //receive answer from App Logic ************from richard
                var secA = getsecA;
                //encrypt answer
                //send encrypted answer to server
            //receive error message or access token from server
            //interpret access token and pass to application logic*************************to richard
            grantaccess(token);
            //Start Session timer
            
        }
    //Session Expiry
        //session timer starts when user logs in (user login script)
        //When timer reaches set number, warn the user the session is about to expire
        //(allow the user to go to login screen to restart the session immediately)
        //when timer reaches set number, log off
