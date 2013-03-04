Ext.define('secvid.view.HomeView', {
    extend: 'Ext.Container',
    alias:  'widget.HomeView',
    config: {
        layout: 'card',
        scrollable: 'false',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title:'..::Home View::..',
                items: [
                    {
                        align: 'right',
                        iconCls: 'settings',
                        iconMask: 'true',
                        itemId: 'settingsButton'
                    },
                    {
                        text: 'Support',
                        align: 'left',
                        itemId: 'supportButton'
                    },
                ]
            },
            {
                xtype: 'panel',
                style: 'background-color: #000000;',
                id: 'PlayerPanel',
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        text: 'Camera 1 Information',
                        itemId: 'camera1Button',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: 'Camera 2 Information',
                        itemId: 'camera2Button',
                    },
                ]
            },
        ],
        listeners: [
            {
                delegate: '#settingsButton',
                event: 'tap',
                fn: 'onSettingsButton'
            },
            {
                delegate: '#homeButton',
                event: 'tap',
                fn: 'onHomeButton'
            },
            {
                delegate: '#supportButton',
                event: 'tap',
                fn: 'onSupportButton'
            },
            {
                delegate: '#camera1Button',
                event: 'tap',
                fn: 'onCamera1Button'
            },
            {
                delegate: '#camera2Button',
                event: 'tap',
                fn: 'onCamera2Button'
            },
        ],
    },
    onCamera1Button: function()
    {
        console.log('onCamera1Button');
        this.fireEvent('startCamera1Command', this);
    },
    onCamera2Button: function()
    {
        console.log('onCamera2Button');
        this.fireEvent('startCamera2Command', this);
    },
    onSupportButton: function()
    {
        console.log('Support Button Pressed');
        this.fireEvent('startSupportCommand', this);
    },
    onSettingsButton: function() {
        console.log('Settings Button Pressed');
        this.fireEvent('startSettingsCommand', this);
    },
    onHomeButton: function() {
        console.log('Home Button Pressed');
        this.fireEvent('startHomeCommand', this);
    },
});