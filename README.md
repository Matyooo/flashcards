# flashcards install notes


SERVER:
———————

The flashcard server needs a mongoD listening on port 27017 with a db called flashcards that has one collection called cards.

MongoDB setup:

use flashcards
db.createCollection(“cards”)

Start the server flashcardServer.go. It listens to port 8080 by default.
