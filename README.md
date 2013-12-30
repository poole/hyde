# Hyde

Hyde is a [Jekyll](https://github.com/mojombo/jekyll) theme with a fluid landscape layout. It's based on [Poole](https://github.com/poole/poole), the Jekyll butler.

![Hyde screenshot](https://f.cloud.github.com/assets/98681/1818325/da6489d8-6ff5-11e3-9b4f-c56b92013e9a.png)


## Installation

### Requires Poole

To get started, download [Poole](https://github.com/poole/poole). See [the usage guidelines](https://github.com/poole/poole#usage) for how to install and get up and running with Jekyll and Poole.

### Enabling Hyde

Copy over the included files to turn any vanilla Poole site into a Hyde site.

- Replace `_includes/` with the included folder of the same name (will replace `_includes/head.html` and add `_includes/sidebar.html`)
- Replace `_layouts/default.html` with the included file of the same name
- Move `public/css/hyde.css` to `public/css/`

Then, start up your Jekyll server and go!


## Options

Hyde includes some customizable options, typically applied via classes on the `<body>` element.

### Themes

Hyde ships with eight optional themes based on the [base16 color scheme](https://github.com/chriskempson/base16). Apply a theme to change the color scheme (mostly applies to sidebar and links).

![Hyde in red](https://f.cloud.github.com/assets/98681/1818326/da64f56c-6ff5-11e3-9643-7d0c18157dec.png)

There are eight themes available at this time.

![Hyde theme classes](https://f.cloud.github.com/assets/98681/1817044/e5b0ec06-6f68-11e3-83d7-acd1942797a1.png)

To use a theme, add anyone of the available theme classes to the `<body>` element in the `default.html` layout, like so:

```html
<body class="theme-base-08">
  ...
</body>
```

To create your own theme, look to the Themes section of [included CSS file](https://github.com/poole/hyde/blob/master/public/css/hyde.css). Copy any existing theme (they're only a few lines of CSS), rename it, and change the provided colors.

### Reverse layout

![Hyde with reverse layout](https://f.cloud.github.com/assets/98681/1818324/da6473f8-6ff5-11e3-9315-692e639fb5c7.png)

Hyde's page orientation can be reversed with a single class.

```html
<body class="layout-reverse">
  ...
</body>
```


## Author

**Mark Otto**
<https://github.com/mdo>
<https://twitter.com/mdo>


## License

Open sourced under the [MIT license](LICENSE.md).

<3
