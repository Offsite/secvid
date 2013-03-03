//Change Password Function
changepassword: function()
    {
        var userdata = window.global.currentuser;
        var authpass = userdata.get('password');
        Ext.Msg.prompt('Change Password', "Enter the current password for user " + username + ".", function(button, passwordIn)        
        {
            if (button == "ok")
                {
                    if (passwordIn != authpass) //if credentials incorrect
                                {
                                    Ext.Msg.alert('Login Status', 'Password Incorrect', Ext.emptyFn);
                                    window.global.userLoggedOn = 0;
                                }    
                            else
                                //Password Correct
                                Ext.Msg.prompt('Change Password', "Enter new password", function(button, newPassword)    
                                {
                                    if (button == "ok")
                                    {
                                        authpass = newPassword;
                                        Ext.Msg.prompt('Confirm new Password', "Enter new password again", function(button, confPassword)
                                        {
                                            if (button == "ok")
                                            {
                                                if (confPassword == newPassword)
                                                {
                                                    userdata.set('password', newPassword);
                                                    Ext.Msg.alert('Password Changed', 'Your Password has been successfully changed', Ext.emptyFn);
                                                }
                                                else
                                                {
                                                    Ext.Msg.alert('Mismatch', 'Your confirmed password does not match your new password. Try Again', Ext.emptyFn);
                                                }
                                            }
                                        });
                                    }
                                });
                   
                       
                }
            
        });
    }


//Change Security Question function
changesecQ: function()
{
    var userdata = window.global.currentuser;
    var secQ = userdata.get('secQ');
    var secA = userdata.get('secA');
    Ext.Msg.prompt('Answer Current Security Question', secQ, function(button, answer)       
        {
            if (button == "ok")
                {
                        
                    //Compare
                    if (answer != secA)   //incorrect security answer
                    {
                        //display error message
                        Ext.Msg.alert('Login Status', 'Incorrect Answer', Ext.emptyFn);
                    }
                    else
                    {
                        Ext.Msg.prompt('New Security Question', 'Enter a new Security Question', function(button, question)
                        {
                            secQ = question;
                            Ext.Msg.prompt('New Security Answer', 'Enter the answer to your new Question:' + secQ, function(button, answer)
                            {
                                secA = answer;
                                Ext.Msg.confirm("Verify your Question and Answer", "Your Security Question is: " + secQ + 'and your Answer is: ' + userdata.get('secA') + ". Is this correct?", function(button)
                                {
                                    if (button == "yes")
                                    {
                                        userdata.set('secQ', secQ);
                                        userdata.set('secA', secA);
                                    }
                                    else
                                    {
                                        Ext.Msg.alert('Security Question', 'Security Question and Answer not changed', Ext.emptyFn);
                                    }
                                })
                            });
                        });
                    }
                        
                       
                }
            
        });
}




//Security
//revision  A
//Date:     1/2/2013
//Time:     3:35

//initialize to disable lockout and failed attempt counter
var lockout = 0;
var wrong = 0;


        /*//Load Stores (don't need to do this if they're set to autoload
        var deviceStore = Ext.getStore('deviceStore');
        deviceStore.load();
        
        var userStore = Ext.getStore('userStore');
        userStore.load();
        */

//Mobile Device Security Module

    
    //User Login
    //function login()
    login: function()
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
                //Load Authorized user data
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
                        //Load password from App Logic
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