/*
Revisions:
Mar 2, 2013 - Jason -   Added changesecQ function - Currently activated by clicking "cancel" from Security Question Window****need to change to a button on login
                        Added changepassword function - Currently activated by clicking "cancel" from Sec Q Window AND "cancel again from "enter current sec Q" window
                                                        Password Strength Checker needs to be added
                                                        Text fields need to be changed to Password fields
                        Login will not occur unless Server settings Save button is pressed ****need to change to when server settings are correct****

*/



Ext.define("secvid.controller.MainController", {
    extend: "Ext.app.Controller",
	config:
	{
		refs:
		{
			HomeView: "HomeView",
            LoginFormView: 'LoginFormView',
			SettingsView: 'SettingsView',
            ServerSettingsView: 'ServerSettingsView',
            SupportView: 'SupportView',
            Camera1View: 'Camera1View',
            Camera2View: 'Camera2View',
		},
		control:
		{
			HomeView:
			{
                startHomeCommand: 'onStartHomeCommand',
                startSettingsCommand: 'onStartSettingsCommand',
                startSupportCommand: 'onStartSupportCommand',
                startCamera1Command: 'onCamera1Command',
                startCamera2Command: 'onCamera2Command',
			},
            LoginFormView:
            {
                startHomeCommand: 'onStartHomeCommand',
                startSettingsCommand: 'onStartSettingsCommand',
            },
            SettingsView:
            {
                startHomeFromSettingsCommand: 'onStartHomeFromSettingsCommand',
                startSettingsCommand: 'onStartSettingsCommand',
            },
            LoginFormView:
            {
                loginCommand: 'onLoginCommand',
            },
            ServerSettingsView:
            {
                saveServerCommand: 'onSaveServerCommand',
            },
            SupportView:
            {
                supportDoneCommand: 'onSupportDoneCommand',
            },
            Camera1View:
            {
                startHomeCommand: 'onStartHomeCommand',
            },
            Camera2View:
            {
                startHomeCommand: 'onStartHomeCommand',
            }
		}
	},
    
    //---------------- Button Press Events -------------------------
    
    onCamera1Command: function()
    {
        console.log('onCamera1Command');
        this.activateCamera1View();
    },
    onCamera2Command: function()
    {
        console.log('onCamera2Command');
        this.activateCamera2View();
    },
    onSupportDoneCommand: function()
    {
        console.log('onSupportDoneCommand');
        this.SupportView.destroy();
    },
    onLoginCommand: function()
    {
        console.log('onLoginCommand');
        this.login();
        /*if(!window.global.userLoggedOn) // Not functioning properly... need userLoggedOn as a store value
        {
            var HomeView = this.getHomeView();
            HomeView.destroy();
            console.log('Home View Destroyed');
        }*/
    },
    onSaveServerCommand: function()
    {
        console.log('onSaveServerCommand');
        var ServerStore = Ext.getStore('ServerStore');
        var newValues = this.getServerSettings();
        ServerStore.add(newValues);
        ServerStore.sync();
        window.global.settingsSaved = 1;  //*********************temporary. In the future, should only be set if settings are correctly saved.**************
        console.log(newValues.serverAddress);
        console.log(newValues.portNumber);
        console.log("settingsSaved is " + window.global.settingsSaved);
    },
    onStartHomeCommand: function()
    {
        
        this.activateHomeView();
    },
    onStartHomeFromSettingsCommand: function()
    {
        this.activateHomeFromSettingsView();
    },
    onStartLoginFormCommand: function()
    {
        this.activateLoginFormView();
    },
    onStartSettingsCommand: function()
    {
        this.activateSettingsView();
    },
    onStartSupportCommand: function()
    {
        this.activateSupportView();
    },
    
    //------------------ activate views -------------------------------------
    
    activateCamera1View: function()
    {
        console.log('activateCamera1View');
        var Camera1View = this.getCamera1View();
        Ext.Viewport.animateActiveItem(Camera1View, {type: 'cover', direction: 'right'});
    },
    activateCamera2View: function()
    {
        console.log('activateCamera2View');
        var Camera2View = this.getCamera2View();
        Ext.Viewport.animateActiveItem(Camera2View, {type: 'cover', direction: 'right'});
    },
    activateSupportView: function()
    {
        if (this.SupportView) {
            this.SupportView.destroy();
        }
        this.SupportView = Ext.Viewport.add({
            xtype: 'SupportView'
        });
        this.SupportView.show();
    },
    activateHomeView: function()
    {
        console.log("now userLoggedOn is" + window.global.userLoggedOn);
        if (window.global.userLoggedOn)
        {
            console.log('activateHomeView');
            var HomeView = this.getHomeView();
            HomeView.setHtml('<iframe style="position:fixed;height:100%;width:100%" src="./jwplayer.html" scrolling="false"></iframe>');
            Ext.Viewport.animateActiveItem(HomeView, {type: 'reveal', direction: 'left'});
        }
        else
        {
            Ext.Msg.alert('User Not Logged In', 'Please Login', Ext.emptyFn);
        }
    },
    activateHomeFromSettingsView: function()
    {
        console.log("now userLoggedOn is" + window.global.userLoggedOn);
        if (window.global.userLoggedOn)
        {
            console.log('activateHomeFromSettingsView');
            var HomeView = this.getHomeView();
            HomeView.setHtml('<iframe style="position:fixed;height:100%;width:100%" src="./jwplayer.html" scrolling="false"></iframe>');
            Ext.Viewport.animateActiveItem(HomeView, {type: 'reveal', direction: 'right'});
        }
        else
        {
            Ext.Msg.alert('User Not Logged In', 'Please Login', Ext.emptyFn);
        }
    },
    activateLoginFormView: function()
    {
        console.log('activateLoginFormView');
        var LoginFormView = this.getLoginFormView();
        Ext.Viewport.animateActiveItem(LoginFormView, {type: 'cover', direction: 'right'});
    },
    activateSettingsView: function()
    {
        console.log('activateSettingsView');
        var SettingsView = this.getSettingsView();
        Ext.Viewport.animateActiveItem(SettingsView, {type: 'cover', direction: 'left'})
    },
    
    //----------------- Login + security stuff --------------------------
	
    //Functions Login needs
    getHID: function()//returns hardware ID
    {
        var HID = "01"; //TEMPORARY OVERRIDE  - SHOULD GET THE REAL HID
        return HID;
    },
    getServerSettings: function()
    {
        var ServerSettingsView = this.getServerSettingsView();
        var newvalues = ServerSettingsView.getValues();
        console.log("The IP Address is " + newvalues.ipAddress);
        return newvalues;
    },
    getusername: function()
    {
        var LoginFormView = this.getLoginFormView();
        var newvalues = LoginFormView.getValues();
        console.log("The username is " + newvalues.userName);
        return newvalues.userName;
    },
    getpassword: function()
    {
        var LoginView = this.getLoginFormView();
        var newvalues = LoginView.getValues();
        console.log("The password is " + newvalues.passwordLogin);
        return newvalues.passwordLogin;
    },
    
    changesecQ: function()
    {
        var userdata = window.global.currentUser;
        console.log(userdata);
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
                                Ext.Msg.prompt('New Security Answer', 'Enter the answer to your new Question: ' + secQ, function(button, answer)
                                {
                                    secA = answer;
                                    Ext.Msg.confirm("Verify your Question and Answer", "Your Security Question is:<br>" + secQ + '<br>Your Answer is:<br>' + secA + "<br>Is this correct?", function(button)
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
                                    });
                                });
                            });
                        }
                            
                           
                    }
                    else
                    {
                        this.changepassword();
                    }
                
            },
            this
            );
    },   //end changesecQ function
    
    changepassword: function()
    {
        var userdata = window.global.currentUser;
        var authpass = userdata.get('password');
        
        Ext.Msg.prompt('Change Password', "Enter the current password for user " + userdata.get('username') + ".", function(button, passwordIn)        
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
    },  //end changepassword function
    
    
    login: function()
    {
        
        console.log("settingsSaved is now" + window.global.settingsSaved);
        if (!window.global.settingsSaved)
            {
                Ext.Msg.alert('Server Settings Not Saved', 'Please save Server Settings before logging in', Ext.emptyFn);
            }
        else
        {
            //Validate device
            //Retrieve Hardware ID from the device
                var HID = this.getHID();
                console.log('here is the HID' + HID);
                
                var deviceStore = Ext.getStore('deviceStore');
                var userStore = Ext.getStore('userStore');
                
                
                var index = deviceStore.find('HID', HID);   //find the index of the entry with this HID
                //Check if the HID was found
                if (index == -1) Ext.Msg.alert('Login Status', 'Mobile Device Not Authorized', Ext.emptyFn);
                else
                //User Login
                {
            //Load Authorized user data from server
            //Username
                //Receive username from App Logic
                var username = this.getusername();
                console.log(" the username is now " + username);
                //Load the User Model associated with given username
                index = userStore.find('username', username);   //find the index of the entry with this username
                var userdata = userStore.getAt(index);  //temporarily load the user's data
                window.global.currentUser = userdata;   //make the current user's data available globally
                //If no user model for that user, error message
                console.log(userdata);
                console.log('window.global.currentUser is ' + window.global.currentUser);
                console.log(index);
                if (index == -1)
                    {
                        console.log("the homeview should get destroyed");
                        Ext.Msg.alert('Login Status', 'User Credentials Incorrect', Ext.emptyFn);
                        /*if (this.HomeView)
                            {
                            console.log("homeview destroyed");
                            this.HomeView.destroy();
                            }
                        */
                        window.global.userLoggedOn = 0;
                        console.log("userLoggedOn is" + window.global.userLoggedOn);
                    }
                else        
                    {    
                    if (username != userdata.get('username'))
                        {
                            console.log("the homeview should get destroyed");
                            Ext.Msg.alert('Login Status', 'User Credentials Incorrect', Ext.emptyFn);
                            /*if (this.HomeView)
                                {
                                console.log("homeview destroyed");
                                this.HomeView.destroy();
                                }
                            */
                            window.global.userLoggedOn = 0;
                            console.log("userLoggedOn is" + window.global.userLoggedOn);
                        }
                    else
                        //Password
                        {
                            //Receive password from App Logic
                            var password = this.getpassword();
                            console.log(" the password is now " + password);
                            //Load the correct password
                            var authpass = userdata.get('password');
                            //Compare password with that stored in user model
                            if (password != authpass) //if credentials incorrect
                                {
                                    Ext.Msg.alert('Login Status', 'User Credentials Incorrect', Ext.emptyFn);
                                    window.global.userLoggedOn = 0;
                                    console.log('password wrong, userLoggedOn is ' + window.global.userLoggedOn);
                                    
                                }    
                            else
                                //Password Correct
                                    {
                                        //Display status message to App Logic
                                        Ext.Msg.alert('Login Status', 'User Credentials Correct', function()
                                        {
                                            //if credentials correct, continue to security question
                                            //Security Questions
                                                //Read security question from user model
                                                var secQ = userdata.get('secQ');
                                                //Ask security question and receive answer
                                                Ext.Msg.prompt('Security Question', secQ, function(button, answer)
                                                {
                                                    if (button == "ok")
                                                        {
                                                                
                                                            //Read security answer from user model
                                                            var authsecA = userdata.get('secA');
                                                            //Compare
                                                            if (answer != authsecA)   //incorrect security answer
                                                                {
                                                                window.global.userLoggedOn = 0;
                                                                
                                                                //display error message
                                                                Ext.Msg.alert('Login Status', 'Incorrect Answer', Ext.emptyFn);
                                                                }
                                                            else
                                                                {
                                                                
                                                                //Start Session Timer
                                                                //Alert App that Login is successful
                                                                window.global.userLoggedOn = 1;
                                                                this.HomeView = Ext.Viewport.add({
                                                                    xtype: 'HomeView'
                                                                    });
                                                                //Display status message to App Logic
                                                                Ext.Msg.alert('Login Status', 'Login Successful', Ext.emptyFn);
                                                                } 
                                                        }
                                                    else
                                                        {
                                                            window.global.userLoggedOn = 0;
                                                            this.changesecQ();
                                                        }
                                                },
                                                this    //set the prompt's scope to the scope of the controller
                                                );
                                                
                                        },
                                        this    //set scope of the alert to the scope of the controller
                                        );
                                    }
                        }
                    }
            }
        }
    },
   
      
    //----------------- launch functions --------------------------
    launch: function()
	{
		this.callParent(arguments);
		
        var deviceStore = Ext.getStore('deviceStore');
        deviceStore.load();
        var userStore = Ext.getStore('userStore');
        userStore.load();
        
        //Global Variables
        window.global = 
            {
                userLoggedOn: 0,
                settingsSaved: 0,
                currentUser: 0
            };
            
        this.activateSettingsView();
    
        console.log('launch MainController');
	},
    init: function()
	{
		this.callParent(arguments);
        window.localStorage.clear('all');
		console.log('initialize MainController');
	}
});