const arrayOfNonCapitalizingWords: string[] = ['and', 'the', 'on', 'is']; //should be updated

const correctSpelling = (word: string): string => {
  word = word.replaceAll('-', ' ');
  const words = word.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (!arrayOfNonCapitalizingWords.includes(words[i].toLowerCase()) && words[i] !== '') {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
  }
  return words.join(' ');
};

export default correctSpelling;
