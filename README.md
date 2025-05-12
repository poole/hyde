# MoNA website

This website was created using [jekyll](https://jekyllrb.com/) and [GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll). 

Jekyll is a static site generator that takes care of updating a site template with contents of our chosing, which we can provide via markdown files. 

The site template is [Hyde (see repo for more details)](https://github.com/poole/hyde) with some of our own modifications.

Included are instructions for how to update the team website with a focus on the content rather than styling. 

- [MoNA website](#mona-website)
  - [Directory organization](#directory-organization)
  - [MUST READ - how jekyll works](#must-read---how-jekyll-works)
    - [Home page (default) vs. all other pages](#home-page-default-vs-all-other-pages)
  - [Updating website content](#updating-website-content)
    - [(OPTIONAL) Previewing changes locally](#optional-previewing-changes-locally)
    - [Updating an existing page](#updating-an-existing-page)
    - [Adding a page (example)](#adding-a-page-example)
    - [Updating side nav links](#updating-side-nav-links)
  - [Updating the styling ](#updating-the-styling)
  - [Original Author](#original-author)
  - [License](#license)


## Directory organization of Repo

(only highlighting folders and files relevant to updating site)

```bash
/
├── index.md
├── 1research.md
├── 2ds_platform.md
├── 3people.md
├── 4tools.md
├── 5education.md
├── 6contact.md
├── README.md
├── _config.yml
├── _includes/
│   ├── head.html
│   └── sidebar.html
├── _layouts/
│   ├── default.html
│   └── page.html
├── _site/
└── public/
    ├── assets/
    └── css/

```


## MUST READ - how jekyll works

1.  How jekyll knows to work its magic on a markdown or html file is based on the file's [YAML front matter block](https://jekyllrb.com/docs/front-matter/). 
  
  e.g., 
  ```
  ---
  layout: page
  title: About
  permalink: /about/
  ---
  ```
- **no front matter = not included in the website** (e.g., jekyll knows not to include this README.md you are reading because there is no front matter)

2.  Main takeaway: To update the **contents of the website** you will only need to add/remove/update the markdown files with front matter in the main directory. (e.g., [3people.md](3people.md)) More instructions in [Updating website content](#updating-website-content).

- **Do not alter the files in `_includes`, `_layouts` for now.**


#### Home page (default) vs. all other pages

- How jekyll knows to work its magic on a markdown or html file is based on the file's [YAML front matter block](https://jekyllrb.com/docs/front-matter/). 
  
- Currently, there are 2 page layouts (templates) used in our site:
  - `default` via */_layouts/default.html*
  - `page` via */_layouts/page.html`*
  
- The way that the styling is merged with the markdown files is via `layout` in the front matter: 
  e.g.,
  ```
  ---
  layout: page
  title: About
  permalink: /about/
  ---
  ```
- `layout: page` is to be used for almost all of the pages you want included in the site
- `layout: default` is only used for the home page [index.md](index.md) because it has some additional formatting + appears as the first option in the top menu bar
  >From the Hyde repo: "**Why require a specific layout?** Jekyll will return *all* pages, including the `atom.xml`, and with an alphabetical sort order. To ensure the first link is *Home*, we exclude the `index.md` page from this list by specifying the `default` layout."


## Updating website content

- To update the contents of the website you will only need to add/remove/update markdown files in the main directory. 
- To incorporate images or any other files into the site please put them in `/public/assets/`
  
#### (OPTIONAL) Previewing changes locally
If you want to test/preview the site locally as you make changes 

1. [install jekyll](https://jekyllrb.com/docs/installation/)
2. in your terminal cd into the site's repo 
3. then run `jekyll serve --watch`
4. open the url in `Server address: ...`
5. To preview your changes don't forget to save your file and refresh the browser.

#### Updating an existing page

1. Clone this repository
2. Create a branch from the 'master' branch of THIS repository (not the poole/hyde one)
3. In the main directory, open the markdown file you want to update e.g. [3people.md](3people.md)
4. make whatever changes to the content you want 
5. save the file 
6. push the changes to your branch
7. Make a pull request for your branch into the **MoNA's `Master` branch** (:warning: NOT poole/hyde) then jekyll will take care of the rest
  
(it's that easy :smiley:)


#### Adding a page (example)
Let's say you want to add a 'Contact' page and it should appear as the last option on the top menu bar

1. Steps 1-3 in [Updating an existing page](#updating-an-existing-page)
2. Create a markdown file in the root directory. Since pages are sorted alphabetically, if you want the Contact page to be last in the menubar of the website, prefix the markdown filename with a '9' or 'z' for example
3.  In the markdown file, the front matter should look like this:
  
  ```
  ---
  layout: page
  title: Contact
  permalink: /contact/
  ---
  ```
  - the layout should be 'page', to tell jekyll to use the page.html layout
  - the title is what will be used in the top menu bar
  - assigning a permalink will overwrite the default of using the ugly filename (e.g., `... .github.io/contact/` instead of `... .github.io/9contact/`)

4. Underneath the front matter include whatever content you would like. You can add formatting to the file using markdown or html syntax.
5. Steps 5-7 in [Updating an existing page](#updating-an-existing-page)


#### Updating side nav links
- similar steps to those in [Updating an existing page](#updating-an-existing-page)
- However, the file that needs to be updated is `/_includes/sidebar.html`
- Look for the `sidebar-nav-item` tags


##  Updating the styling 
**:warning: Dangerous territory**

- Recall that the site template is [Hyde (see repo for more details)](https://github.com/poole/hyde) with some of our own modifications.
- Updates to formating is done in the 3 directories: `/_includes/` `/_layouts/` and `/public/`
- Requires HTML and CSS 


## Original Author
[Please see hyde repo for more details](https://github.com/poole/hyde)
**Mark Otto**
- <https://github.com/mdo>
- <https://twitter.com/mdo>

## License
Open sourced under the [MIT license](LICENSE.md).

<3
