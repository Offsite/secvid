Ext.define('secvid.view.ServerSettingsView', {
    
    extend: 'Ext.form.Panel',
    requires:   'Ext.form.FieldSet',
    alias:  'widget.ServerSettingsView',
    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype:  'spacer'
                    },
                    {
                        xtype:  'button',
                        text:   'Save',
                        ui:     'confirm',
                        iconMask: true,
                        itemId: 'saveServerButton'
                    }
                ]
            },
            /*{
                xtype:  'titlebar',
                docked: 'top',
                title:'Server Settings'
            },*/
            {
                xtype:  'fieldset',
                minHeight: '50%',
                title:  "Server Address",
                instructions:   "Enter the Server's IP Address and Port",
                id: 'serverData',
                items: 
                [
                    {
                        xtype:  'textfield',
                        name:   'serverAddress',
                        placeHolder:    '192.168.xxx.xxx',
                        label:  'Address'
                    },
                    {
                        xtype: 'textfield',
                        name:   'portNumber',
                        label:  'Port'
                    }
                ],
            }
        ],
        listeners: 
        [
            {
                delegate: '#saveServerButton',
                event: 'tap',
                fn: 'onSaveServerButton'
            },
            {
                delegate: '#saveServerButton',
                event: 'tap',
                fn: 'onSaveServerButton'
            }
        ]
    },
    onSaveServerButton: function() {
        console.log('Save Server Button Pressed');
        this.fireEvent('saveServerCommand', this);
    }
});