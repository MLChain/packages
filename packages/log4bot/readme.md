# Log4Bot

This package contains a Logger.

## Usage

```ts
import { Logger } from '@mlchain/log4bot'

const logger = new Logger('main', { prefix: 'MYAPP', level: 'debug' })
logger.info('I love Mlchain.', { afield: '42' })

logger.attachError(new Error('Precondition Failed')).error('An error occured')
```

## Disclaimer ⚠️

This package is published under the `@mlchain` organization. All packages of this organization are meant to be used by the [Mlchain](https://github.com/mlchain/mlchain) team internally and are not meant for our community. Since the packages are catered to our own use-cases, they might have less stable APIs, receive breaking changes without much warning, have minimal documentation and lack community-focused support. However, these packages were still left intentionally public for an important reason : We Love Open-Source. Therefore, if you wish to install or fork this package feel absolutly free to do it. We strongly recommend that you tag your versions properly.

The Mlchain Engineering team.
