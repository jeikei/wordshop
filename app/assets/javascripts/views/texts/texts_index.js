Wordshop.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/index'],
	tagName: 'div',
	className: 'no-sidebar',
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render);		
	},
	render: function(){
		var content = this.template({texts: this.collection});
		this.$el.html(content);
		return this;
	},
	events: {
		'click button#sort-text-index':'sortIndex'
	}
	
});
