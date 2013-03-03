Ext.define("secvid.store.deviceStore", {
    extend: "Ext.data.Store",
    config:
    {
        model: 'secvid.model.deviceModel',
		//storeId: 'deviceStore',
		autoLoad: true,
        /*proxy:
        {
            type: 'ajax',
            url: 'app/data/taskcodes.json'
        }
        */
        
    }
});

