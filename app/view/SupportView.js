Ext.define('secvid.view.SupportView', {
    extend: 'Ext.Panel',
	alias: 'widget.SupportView',
	config: 
	{
		layout: 'fit',
		modal: true,
		centered: true,
		width: 350,
		height: 105,
		scrollable: false,
		showAnimation: 
		{
			type: 'popIn',
			duration: 250,
			easing: 'easy-out'
		},
			hideAnimation: 
		{
			type: 'popOut',
			duration: 250,
			easing: 'ease-out'
		},
		items: 
		[
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Support Information',
				items: 
				[
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						ui: 'confirm',
						text: 'Done',
						itemId: 'supportDoneButton'
					}
				]
			},
			{
				xtype: 'panel',
                items: [
                    {
                        styleHtmlContent: true,
                        html: 'Email: place.holder@email.com'
                    }    
                ]
			}
		],
		listeners: 
		[
			{
				delegate: '#supportDoneButton',
				event: 'tap',
				fn: 'onSupportDoneButton'
			},
            {
                
            },
		]
	},
	onSupportDoneButton: function()
	{
		console.log('supportDoneCommand');
		this.fireEvent('supportDoneCommand', this);
	},
});