# VeReL

VeReL exposes the Rust library [VRL](https://github.com/vectordotdev/vrl) to JavaScript with WebAssembly.

## Installation

```bash
npm install @mlchain/verel # for npm
yarn add @mlchain/verel # for yarn
pnpm add @mlchain/verel # for pnpm
```

## Usage

```ts
import * as vrl from '@mlchain/verel'

const program = `
# Remove some fields
del(.foo)

# Add a timestamp
.timestamp = now()

# Parse HTTP status code into local variable
http_status_code = parse_int!(.http_status)
del(.http_status)

# Add status
if http_status_code >= 200 && http_status_code <= 299 {
    .status = "success"
} else {
    .status = "error"
}
`

const inputEvent = {
  message: 'Hello VRL',
  foo: 'delete me',
  http_status: '200'
}

const { errors } = vrl.check(program)
if (errors.length) {
  console.error(vrl.formatDiagnostic(errors[0]))
  process.exit(1)
}

const { event: outputEvent } = vrl.execute(program, inputEvent)
console.log(outputEvent)
```

## Disclaimer ⚠️

This package is published under the `@mlchain` organization. All packages of this organization are meant to be used by the [Mlchain](https://github.com/mlchain/mlchain) team internally and are not meant for our community. Since the packages are catered to our own use-cases, they might have less stable APIs, receive breaking changes without much warning, have minimal documentation and lack community-focused support. However, these packages were still left intentionally public for an important reason : We Love Open-Source. Therefore, if you wish to install or fork this package feel absolutly free to do it. We strongly recommend that you tag your versions properly.

The Mlchain Engineering team.
