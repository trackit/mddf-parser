export default function generateLibrary(charKey: string): object {
  return {
    library: {
      books: [
        {
          title: { [charKey]: 'To Kill a Mockingbird' },
          author: { [charKey]: 'Harper Lee' },
          reviews: {
            review: [
              {
                text: { [charKey]: 'A beautifully written, classic tale of morality and human nature.' },
                rating: { [charKey]: 5 },
              },
              {
                text: { [charKey]: 'A compelling and timeless piece of literature.' },
                rating: { [charKey]: 4.5 },
              },
            ],
          },
        },
        {
          title: { [charKey]: '1984' },
          author: { [charKey]: 'George Orwell' },
          reviews: {
            review: [
              {
                text: { [charKey]: 'An eye-opening dystopian novel that everyone should read at least once.' },
                rating: { [charKey]: 5 },
              },
              {
                text: { [charKey]: 'A chilling portrayal of how power can lead to oppression and control.' },
                rating: { [charKey]: 4 },
              },
            ],
          },
        },
        {
          title: { [charKey]: 'Pride and Prejudice' },
          author: { [charKey]: 'Jane Austen' },
          reviews: {
            review: [
              {
                text: { [charKey]: 'One of the best romantic novels with lively characters and intricate plotlines.' },
                rating: { [charKey]: 4 },
              },
              {
                text: { [charKey]: 'A classic that lives up to the hype. A delightful read!' },
                rating: { [charKey]: 5 },
              },
            ],
          },
        },
      ],
    },
  };
}
