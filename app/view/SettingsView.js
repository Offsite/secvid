Ext.define('secvid.view.SettingsView', {
    
    extend: 'Ext.Container',
    alias:  'widget.SettingsView',
    config: {
        layout: 'hbox',
        scrollable: false,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title:'..::Settings::..',
                items: [
                    {
                        iconCls: 'home',
                        iconMask: 'true',
                        align: 'right',
                        itemId: 'homeButton'
                    },
                ]
            },
            {
                xtype: 'LoginFormView',
                flex: 1,
                
            },
            {
                xtype: 'ServerSettingsView',
                flex: 1,
            },
        ],
        listeners: 
        [
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButton'
            },
            {
                delegate: '#homeButton',
                event: 'tap',
                fn: 'onHomeButton'
            },
        ]
    },
    onBackButton: function() {
        console.log('Back Button Pressed');
    },
    onHomeButton: function() {
        console.log('Home Button Pressed');
        this.fireEvent('startHomeFromSettingsCommand', this);
    },
    onSettingsButton: function() {
        console.log('Settings Button Pressed');
        this.fireEvent('startSettingsCommand', this);
    },
});