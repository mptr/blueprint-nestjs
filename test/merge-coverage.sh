#!/bin/sh

cd "$(dirname "$0")/.."

# if env $CI is set, skip tests (already run in CI via separate steps)
if [ -z "$CI" ]; then
  pnpm test:unit-ci
  pnpm test:e2e-ci
fi

# prepare
cp coverage/unit/coverage-final.json coverage/unit.json
cp coverage/e2e/coverage-final.json coverage/e2e.json

# generate html and json report
pnpm nyc report --reporter html --reporter json --reporter html -t coverage --report-dir coverage/summary
