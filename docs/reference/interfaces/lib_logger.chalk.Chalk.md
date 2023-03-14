[@asyncapi/glee](../README.md) / [lib/logger](../modules/lib_logger.md) / [chalk](../modules/lib_logger.chalk.md) / Chalk

# Interface: Chalk

[lib/logger](../modules/lib_logger.md).[chalk](../modules/lib_logger.chalk.md).Chalk

## Hierarchy

- [`ChalkFunction`](lib_logger.chalk.ChalkFunction.md)

  ↳ **`Chalk`**

## Callable

### Chalk

▸ **Chalk**(`text`, ...`placeholders`): `string`

Use a template string.

**`remarks`** Template literals are unsupported for nested calls (see [issue #341](https://github.com/chalk/chalk/issues/341))

**`example`**

```
import chalk = require('chalk');

log(chalk`
CPU: {red ${cpu.totalPercent}%}
RAM: {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);
```

**`example`**

```
import chalk = require('chalk');

log(chalk.red.bgBlack`2 + 3 = {bold ${2 + 3}}`)
```

#### Parameters

| Name              | Type                   |
| :---------------- | :--------------------- |
| `text`            | `TemplateStringsArray` |
| `...placeholders` | `unknown`[]            |

#### Returns

`string`

#### Defined in

node_modules/chalk/index.d.ts:148

### Chalk

▸ **Chalk**(...`text`): `string`

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `...text` | `unknown`[] |

#### Returns

`string`

#### Defined in

node_modules/chalk/index.d.ts:150

## Table of contents

### Properties

- [Instance](lib_logger.chalk.Chalk.md#instance)
- [bgBlack](lib_logger.chalk.Chalk.md#bgblack)
- [bgBlackBright](lib_logger.chalk.Chalk.md#bgblackbright)
- [bgBlue](lib_logger.chalk.Chalk.md#bgblue)
- [bgBlueBright](lib_logger.chalk.Chalk.md#bgbluebright)
- [bgCyan](lib_logger.chalk.Chalk.md#bgcyan)
- [bgCyanBright](lib_logger.chalk.Chalk.md#bgcyanbright)
- [bgGray](lib_logger.chalk.Chalk.md#bggray)
- [bgGreen](lib_logger.chalk.Chalk.md#bggreen)
- [bgGreenBright](lib_logger.chalk.Chalk.md#bggreenbright)
- [bgGrey](lib_logger.chalk.Chalk.md#bggrey)
- [bgMagenta](lib_logger.chalk.Chalk.md#bgmagenta)
- [bgMagentaBright](lib_logger.chalk.Chalk.md#bgmagentabright)
- [bgRed](lib_logger.chalk.Chalk.md#bgred)
- [bgRedBright](lib_logger.chalk.Chalk.md#bgredbright)
- [bgWhite](lib_logger.chalk.Chalk.md#bgwhite)
- [bgWhiteBright](lib_logger.chalk.Chalk.md#bgwhitebright)
- [bgYellow](lib_logger.chalk.Chalk.md#bgyellow)
- [bgYellowBright](lib_logger.chalk.Chalk.md#bgyellowbright)
- [black](lib_logger.chalk.Chalk.md#black)
- [blackBright](lib_logger.chalk.Chalk.md#blackbright)
- [blue](lib_logger.chalk.Chalk.md#blue)
- [blueBright](lib_logger.chalk.Chalk.md#bluebright)
- [bold](lib_logger.chalk.Chalk.md#bold)
- [cyan](lib_logger.chalk.Chalk.md#cyan)
- [cyanBright](lib_logger.chalk.Chalk.md#cyanbright)
- [dim](lib_logger.chalk.Chalk.md#dim)
- [gray](lib_logger.chalk.Chalk.md#gray)
- [green](lib_logger.chalk.Chalk.md#green)
- [greenBright](lib_logger.chalk.Chalk.md#greenbright)
- [grey](lib_logger.chalk.Chalk.md#grey)
- [hidden](lib_logger.chalk.Chalk.md#hidden)
- [inverse](lib_logger.chalk.Chalk.md#inverse)
- [italic](lib_logger.chalk.Chalk.md#italic)
- [level](lib_logger.chalk.Chalk.md#level)
- [magenta](lib_logger.chalk.Chalk.md#magenta)
- [magentaBright](lib_logger.chalk.Chalk.md#magentabright)
- [red](lib_logger.chalk.Chalk.md#red)
- [redBright](lib_logger.chalk.Chalk.md#redbright)
- [reset](lib_logger.chalk.Chalk.md#reset)
- [strikethrough](lib_logger.chalk.Chalk.md#strikethrough)
- [underline](lib_logger.chalk.Chalk.md#underline)
- [visible](lib_logger.chalk.Chalk.md#visible)
- [white](lib_logger.chalk.Chalk.md#white)
- [whiteBright](lib_logger.chalk.Chalk.md#whitebright)
- [yellow](lib_logger.chalk.Chalk.md#yellow)
- [yellowBright](lib_logger.chalk.Chalk.md#yellowbright)

### Methods

- [ansi](lib_logger.chalk.Chalk.md#ansi)
- [ansi256](lib_logger.chalk.Chalk.md#ansi256)
- [bgAnsi](lib_logger.chalk.Chalk.md#bgansi)
- [bgAnsi256](lib_logger.chalk.Chalk.md#bgansi256)
- [bgHex](lib_logger.chalk.Chalk.md#bghex)
- [bgHsl](lib_logger.chalk.Chalk.md#bghsl)
- [bgHsv](lib_logger.chalk.Chalk.md#bghsv)
- [bgHwb](lib_logger.chalk.Chalk.md#bghwb)
- [bgKeyword](lib_logger.chalk.Chalk.md#bgkeyword)
- [bgRgb](lib_logger.chalk.Chalk.md#bgrgb)
- [hex](lib_logger.chalk.Chalk.md#hex)
- [hsl](lib_logger.chalk.Chalk.md#hsl)
- [hsv](lib_logger.chalk.Chalk.md#hsv)
- [hwb](lib_logger.chalk.Chalk.md#hwb)
- [keyword](lib_logger.chalk.Chalk.md#keyword)
- [rgb](lib_logger.chalk.Chalk.md#rgb)

## Properties

### Instance

• **Instance**: [`Instance`](../modules/lib_logger.chalk.md#instance)

Return a new Chalk instance.

#### Defined in

node_modules/chalk/index.d.ts:157

---

### bgBlack

• `Readonly` **bgBlack**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:369

---

### bgBlackBright

• `Readonly` **bgBlackBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:388

---

### bgBlue

• `Readonly` **bgBlue**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:373

---

### bgBlueBright

• `Readonly` **bgBlueBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:392

---

### bgCyan

• `Readonly` **bgCyan**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:375

---

### bgCyanBright

• `Readonly` **bgCyanBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:394

---

### bgGray

• `Readonly` **bgGray**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:381

---

### bgGreen

• `Readonly` **bgGreen**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:371

---

### bgGreenBright

• `Readonly` **bgGreenBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:390

---

### bgGrey

• `Readonly` **bgGrey**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:386

---

### bgMagenta

• `Readonly` **bgMagenta**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:374

---

### bgMagentaBright

• `Readonly` **bgMagentaBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:393

---

### bgRed

• `Readonly` **bgRed**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:370

---

### bgRedBright

• `Readonly` **bgRedBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:389

---

### bgWhite

• `Readonly` **bgWhite**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:376

---

### bgWhiteBright

• `Readonly` **bgWhiteBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:395

---

### bgYellow

• `Readonly` **bgYellow**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:372

---

### bgYellowBright

• `Readonly` **bgYellowBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:391

---

### black

• `Readonly` **black**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:341

---

### blackBright

• `Readonly` **blackBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:360

---

### blue

• `Readonly` **blue**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:345

---

### blueBright

• `Readonly` **blueBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:364

---

### bold

• `Readonly` **bold**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Make text bold.

#### Defined in

node_modules/chalk/index.d.ts:303

---

### cyan

• `Readonly` **cyan**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:347

---

### cyanBright

• `Readonly` **cyanBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:366

---

### dim

• `Readonly` **dim**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Emitting only a small amount of light.

#### Defined in

node_modules/chalk/index.d.ts:308

---

### gray

• `Readonly` **gray**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:353

---

### green

• `Readonly` **green**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:343

---

### greenBright

• `Readonly` **greenBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:362

---

### grey

• `Readonly` **grey**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:358

---

### hidden

• `Readonly` **hidden**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Prints the text, but makes it invisible.

#### Defined in

node_modules/chalk/index.d.ts:328

---

### inverse

• `Readonly` **inverse**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Inverse background and foreground colors.

#### Defined in

node_modules/chalk/index.d.ts:323

---

### italic

• `Readonly` **italic**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Make text italic. (Not widely supported)

#### Defined in

node_modules/chalk/index.d.ts:313

---

### level

• **level**: [`Level`](../modules/lib_logger.chalk.md#level)

The color support for Chalk.

By default, color support is automatically detected based on the environment.

Levels:

- `0` - All colors disabled.
- `1` - Basic 16 colors support.
- `2` - ANSI 256 colors support.
- `3` - Truecolor 16 million colors support.

#### Defined in

node_modules/chalk/index.d.ts:170

---

### magenta

• `Readonly` **magenta**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:346

---

### magentaBright

• `Readonly` **magentaBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:365

---

### red

• `Readonly` **red**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:342

---

### redBright

• `Readonly` **redBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:361

---

### reset

• `Readonly` **reset**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Resets the current color chain.

#### Defined in

node_modules/chalk/index.d.ts:298

---

### strikethrough

• `Readonly` **strikethrough**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Puts a horizontal line through the center of the text. (Not widely supported)

#### Defined in

node_modules/chalk/index.d.ts:333

---

### underline

• `Readonly` **underline**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Make text underline. (Not widely supported)

#### Defined in

node_modules/chalk/index.d.ts:318

---

### visible

• `Readonly` **visible**: [`Chalk`](lib_logger.chalk.Chalk.md)

Modifier: Prints the text only when Chalk has a color support level > 0.
Can be useful for things that are purely cosmetic.

#### Defined in

node_modules/chalk/index.d.ts:339

---

### white

• `Readonly` **white**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:348

---

### whiteBright

• `Readonly` **whiteBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:367

---

### yellow

• `Readonly` **yellow**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:344

---

### yellowBright

• `Readonly` **yellowBright**: [`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:363

## Methods

### ansi

▸ **ansi**(`code`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use a [Select/Set Graphic Rendition](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters) (SGR) [color code number](https://en.wikipedia.org/wiki/ANSI_escape_code#3/4_bit) to set text color.

30 <= code && code < 38 || 90 <= code && code < 98
For example, 31 for red, 91 for redBright.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `code` | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:226

---

### ansi256

▸ **ansi256**(`index`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use a [8-bit unsigned number](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) to set text color.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:231

---

### bgAnsi

▸ **bgAnsi**(`code`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use a [Select/Set Graphic Rendition](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters) (SGR) [color code number](https://en.wikipedia.org/wiki/ANSI_escape_code#3/4_bit) to set background color.

30 <= code && code < 38 || 90 <= code && code < 98
For example, 31 for red, 91 for redBright.
Use the foreground code, not the background code (for example, not 41, nor 101).

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `code` | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:288

---

### bgAnsi256

▸ **bgAnsi256**(`index`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use a [8-bit unsigned number](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) to set background color.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:293

---

### bgHex

▸ **bgHex**(`color`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HEX value to set background color.

**`example`**

```
import chalk = require('chalk');

chalk.bgHex('#DEADED');
```

#### Parameters

| Name    | Type     | Description                                       |
| :------ | :------- | :------------------------------------------------ |
| `color` | `string` | Hexadecimal value representing the desired color. |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:245

---

### bgHsl

▸ **bgHsl**(`hue`, `saturation`, `lightness`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HSL values to set background color.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `hue`        | `number` |
| `saturation` | `number` |
| `lightness`  | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:269

---

### bgHsv

▸ **bgHsv**(`hue`, `saturation`, `value`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HSV values to set background color.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `hue`        | `number` |
| `saturation` | `number` |
| `value`      | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:274

---

### bgHwb

▸ **bgHwb**(`hue`, `whiteness`, `blackness`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HWB values to set background color.

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `hue`       | `number` |
| `whiteness` | `number` |
| `blackness` | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:279

---

### bgKeyword

▸ **bgKeyword**(`color`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use keyword color value to set background color.

**`example`**

```
import chalk = require('chalk');

chalk.bgKeyword('orange');
```

#### Parameters

| Name    | Type     | Description                                   |
| :------ | :------- | :-------------------------------------------- |
| `color` | `string` | Keyword value representing the desired color. |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:259

---

### bgRgb

▸ **bgRgb**(`red`, `green`, `blue`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use RGB values to set background color.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `red`   | `number` |
| `green` | `number` |
| `blue`  | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:264

---

### hex

▸ **hex**(`color`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HEX value to set text color.

**`example`**

```
import chalk = require('chalk');

chalk.hex('#DEADED');
```

#### Parameters

| Name    | Type     | Description                                       |
| :------ | :------- | :------------------------------------------------ |
| `color` | `string` | Hexadecimal value representing the desired color. |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:184

---

### hsl

▸ **hsl**(`hue`, `saturation`, `lightness`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HSL values to set text color.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `hue`        | `number` |
| `saturation` | `number` |
| `lightness`  | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:208

---

### hsv

▸ **hsv**(`hue`, `saturation`, `value`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HSV values to set text color.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `hue`        | `number` |
| `saturation` | `number` |
| `value`      | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:213

---

### hwb

▸ **hwb**(`hue`, `whiteness`, `blackness`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use HWB values to set text color.

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `hue`       | `number` |
| `whiteness` | `number` |
| `blackness` | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:218

---

### keyword

▸ **keyword**(`color`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use keyword color value to set text color.

**`example`**

```
import chalk = require('chalk');

chalk.keyword('orange');
```

#### Parameters

| Name    | Type     | Description                                   |
| :------ | :------- | :-------------------------------------------- |
| `color` | `string` | Keyword value representing the desired color. |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:198

---

### rgb

▸ **rgb**(`red`, `green`, `blue`): [`Chalk`](lib_logger.chalk.Chalk.md)

Use RGB values to set text color.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `red`   | `number` |
| `green` | `number` |
| `blue`  | `number` |

#### Returns

[`Chalk`](lib_logger.chalk.Chalk.md)

#### Defined in

node_modules/chalk/index.d.ts:203
