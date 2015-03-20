---
layout: page
title: About
---



Welcome to the new Smartling Developer Documntation Prototype. This site is hosted by Github Pages and built on Hyde, a basic theme for the Jekyll static site generator.

Let's take a look at a few things we can do.

### Better ways to display code

Using the Pygments highlighter, we can display highlighted code snippets. Here's an example of our JSON directives.

{% highlight json %}
{
     "smartling" : {
        "translate_mode" : "custom",
        "translate_paths": ["*/translation"],
        "placeholder_format_custom": ["\\{([^\\}]*)\\}"]
     },
        
     "translationKey1": {
        "attribute": "attribute will not be translated",
        "translation": "Hello,  {USER_NAME}."
     },
   
     "translationKey2": {
        "attribute": "attribute will not be translated",
        "translation": "press Refresh button"
     }
}

{% endhighlight %}


For longer code snippets or whole files, we can also embed a gist right onto the page. Here's an example from our Github connector docs. All a client has to do to set up their own smartling-config.json is fork the gist, make their edits and merge it into their own repository.

{% gist smartlingtestdocs/3abb6ff92aae7591e9f2 smartling-config.json %}


