Ext.define('secvid.view.videoPanel', {
    extend: 'Ext.Panel',
    alias:  'widget.videoPanel',
    config: {
        layout: 'fit',
        scrollable: false,
        html: [
          //'<div style="overflow:scroll;-webkit-overflow-scrolling:touch;"><iframe style="width:100%;height:100%;" src="./jwplayer.html" scrolling="false"></iframe></div>'
            '<div id="player_7963" style="overflow:scroll;-webkit-overflow-scrolling:touch;"></div>'
        ]
    }
});