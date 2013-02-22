Ext.define('secvid.view.HomeViewPlaceHolder', {
    extend: 'Ext.Container',
    alias:  'widget.HomeViewPlaceHolder',
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
                    },
                    {
                        text: 'Support',
                        align: 'left',
                    },
                ]
            },
            {
                xtype: 'panel',
                layout: 'card',
                items: [
                    {
                        xtype: 'panel',
                        style: 'background-color: #000000;',
                    },
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        text: 'Zoom Camera 1',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: 'Zoom Camera 2',
                    },
                ]
            },
        ],
    },
});