// Use this sample to create your own voice commands
intent('hello world', p => {
    p.play('(hello|hi there)');
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
