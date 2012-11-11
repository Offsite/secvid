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
                    url: 'http://192.168.0.195:8080/video.mp4'
                }
            ]
        })
    }
});