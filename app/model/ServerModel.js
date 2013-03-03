Ext.define('secvid.model.ServerModel', {
    extend: 'Ext.data.Model',
	
	config: 
	{
        identifier: 'uuid',
		fields: 
		[
			{name: 'serverAddress', type: 'string'},
			{name: 'portNumber', type: 'string'},
		],
	}
});