# iRacing IBT to CSV Conversion

Steps to use:
1. Run `npm install`
   1. Note: if [ibt-telemetry](https://github.com/SkippyZA/ibt-telemetry) is not available via npm registry, you'll have to clone it and run `npm install` in its root directory first
2. Copy/paste your `.ibt` file into the main directory and rename it `telemetry_file.ibt`
3. Run `npm run csv` 
   1. This will generate a CSV with the default params, see Usage below for more details on customizing
4. A file called `output.csv` should be created in the main directory

## Usage

There are parameters able to be passed to the script to change functionality.

| Param | Description |
|---|---|
| params | Should be passed in as a comma-delimited value. Determines which columns are pulled from the IBT file. e.g. Speed,Throttle |
| logSample | Used to output a single sample as reference for the currently available fields. Pass a boolean value - true/false |

###Example parameterized usages

| Command | Output |
|---|---|
| `npm run csv -- --params=Speed,Throttle` | Will generate a CSV with only Speed and Throttle columns |
| `npm run csv -- --params=Speed,Throttle --logSample=true` | Will generate a CSV the same as above but will also output a single sample |
| `npm run csv -- --logSample=true` | Will generate a CSV with the default fields (see `index.js`) and also output a single sample |

Note: all the double hyphens above are necessary 