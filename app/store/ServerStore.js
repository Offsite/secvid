Ext.define("secvid.store.SeverStore", {
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