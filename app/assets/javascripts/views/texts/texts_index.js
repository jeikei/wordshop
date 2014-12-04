Wordshop.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/index'],
	tagName: 'div',
	className: 'no-sidebar',
	initialize: function(){
		this.filteredTexts = this.filteredTexts || new Wordshop.Collections.Texts();
		
		this.listenTo(this.collection, 'sync sort', this.render);	
		this.listenTo(this.filteredTexts, 'sync sort', this.renderFilteredTexts);
		
	},
	
	render: function(){
		
		var content = this.template({
			texts: this.collection		
		});
		this.$el.html(content);
		return this;
	},
	events: {
		'click button#sort-texts-index-crits':'sortIndexCrits',
		'click button#sort-texts-index-title':'sortIndexTitle',
		'click button#sort-texts-index-author':'sortIndexAuthor',
		'click button#sort-texts-index-id':'sortIndexId',
		'keyup input#filter-texts-input': 'filterTexts',
		'click input#filter-texts-input': 'refreshTexts'		
	},
	
	refreshTexts: function(event){
		if(this.filteredTexts.length > 0){
			this.collection.trigger('sync');
		}
		this.filteredTexts.reset();
		$('input#filter-texts-input').focus();
	},

	filterTexts: function(event){
		
		var results = this.collection.where({username: event.target.value});
		if(results.length === 0){
			results = this.collection.where({title: event.target.value});
		}
		
		if(results.length !== 0){
			this.filteredTexts.set(results);
		}
	},
	
	renderFilteredTexts: function(){
		var content = this.template({
			texts: this.filteredTexts
		});
		this.$el.html(content);
		$('#filter-texts-input').attr('placeholder','Click here to go back to all texts');
		return this;
		
	},

	sortIndexCrits: function(){
		if(this.filteredTexts.length > 0){
			if($('button#sort-texts-index-crits').data('sort-method') === 'desc'){
				this.filteredTexts.comparator = function(text){
					return -text.critiques().length;
				};
				this.filteredTexts.sort();
				$('button#sort-texts-index-crits').data('sort-method', 'asc');
			} else {
				this.filteredTexts.comparator = function(text){
					return text.critiques().length;
				};
				this.filteredTexts.sort();
				$('button#sort-texts-index-crits').data('sort-method', 'desc');
			}
		} else {
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
		}
	},
	
	sortIndexTitle: function(){
		if(this.filteredTexts.length > 0){
			if($('button#sort-texts-index-title').data('sort-method') === 'desc'){
				this.filteredTexts.comparator = function(text){
					//thanks to andrew-de-andrade on stackoverflow:
					var str = text.get('title');
					  str = str.toLowerCase();
					  str = str.split("");
					  str = _.map(str, function(letter) { 
					    return String.fromCharCode(-(letter.charCodeAt(0)));
					  });
					  return str;
				};
				this.filteredTexts.sort();
				$('button#sort-texts-index-title').data('sort-method', 'asc');
			} else {
				this.filteredTexts.comparator = function(text){
					return text.get('title').toLowerCase();
				};
				this.filteredTexts.sort();
				$('button#sort-texts-index-title').data('sort-method', 'desc');
			
			}
		} else {
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
					return text.get('title').toLowerCase();
				};
				this.collection.sort();
				$('button#sort-texts-index-title').data('sort-method', 'desc');
			
			}
		
		}
	},
	//
	// sortIndexAuthor: function(){
	// 	if($('button#sort-texts-index-author').data('sort-method') === 'desc'){
	// 		this.collection.comparator = function(text){
	// 			//thanks to andrew-de-andrade on stackoverflow:
	// 			var str = text.user().get('username');
	// 			  str = str.toLowerCase();
	// 			  str = str.split("");
	// 			  str = _.map(str, function(letter) {
	// 			    return String.fromCharCode(-(letter.charCodeAt(0)));
	// 			  });
	// 			  return str;
	// 		};
	// 		this.collection.sort();
	// 		$('button#sort-texts-index-author').data('sort-method', 'asc');
	// 	} else {
	// 		this.collection.comparator = function(text){
	// 			return text.user().get('username').toLowerCase();
	// 		};
	// 		this.collection.sort();
	// 		$('button#sort-texts-index-author').data('sort-method', 'desc');
	// 	}
	// },
	//
	sortIndexId: function(){
		if(this.filteredTexts.length > 0){
			if($('button#sort-texts-index-id').data('sort-method') === 'desc'){
				this.filteredTexts.comparator = function(text){
					return -text.id;
				};
				this.filteredTexts.sort();
				$('button#sort-texts-index-id').data('sort-method', 'asc');

			} else {
				this.filteredTexts.comparator = function(text){
					return text.id;
				};
				this.filteredTexts.sort();
				$('button#sort-texts-index-id').data('sort-method', 'desc');
			}
		} else {
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
	}
});
