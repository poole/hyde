---
description: >
  This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.
hide_description: true
---

# Upgrade
This chapter shows how to upgrade Hydejack to a newer version. The method depends on how you've installed Hydejack.

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

**NOTE**: Before upgrading to v7+, make sure you've read the [CHANGELOG](../CHANGELOG.md){:.heading.flip-title},
especially the part about the [license change](../CHANGELOG.md#license-change)!
{:.message}

## Via Starter Kit
When using the Starter Kit, upgrading Hydejack is as simple as setting the `remote_theme` key in `config.yml` to the desired version.

```yml
remote_theme: qwtel/hydejack@v8.4.0
```

To use the latest version on the `v8` branch on each build, you can use  `qwtel/hydejack@v8`.


## Via gem
Upgrading the gem-based theme is as easy as running

```bash
bundle update jekyll-theme-hydejack
```

## Via zip
Upgrading via zip is a bit of a dark art, specially if you've made changes to any source files,
and the prime reason why I suggest using the gem-based version of the theme.

Generally, you'll want to copy these files and folders:

* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`
* `Gemfile`
* `Gemfile.lock`

and merge them with your existing folder. However, you'll also want to check out `_data` and `_config.yml` for any changes
and read latest entries to the [CHANGELOG](../CHANGELOG.md){:.heading.flip-title}.

**NOTE**: If you've modified any of Hydejack's internal files, your changes will most likely be overwritten
and you have to apply them again.
Make sure you've made a backup before overwriting any files.
{:.message}


## Via git
The latest version sits on the `master` branch of [qwtel/hydejack](https://github.com/qwtel/hydejack).
To apply them to your repository run

~~~bash
$ git remote add hydejack git@github.com:qwtel/hydejack.git
$ git pull hydejack master
~~~


## PRO Version
Buyers of the PRO version will find the files necessary for an upgrade in the `upgrade` folder of the downloaded zip archive.

**NOTE**: If you've modified any of Hydejack's internal files, your changes will most likely be overwritten
and you have to apply them again.
Make sure you've made a backup before overwriting any files.
{:.message}


### PRO via GitHub (advanced)
If you've followed the steps [here](install.md#pro-via-github-advanced), all you need to upgrade is:

~~~bash
$ bundle update jekyll-theme-hydejack-pro
~~~


Continue with [Config](config.md){:.heading.flip-title}
{:.read-more}
