---
layout: page
title: 6. Java Properties Files
---

<div class="message">
Currently we have long blocks of text preceding our directives tables describing usage and conditions for each file format. Much of this information can be standardised. Jekyll gives us the ability to specify different layouts for different types of posts. Let's create a 'SupportedFile' layout type that lets us display some standard information for each file in a way that's pleasing and easy to read. For example, with Java Properties files:
</div>

**Platforms:** Java  
**Extension:** .properties  
**Smartling Identifier:** javaProperties  
**Supports includeOriginalStrings:** Yes. (link to this download parameter)  
**Downloadable Example:** [java.properties](https://docs.smartling.com/download/attachments/327693/java.properties?version=1&modificationDate=1330473126000)

##Usage

###String Format and Escaping

string_format=MESSAGE_FORMAT uses placeholders in the syntax: {*} and the single quote (apostrophe) is an escape character, so to use the single quote character, it must be escaped as ''.  When MessageFormat parsing is on (default) in your source file single quotes must be escaped as two single quotes: '' otherwise it will not be captured.  If a translation has a single quote character, it will be escaped in the downloaded file as ''. Translators may use a single quote even though one wasn't in the original content. If MessageFormat is turned off then strings will not need single quotes escaped to capture them, and single quotes in translations will not be escaped.  You can turn MessageFormat off and on in a single file with inline integration. 

###Placeholder Format

JAVA uses c-style placeholder syntax: %d, %s, %4.2f, etc. and because the % character is an escape character so displaying a single percent character literal requires that it be escaped as %% . When JAVA parsing is on (default) in your source file single percent characters must be escaped as two single percent characters: %% otherwise the % may trigger placeholder treatment and create an invalid placeholder in your string that causes incorrect capture and prevents proper translation.  When JAVA parsing is on Smartling will escape the % character in a translated string if the string has a JAVA formatted placeholder. Otherwise the % character in the translation are delivered unescaped.

If this default behavior is not desirable for your content you can optionally turn off either of the formatting treatments for the entire file or just for the strings where you don't want the behavior.  You can turn the behavior off and on throughout the file as needed.  

You can also specify your own custom placeholder syntax that is in addition to the standard behavior from the above two directives.

##Directives

Directives in java properties files are specified using comments following the format **smartling**.[command name] = [command value]. For example:
{% highlight jproperties%}
# smartling.placeholder_format_custom = \[.?\]
{% endhighlight %}

### placeholder_format_custom
Used to define custom placeholders  
**Values:**  
1.  [Perl-compatible custom regular expression](http://www.pcre.org/)  
2.  NONE - disable the current PCRE for all content below the directive.

**Example**  
{% highlight jproperties%}
# smartling.placeholder_format_custom = \[.+?\]
{% endhighlight %}


### placeholder_format
Overrides the native parser's placeholder format.  
**Values**  
1.  NONE  
2.  C  
3.  IOS  
4.  PYTHON  
5.  JAVA (default)  
6.  YAML  

**Examples**
{% highlight jproperties%}
# smartling.placeholder_format = NONE
{% endhighlight %}
Turns off smartling placeholder detection temporarily

{% highlight jproperties%}
# smartling.placeholder_format = PYTHON
{% endhighlight %}
Turns on Python-style placeholder detection.

###string_format
Parser directive for specialized file processing that enables string escaping and pre-processing rules as defined by various third party resource handlers. The default is MessageFormat , a standard Java resource handler.

**Values**  
1. NONE  
2. MESSAGE_FORMAT

**Examples**  
{% highlight jproperties%}
# smartling.placeholder_format = NONE
{% endhighlight %}

