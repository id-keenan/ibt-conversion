# iRacing IBT to CSV Conversion

Steps to use:
1. Run `npm install`
   1. Note: if [ibt-telemetry](https://github.com/SkippyZA/ibt-telemetry) is not available via npm registry, you'll have to clone it and run `npm install` in its root directory first
2. Copy/paste your `.ibt` file into the main directory and rename it `telemetry_file.ibt`
3. Run `npm run csv`
4. It may take a while but eventually a file called `output.csv` should be created