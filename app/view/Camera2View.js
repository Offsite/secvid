Ext.define('secvid.view.Camera2View', {
    extend: 'Ext.Container',
    alias:  'widget.Camera2View',
    config: {
        layout: 'hbox',
        scrollable: 'false',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Camera 2 Information',
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
                html: 'Some information about the camera'
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