# MEC/MMC Parser

This is a TypeScript library that provides tools for parsing XML data from MEC and MMC files of MovieLabs. It follows the XML schema definitions provided by MovieLabs for these files.

With this library, you can extract information about studios, films, and TV shows from MovieLabs metadata files and use it in your application.

## Key Features

- Parses MEC and MMC XML files into TypeScript interfaces that follow MovieLabs XML schema definitions.
- Written in TypeScript for type-safety and ease of use in TypeScript projects.
</br>
</br>

# About

MEC (Media Entertainment Core) and MMC (Media Manifest Core) files are XML files that contain metadata on movies and TV shows, including title, actors, directors, producers, studios, and distributors. They are used to help with distribution, sales, and promotion of these contents.

However, accessing these data can be challenging for developers without the proper tools to extract and use them. This is where our library comes in. By converting these XML files into TypeScript interfaces, developers can access and manipulate these data more easily in their projects.
</br>
</br>

## File Structure

The project is structured as follows:

- `MMCMECParser`: The main folder containing all the project files.
  - `adaptors`: Contains the adaptors used for handling data sources.
    - `primary`: Intended for primary data source adaptors (empty in this snapshot).
    - `secondary`: Intended for secondary data source adaptors.
      - `LocalXMLFileAdaptor.ts`: An adaptor for reading local XML files.
  - `exceptions`
    - `LibraryExceptions.ts`: Contains custom exceptions for the library.
  - `interfaces`: Contains the interfaces used throughout the project.
    - `IFormatXML.ts`: Interface for XML formatting.
    - `IParser.ts`: Interface for parsers.
    - `IValidator.ts`: Interface for validators.
    - `IXMLFileAdaptor.ts`: Interface for XML file adaptors.
  - `MEC`: Contains classes and interfaces related to the MEC data format.
    - `MECChecker.ts`: Contains logic for checking MEC data for correctness.
    - `MECInterface.ts`: Contains the TypeScript interface for MEC data.
    - `MECParser.ts`: Contains logic for parsing MEC data.
  - `MMC`: Contains classes and interfaces related to the MMC data format.
    - `MMCChecker.ts`: Contains logic for checking MMC data for correctness.
    - `MMCInterface.ts`: Contains the TypeScript interface for MMC data.
    - `MMCParser.ts`: Contains logic for parsing MMC data.
  - `MMCMECParser.ts`: The main entry point for interacting with this library.
  - `__tests__`: Contains tests for the library.
    - `FormatXML.test.ts`: Tests for XML formatting.
    - `MECParser.test.ts`: Tests for MEC parsing.
    - `MMCParser.test.ts`: Tests for MMC parsing.
    - `ressources`: Test resources.
      - `movielabs`: Samples from MovieLabs.
        - `fullMEC.xml`: Full MEC data sample.
        - `fullMMC.xml`: Full MMC data sample.
  - `tools`: Contains utility classes.
    - `FormatXML.ts`: Logic for formatting XML.
    - `InterfacesValidator.ts`: Logic for validating interfaces.
</br>
</br>

## Usage

The `mddf-parser` library provides `MMCParser` and `MECParser` classes for parsing MMC and MEC XML data respectively. Here is a basic example of how to use these classes:

```typescript
// Import the required classes
import { MMCParser, MECParser } from 'MMCMECParser';

// Create a new instance of each parser
const mmcParser = new MMCParser();
const mecParser = new MECParser();

// Use the parser's parse method to parse your MMC and MEC data files
let mmcData = mmcParser.parse('<Path-to-MMC-XML-File>');
let mecData = mecParser.parse('<Path-to-MEC-XML-File>');

// Now mmcData and mecData contain the parsed data in corresponding interfaces
console.log(mmcData);
console.log(mecData);

// Use the export method to export your data to an XML file
mmcParser.export(mmcData, '<Path-to-MMC-XML-Export-File>');
mecParser.export(mecData, '<Path-to-MEC-XML-Export-File>');
```

## How to Contribute

We welcome contributions to this project, and your help is greatly appreciated! Please ensure the following guidelines are met:

- **Code Style**: Ensure your code adheres to our ESLint rules. Properly formatted and linted code is crucial for maintainability and helps others understand your changes. To check your code for any linting errors, run the following command:

    ```
    npm run lint
    ```

- **Testing**: A maximum of tests should be performed on the added features. Tests help ensure the stability of the project and reduce the possibility of regressions.

To contribute, follow these steps:

1. **Fork the Repository:** First, create a personal fork of the project on GitHub.

2. **Clone the Repository:** After creating your own fork, clone it to your local machine. Use the `git clone` command with the URL of your fork.

    ```
    git clone git@github.com:trackit/mddf-parser.git
    ```

3. **Create a New Branch:** Change to the directory of the project and create a new branch using the `git checkout` command:

    ```
    cd mddf-parser
    git checkout -b <your-new-branch-name>
    ```

4. **Make Your Changes:** Make the changes to the files and commit them. Make sure to follow coding standards and keep your changes as clean and concise as possible. Ensure any new code includes appropriate tests.

5. **Push the Changes:** After committing your changes locally, push them to your forked repository on GitHub. To do this, use the `git push` command.

    ```
    git push origin <your-branch-name>
    ```

6. **Submit a Pull Request:** On your GitHub fork, select your new branch and click the "Pull request" button. Fill in the form and submit a pull request to the original repository.

Before submitting your pull request, please make sure your changes are well-documented. Explain the purpose of your changes and how they contribute to the project.

Please note that your pull request will be reviewed by the maintainers. They may ask you to make changes or improvements. This review process helps ensure the quality of the project's code and keeps everything well-organized.

Thank you for contributing!

</br>
</br>

# Resources

- [MovieLabs website](https://movielabs.com/)
- [MEC and MMC examples](https://www.movielabs.com/md/mmc/examples/movies1/)
- [MEC Documentation](https://movielabs.com/md/mec/v2.8/Media_Ent_Core_Metadata_v2.8.pdf)
- [MMC Documentation](https://www.movielabs.com/md/mmc/v2.0/Manifest_Core_v2.0.pdf)
