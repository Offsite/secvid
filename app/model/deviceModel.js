Ext.define('secvid.model.deviceModel', {
    extend: 'Ext.data.Model',
    
    config:
    {
        fields: [{name: 'HID', type: 'string'}],
        
        proxy: {
            type: 'rest',
            url: './app/data/hid.json',
            
        }
    }
    
});