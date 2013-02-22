Ext.define("secvid.controller.MainController", {
    extend: "Ext.app.Controller",
	config:
	{
		refs:
		{
			HomeView: "HomeView",
            LoginFormView: 'LoginFormView',
			SettingsView: 'SettingsView',
            LoginFormView: 'LoginFormView',
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
	launch: function()
	{
		this.callParent(arguments);
		console.log('launch MainController');
	},
	init: function()
	{
		this.callParent(arguments);
        window.localStorage.clear('all');
		console.log('initialize MainController');
	}
});