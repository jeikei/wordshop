Wordshop.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/index'],
	tagName: 'div',
	className: 'no-sidebar',
	initialize: function(){
		this.listenTo(this.collection, 'sync sort', this.render);		
	},
	render: function(){
		var content = this.template({texts: this.collection});
		this.$el.html(content);
		return this;
	},
	events: {
		'click button#sort-texts-index-crits':'sortIndexCrits',
		'click button#sort-texts-index-title':'sortIndexTitle',
		'click button#sort-texts-index-author':'sortIndexAuthor',
		'click button#sort-texts-index-id':'sortIndexId',
		
	},
	
	sortIndexCrits: function(){
		if($('button#sort-texts-index-crits').data('sort-method') === 'desc'){
			this.collection.comparator = function(text){
				return -text.critiques().length;
			};
			this.collection.sort();
			$('button#sort-texts-index-crits').data('sort-method', 'asc');
		} else {
			this.collection.comparator = function(text){
				return text.critiques().length;
			};
			this.collection.sort();
			$('button#sort-texts-index-crits').data('sort-method', 'desc');
			
		}
	},
	
	sortIndexTitle: function(){
		if($('button#sort-texts-index-title').data('sort-method') === 'desc'){
			this.collection.comparator = function(text){
				//thanks to andrew-de-andrade on stackoverflow:
				var str = text.get('title');
				  str = str.toLowerCase();
				  str = str.split("");
				  str = _.map(str, function(letter) { 
				    return String.fromCharCode(-(letter.charCodeAt(0)));
				  });
				  return str;
			};
			this.collection.sort();
			$('button#sort-texts-index-title').data('sort-method', 'asc');
		} else {
			this.collection.comparator = function(text){
				return text.get('title');
			};
			this.collection.sort();
			$('button#sort-texts-index-title').data('sort-method', 'desc');
			
		}
	},
	
	sortIndexAuthor: function(){
		if($('button#sort-texts-index-author').data('sort-method') === 'desc'){
			this.collection.comparator = function(text){
				//thanks to andrew-de-andrade on stackoverflow:
				var str = text.user().get('username');
				  str = str.toLowerCase();
				  str = str.split("");
				  str = _.map(str, function(letter) { 
				    return String.fromCharCode(-(letter.charCodeAt(0)));
				  });
				  return str;
			};
			this.collection.sort();
			$('button#sort-texts-index-author').data('sort-method', 'asc');
		} else {
			this.collection.comparator = function(text){
				return text.user().get('username');
			};
			this.collection.sort();
			$('button#sort-texts-index-author').data('sort-method', 'desc');
			
		}
	},
	
	sortIndexId: function(){
		if($('button#sort-texts-index-id').data('sort-method') === 'desc'){
			this.collection.comparator = function(text){
				return -text.id;
			};
			this.collection.sort();
			$('button#sort-texts-index-id').data('sort-method', 'asc');
		} else {
			this.collection.comparator = function(text){
				return text.id;
			};
			this.collection.sort();
			$('button#sort-texts-index-id').data('sort-method', 'desc');			
		}
	}

	
});
