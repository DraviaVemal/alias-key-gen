# Alias Key Generator

This package enables the generation of unique alias name . The default UID generated are considred for SQL keywords to avoid query conflict.
End user can update the options to configure as per the need

## Installation

You can install this package via npm:

```bash
npm i alias-key-gen
```

## Usage

```javascript
import { AliasKeyGen } from "alias-key-gen";

const aliasKeyGen = new AliasKeyGen({
    charString: "abcdfghjkmpqxz",
    extendNumberSequenceSuffix: {
        enableNumSeq: true,
        maxNumberSeq: 9
    },
    startSequence: "ab5"
});
console.log(aliasKeyGen.next());
console.log(aliasKeyGen.next());
```

```bash
# Output is
a
b
```

## Contribution

Contributions are welcome! If you encounter issues or have suggestions for improvements, feel free to open an issue or submit a pull request on [GitHub](https://github.com/DraviaVemal/alias-key-gen/pulls).

## License

This package is licensed under the MIT License.

## Contact

For inquiries or support, please contact [contact@draviavemal.com](mailto:contact@draviavemal.com).
