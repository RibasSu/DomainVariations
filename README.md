# DomainVariations

DomainVariations is a Node.js library for generating domain name variations focused on typosquatting detection, phishing analysis, and brand monitoring.

## Installation

Install via npm:


```bash
npm install domainvariations
```

## Usage

### ES Modules

```js
import DomainVariations from "domainvariations"

const dv = new DomainVariations()
const results = dv.generate("example.com")

console.log(results)
```

### CommonJS

```js
const DomainVariations = require("domainvariations")

const dv = new DomainVariations()
const results = dv.generate("example.com")

console.log(results)
```

## Features

- Keyboard-based typo generation
- Visual character substitution
- Character omission
- Character duplication
- Character transposition
- Similar TLD generation
- Prefix and suffix expansion

## Customization

You can customize prefixes, suffixes, keyboard layout, visual substitutions, and TLD mappings.

```js
const dv = new DomainVariations({
  prefixes: ["secure", "login"],
  suffixes: ["auth"],
  similarTlds: {
    com: ["net", "org"]
  }
})
```

## License

MIT