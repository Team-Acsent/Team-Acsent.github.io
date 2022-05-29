const { Chess } = require("../chess-js-logic/chess");

onCreateProject(() => {
  project.pieces = {en: "pawn|knight|bishop|rook|queen|king"};
  project.files = {en: "alpha|bravo|charlie|delta|echo|foxtrot|golf|hotel"};
  project.ranks = {en: "one|two|three|four|five|six|seven|eight"};
  project.notn = {
    "pawn": "",
    "knight": "N",
    "bishop": "B",
    "rook": "R",
    "queen": "Q",
    "king": "K",
    "alpha": "a",
    "bravo": "b",
    "charlie": "c",
    "delta": "d",
    "echo": "e",
    "foxtrot": "f",
    "golf": "g",
    "hotel": "h",
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8
  };
});

// "Useless" greeting stuff
intent('(Hi|Hello|Hey)', p => {
  console.log("blah");
  p.play('Hi there', 'Howdy', '\'Sup');
});

intent('Bye', p => {
  p.play('Bye', 'See you', 'Later', 'Until next time');
});

intent(
  'Who\'s there',
  'What\'s your name',
  p => {
    p.play(
      'My name is Alan.',
      'It\'s Alan.',
    );
  },
);

intent ('Rickroll (me|)', p => {
  p.play('Never gonna give you up. Never gonna let you down. Never gonna run around and desert you.');
});


// Help
intent('What can (I|you) do?',
    'What (commands|statements|) can I (use|say)?',
  p => {
    p.play('You can make a chess move such as knight to echo four, undo a move, or adjust the settings.');
    p.play('Would you like to see a list of commmands you can use?')
    p.then(showHelp);
  }
);

let showHelp = context(() => {
  intent('Yes', p => {
    p.play(`Here's a list of commands that I can understand.`);
  });
  intent('No', p => {
    p.play(`Okay.`)
  });
});

// Chess
intent('(Move|) $(PIECE p:pieces) (to|takes|captures on|) $(FILE p:files) $(RANK p:ranks)', p => {
  p.play({command: 'move'});
  p.play(`Moving ${p.PIECE.value} to ${p.FILE.value} ${p.RANK.value}`);
});

