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


Ext.define("secvid.store.userStore", {
    extend: "Ext.data.Store",
    config:
    {
        model: 'secvid.model.userModel',
		//storeId: 'userStore',
		autoLoad: true,
        /*proxy:
        {
            type: 'ajax',
            url: 'app/data/taskcodes.json'
        }
        */
    }
});