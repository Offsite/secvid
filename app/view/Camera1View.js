Ext.define('secvid.view.Camera1View', {
    extend: 'Ext.Container',
    alias:  'widget.Camera1View',
    config: {
        layout: 'hbox',
        scrollable: 'false',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Camera 1 Information',
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
                xtype: 'panel',
                flex: 1,
                styleHtmlContent: true,
                html: 'Some information about Camera 1'
            },
        ],
        listeners: [
            {
                delegate: '#homeButton',
                event: 'tap',
                fn: 'onHomeButton'
            },
        ],
    },
    onHomeButton: function() {
        console.log('Home Button Pressed');
        this.fireEvent('startHomeCommand', this);
    },
});