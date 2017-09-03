function Column(id, name) {
  var self = this;
  this.id = id;
  this.name = name || 'No name given';
  this.$element = createColumn();

  function createColumn() {
    var $column = $('<div>').addClass('column');
    var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
    var $columnCardList = $('<ul>').addClass('column-card-list');
    var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
    var $columnDelete = $('<button>').addClass('btn-delete').html("<i class='fa fa-trash-o' aria-hidden='true'></i>");

    function addHover(button) {
      button.mouseenter(function() {
        $(this).animate({ backgroundColor: '#14333d' }, 'fast');
      });
      button.mouseleave(function() {
        $(this).animate({ backgroundColor: '#03455b' }, 'fast');
      });
    }

    addHover($columnAddCard);
    addHover($columnDelete);

    $columnDelete.click(function() {
      self.deleteColumn();
    });

    $columnAddCard.click(function(event) {
	  var cardName = prompt("Enter the name of the card");
	  event.preventDefault();
      $.ajax({
        url: baseUrl + '/card',
        method: 'POST',
        data: {
        name: cardName,
        bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
            var card = new Card(response.id, cardName);
            self.createCard(card);
        }
      });
    });

    $column.append($columnTitle)
      .append($columnAddCard)
      .append($columnDelete)
      .append($columnCardList);
      return $column;
  }
}

Column.prototype = {
  createCard: function(card) {
    this.$element.children('ul').append(card.$element);
  },
  deleteColumn: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function(response){
        self.$element.remove();
      }
    });
 }
};
