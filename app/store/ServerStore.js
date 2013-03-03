Ext.define("secvid.store.ServerStore", {
    extend: "Ext.data.Store",
    config:
    {
        model: 'secvid.model.ServerModel',
        storeId: 'ServerStore',
        proxy:
        {
            type: 'localstorage',
            id: 'ServerStoreLocal'
        }
    }
});