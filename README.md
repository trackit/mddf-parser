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
  - `adaptors`
    - `secondary`
      - `LocalXMLFileAdaptor.ts`: An adaptor for reading local XML files.
  - `MEC`: Folder containing files related to the MEC format.
    - `MECInterface.ts`: Contains the TypeScript interface for the MEC format.
    - `MECtoXML.ts`: Contains the function to convert a MEC interface into an XML file.
    - `MECXMLParser.ts`: Contains the class for parsing MEC XML files.
  - `MMC`: Folder containing files related to the MMC format.
    - `MMCInterface.ts`: Contains the TypeScript interface for the MMC format.
    - `MMCtoXML.ts`: Contains the function to convert a MMC interface into an XML file.
    - `MMCXMLParser.ts`: Contains the class for parsing MMC XML files.
  - `MMCMECChecker`
    - `MMCMMEChecker.ts`: Contains the class for checking consistency between MMC and MEC formats.
  - `MMCMECParser.ts`: The main file for interacting with different parts of the project.
</br>
</br>

## How to Contribute

When a new element is added to an interface, it is important to update three files accordingly to ensure proper functionality and maintain consistency throughout the project. These files are:

1. The interface file: Update the TypeScript interface to include the new element, defining its structure and any associated properties or constraints.

2. The parser file: Modify the parser to correctly read and interpret the new element from the input data source (e.g., an XML file). This may involve updating parsing logic, handling optional attributes, or managing complex structures.

3. The XML generator file: Adjust the XML generator to incorporate the new element when converting the interface into an XML file. This includes creating the appropriate XML tags, setting attributes, and managing nested elements.

By updating these three files in tandem, you can ensure that the new element is properly integrated into the project and that all components work seamlessly together.

</br>
</br>

# Resources

- [MovieLabs website](https://movielabs.com/)
- [MEC and MMC examples](https://www.movielabs.com/md/mmc/examples/movies1/)
- [MEC Documentation](https://movielabs.com/md/mec/v2.8/Media_Ent_Core_Metadata_v2.8.pdf)
- [MMC Documentation](https://www.movielabs.com/md/mmc/v2.0/Manifest_Core_v2.0.pdf)
