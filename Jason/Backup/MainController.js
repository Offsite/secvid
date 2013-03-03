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
    },
    onSaveServerCommand: function()
    {
        console.log('onSaveServerCommand');
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
        console.log('activateHomeView');
        var HomeView = this.getHomeView();
        Ext.Viewport.animateActiveItem(HomeView, {type: 'reveal', direction: 'left'});
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
    activateHomeFromSettingsView: function()
    {
        console.log('activateHomeFromSettingsView');
        var HomeView = this.getHomeView();
        Ext.Viewport.animateActiveItem(HomeView, {type: 'reveal', direction: 'right'});
    },
    
    //----------------- Login + security stuff --------------------------
	
    //Functions Login needs
    getHID: function()//returns hardware ID
    {
        var HID = "01"; //TEMPORARY OVERRIDE  - SHOULD GET THE REAL HID
        return HID;
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
    
    
    //User Login
        login: function()
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
                    //If no user model for that user, error message
                    console.log(userdata);
                    console.log(index);
                    if (index == -1)
                    {
                        Ext.Msg.alert('Login Status', 'Username Incorrect', Ext.emptyFn);
                    }
                    else    if (username == userdata.get('username'))
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
                                            Ext.Msg.alert('Login Status', 'Password Incorrect', Ext.emptyFn);
                                            //return to login screen
                                            
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
                                                        var secA = Ext.Msg.prompt('Security Question', secQ, function(text, answer)
                                                        {
                                                            
                                                        //Read security answer from user model
                                                        var authsecA = userdata.get('secA');
                                                        //Compare
                                                        if (answer != authsecA)   //incorrect security answer
                                                            {
                                                            //return to login screen
                                                            //display error message
                                                            Ext.Msg.alert('Login Status', 'Incorrect Answer', Ext.emptyFn);
                                                            }
                                                        else
                                                            {
                                                            
                                                            //Start Session Timer
                                                            //this.HomeView.destroy can close the homeview
                                                            //Alert App that Login is successful
                                                            this.HomeView = Ext.Viewport.add({
                                                                xtype: 'HomeView'
                                                                });
                                                            //Display status message to App Logic
                                                            Ext.Msg.alert('Login Status', 'Login Successful', Ext.emptyFn);
                                                            
                                                            } 
                                                            
                                                            
                                                            
                                                            
                                                        });
                                                        
                                                        
                                                    }
                                                    );
                                            }
                                }
                            else
                                {
                                Ext.Msg.alert('Login Status', 'Username Incorrect', Ext.emptyFn);
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

    
        console.log('launch MainController');
	},
	init: function()
	{
		this.callParent(arguments);
        window.localStorage.clear('all');
		console.log('initialize MainController');
	}
});