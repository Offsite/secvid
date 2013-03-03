Ext.define('secvid.view.LoginFormView', {
    
    extend: 'Ext.form.Panel',
    requires:   'Ext.form.FieldSet',
    alias:  'widget.LoginFormView',
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
                        text:   'Login',
                        ui:     'confirm',
                        iconMask: true,
                        itemId: 'loginButton'
                    }
                ]
            },
            {
                xtype:  'fieldset',
                docked: 'left',
                title:  'Change Login',
                instructions:   'Enter your user name and password.',
                //id: 'loginData',
                items: 
                [
                    {
                        xtype:  'textfield',
                        name:   'userName',
                        placeHolder:    'Your username goes here',
                        label:  'User Name'
                    },
                    {
                        xtype: 'passwordfield',
                        name:   'passwordLogin',
                        placeHolder: 'Enter your Password or else...',
                        label:  'Password'
                    }
                ],
            }
        ],
        listeners: 
        [
            {
                delegate: '#loginButton',
                event: 'tap',
                fn: 'onLoginButton'
            }
        ]
    },
    onLoginButton: function() {
        console.log('Login Button Pressed');
        this.fireEvent('loginCommand', this);
    }
});