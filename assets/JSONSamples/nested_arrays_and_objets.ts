export default function generateComplexObjectJSON(charKey: string) {
  return {
    company: {
      name: { [charKey]: 'My Company' },
      address: {
        street: { [charKey]: 'Main St. 123' },
        city: { [charKey]: 'Big City' },
        country: { [charKey]: 'Country' },
      },
      employees: {
        employee: [
          {
            name: { [charKey]: 'John Doe' },
            role: { [charKey]: 'Developer' },
            skills: {
              skill: [
                { [charKey]: 'JavaScript' },
                { [charKey]: 'Typescript' },
                { [charKey]: 'React' },
              ],
            },
          },
          {
            name: { [charKey]: 'Jane Doe' },
            role: { [charKey]: 'Product Manager' },
            skills: {
              skill: [
                { [charKey]: 'Scrum' },
                { [charKey]: 'Kanban' },
              ],
            },
          },
        ],
      },
    },
  };
}
