#!/bin/sh
cd build/

cp ../firefox/manifest.json manifest.json
zip -FSr ../firefox/bits-compendium.zip *

cp ../chrome/manifest.json manifest.json
zip -FSr ../chrome/bits-compendium.zip *

cp ../edge/manifest.json manifest.json
zip -FSr ../edge/bits-compendium.zip *

cp ../firefox/manifest.json manifest.json

cd ..
zip -FSr firefox/bits-compendium-source.zip package.json package-lock.json public/ src/ README.md
