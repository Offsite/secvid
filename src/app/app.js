Ext.application({
    name: 'secvid',
    
    launch: function() {
        Ext.create("Ext.Panel", {
            fullscreen: true,
            items: [
                {
                    xtype   : 'titlebar',
                    docked  : 'top',
                    title   : 'Monitor Matrix'
                },
                {
                    xtype: 'video',
                    url: './video/stream.mp4'
                }
            ]
        })
    }
});