#!/bin/bash

rm -rf _zip

mkdir -p _zip/hydejack-pro-7.5.0/install
mkdir -p _zip/hydejack-pro-7.5.0/upgrade

# Make install folder
cp -r \
  $(find . \
    ! -name .git \
    ! -name .sass-cache \
    ! -name .bundle \
    ! -name node_modules \
    ! -name vendor\
    ! -name _zip  \
    ! -name '*~' \
    ! -name '_site*' \
    -mindepth 1 \
    -maxdepth 1) \
  _zip/hydejack-pro-7.5.0/install

# Make upgrade folder
cp -r \
  _includes \
  _layouts \
  _sass \
  assets/bower_components \
  assets/js \
  assets/css \
  assets/bower.json \
  assets/version.json \
  Gemfile* \
  package* \
  _zip/hydejack-pro-7.5.0/upgrade

find _zip/hydejack-pro-7.5.0/upgrade/ -name 'my-*' -delete

# Generate PDFs.
# This assumes the next version is already online at qwtel.com
# This also assumes macOS with chrome installed...
function pdfprint {
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --print-to-pdf="_zip/hydejack-pro-7.5.0/$1.pdf" $2
}

pdfprint "PRO License" "https://qwtel.com/hydejack/licenses/PRO/"
pdfprint "PRO–hy-drawer License" "https://qwtel.com/hy-drawer/licenses/hydejack/"
pdfprint "PRO–hy-push-state License" "https://qwtel.com/hy-push-state/licenses/hydejack/"
pdfprint "Documentation" "https://qwtel.com/hydejack/docs/7.5.0/print/"
pdfprint "NOTICE" "https://qwtel.com/hydejack/NOTICE/"
pdfprint "CHANGELOG" "https://qwtel.com/hydejack/CHANGELOG/"

# Genrate git diffs
# TODO
# git diff pro/v7.5.0 pro/v7.5.1 > v7.5.0-to-v7.5.1.diff

# Generate the zip
cd _zip; zip -q -r hydejack-pro-7.5.0.zip hydejack-pro-7.5.0/
