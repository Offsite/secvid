Ext.application({
    name: 'secvid',
    models:         ['deviceModel', 'userModel','ServerModel'],
    views:          ['LoginFormView','HomeView','SettingsView','ServerSettingsView', 'SupportView', 'Camera1View', 'Camera2View', 'HomeViewPlaceHolder'],
    stores:         ['deviceStore', 'userStore','ServerStore'],
    controllers:    ['MainController'],

    launch: function() {
        console.log('Application Launch');
        
        var loginView = {
            xtype: 'LoginFormView'
        };
        var homeView = {
            xtype: 'HomeView',
        };
        var SettingsView = {
            xtype: 'SettingsView'
        };
        var Camera1View = {
            xtype: 'Camera1View'
        };
        var Camera2View = {
            xtype: 'Camera2View'
        };
        
        
        Ext.Viewport.add([homeView, SettingsView, Camera1View, Camera2View]);
        //Ext.Viewport.add([SettingsView, Camera1View, Camera2View]);
    }
});