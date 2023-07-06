export default function generateObjectElementMultiArrayJSON(): object {
  return {
    sample: {
      items: {
        item: [
          {
            inside: [
              {
                name: 'Sample Item 1',
              }
            ]
          },
        ],
      },
    },
  };
}
