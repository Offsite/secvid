//Security
//revision  A
//Date:     1/2/2013
//Time:     3:35

//initialize to disable lockout and failed attempt counter
var lockout = 0;
var wrong = 0;

//Mobile Device Security Module


    //User Login
    function login()
        {
        //Validate device
        //Retrieve Hardware ID from the device
            var HID = getHID();
            //Load Authorized Hardware ID list from server  //Decryption too?
            var index = deviceStore.find('HID', HID);   //find the index of the entry with this HID
            //Check if the HID was found
            if (index == -1) displaymessage("Mobile Device not Authorized");    //HID not found
            else
            //User Login
                {
                //Load Authorized user data from server //Decrypt too?
                //Username
                    //Receive username from App Logic
                    var username = getusername();
                    //Load the User Model associated with given username
                    index = userStore.find('username', username);   //find the index of the entry with this username
                    var userdata = userStore.getAt(index);  //temporarily load the user's data
                    //If no user model for that user, error message
                    if (index = -1) displaymessage("username incorrect");
                    else
                    //Password
                    {
                        //Receive password from App Logic
                        var password = getpassword();
                        //Load the correct password
                        var authpass = userdata.get('password');
                        //Compare password with that stored in user model
                        if (password != authpass) //if credentials incorrect (or security questions answer incorrect)
                            {
                                displaymessage ("password incorrect");//error message
                                //increment "wrong" (counter for failed attempts) (resets when any user successfully logs in)************
                                //if too many failed attempts, set lockout (lockout until specific time/date 1 hour later) ********
                            }    
                        else
                            //if username has lockout: error message, deny access
                            /*
                            if lockout displaymessage("Too many failed attempts. Locked out for one hour");*******    
                            else
                            */
                                //if password is older than 3 months: error message, go to password change (add early warning?)******
                                //if currentdate > userdata.get(expiry)
                                
                                //Password Correct
                                {
                                    //Display status message to App Logic
                                    displaymessage("User Credentials Correct");
                                    
                                    //if credentials correct, continue to security question
                                    //Security Questions
                                        //Read security question from user model
                                        var secQ = userdata.get('secQ');
                                        //Display security question to App Logic
                                        displaysecQ(secQ);
                                        //Receive security answer from App Logic
                                        var secA = getsecA();
                                        //Read security answer from user model
                                        var authsecA = userdata.get('secA');
                                        //Compare
                                        if (secA != authsecA)   //incorrect security answer
                                            {
                                            //return to login screen
                                            //display error message
                                            displaymessage("Incorrect Answer");
                                            }
                                        else
                                            {
                                            //Display status message to App Logic
                                            displaymessage("Welcome" + username);
                                            //Start Session Timer
                                            //Give App logic information to access the video
                                            }
                                }
                    }
                }
        }  
        
     
    //Create credentials for a new user
    /*
    function newuser()
        {
        //Receive Username and Password from Application Logic***********
        var usercred = getcred();
        //if a user model exists for that username, error message
            //else create new user model
            //Check password strength
                //check length (at least 8 characters)
                //check for both upper and lower case letters
                //check for both letters and numbers
                //check if the password is in the system's dictionary (including words/numbers related to the company and users
                //if password too weak, send error message to mobile device
            //store password in the user model
            //calculate password expiry date and store in database
        //Receive Security questions and answers from Application Logic************
        var secdata = getsecdata;
        //store security questions and answers in the user model
        //display success message
        
        }
        */

    //Session Expiry
        //session timer starts when user logs in (user login script)
        //When timer reaches set number, warn the user the session is about to expire
        //(allow the user to go to login screen to restart the session immediately)
        //when timer reaches set number, log off
        
    //Change password
    
    
    


//Sample for New User Creation
/*
// now lets try to create a new user with as many validation errors as we can
var newUser = Ext.create('User', {
    username: 'admin',
    password: 'twenty-nine',
    pass_expiry: '17/2/2013'
});
/*