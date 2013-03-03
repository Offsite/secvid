Ext.define("secvid.store.ServerStore", {
    extend: "Ext.data.Store",
    config:
    {
        model: 'secvid.model.ServerModel',
        storeId: 'taskcodeLocalStore',
        proxy:
        {
            type: 'localstorage',
            id: 'ServerStoreLocal'
        }
    }
});