Wordshop.Views.CommentNew = Backbone.View.extend({

  template: JST['comments/new'],
	initialize: function(options){
		this.text = options.text;
	},
	render: function(){
		var content = this.template({
			text: this.text
		});
		this.$el.html(content);
		return this;
	},
	
	events: {
		'submit form#comment-submit':'submit',
		'click button#cancel-button': 'removeForm'
	},
	
	submit: function(event){
		event.preventDefault();
		var params = $(event.target).serializeJSON();
		if(!params.content){
			bootbox.alert('Cannot submit an empty comment.');
			return;
		}
		params.username = window.currentUser.username;
		var comment = new Wordshop.Models.Comment(params);
		var that = this;
		comment.save({},{
			success: function(){
				that.text.comments().add(comment);
				that.remove();
				$('button#comment-button').css("visibility", "visible");
			}
		});
		
	},
	
	removeForm: function(event){
		event.preventDefault();
		$('button#comment-button').css("visibility", "visible");
		this.remove();
		
	}

});
