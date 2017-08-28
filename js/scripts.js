// scripts.js

//Task - Mod 11.6
$(function() {
    function randomString() { //funkcja generuje id
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this; // useful for nested functions
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() { // tworzenie kolumn
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card'); //przyciski

            $columnDelete.click(function() {
                self.removeColumn();
            });
            //Add a note after clicking on the button:
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card"))); //nazwanie kolumny
            });
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element); //metoda addCard
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() { // CREATING THE BLOCKS
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(function() { // PRZYPIĘCIE ZDARZENIA
                self.removeCard();
            });
            // SKŁADANIE I ZWRACANIE KARTY
            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove(); //metoda removeCard
        }
    };
    //Obiekt tablica - to div o klasie board w html
    var board = { //tworzymy tablicę js
        name: 'Kanban Board',

        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({ //metoda sortable - opcja drag'n'drop z rozszerzenia jQueryUI
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    $('.create-column').click(function() { //dodawania kolejnych kolumn
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });
    // TWORZENIE KOLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
})