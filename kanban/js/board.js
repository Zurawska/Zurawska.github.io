var board = {
  name: 'Kanban Board',
  createColumn: function(column) {
    this.$element.append(column.$element);
    initSortable();
  },
  $element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
          	}
        });
}).mouseenter(function() {
  $(this).animate({ backgroundColor: '#14333d' }, 'fast');
}).mouseleave(function() {
  $(this).animate({ backgroundColor: '#03455b' }, 'fast');
});

function initSortable() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder',
    start: function(event, ui) {
      var itemHeight = ui.item.outerHeight();
      ui.placeholder.height(itemHeight);
    }
  }).disableSelection();
}
