# Plugins

Plugins will be ignored on GitHub Pages! On Netlify and other full-featured Ruby environments, this plugin will transform `<img/>` tags into `<hy-img/>` custom elements, so that the image data is lazy-loaded when scrolled into view (requires Hydejack's JS runtime).

To disable this behavior on a specific image, add the `data-ignore` attribute, e.g. `![Alt text](assets/img.png){:data-ignore=""}`. To disable this altogether, just delete (or rename) this folder. To disable this feature even on builtin images, set `no_img` to `true` in the config file.
