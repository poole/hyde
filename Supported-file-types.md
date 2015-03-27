---
layout: page
title: Supported File Types
---

Smartling supports the following file formats:

* Android xml  
* iOS string files
* iOS .stringsdict  
* Gettext po/pot  
* HTML  
* [Java Property Files](http://smartlingtestdocs.github.io/java-properties-files/)  
* YAML
* XLIFF
* JSON
* XML
* QT Linguest (TS files)  
* MadCap Lingo ZIP Packages  
* Office Open XML  
* InDesign Markup Language  
* Resx  
* Plain Text  
* CSV

You can use the Smartling Files API to upload original source files.  If you have existing translations you can import them using the Smartling Dashboard or the Import API after you have captured the original file.  If you have existing translations only in the Translation Memory Exchange (TMX) format you can add them to your accounts translation memory using the Dashboard's Translation Memory Import tool.  If you have any questions about supported File Types or the Files API contact Smartling technical support at support@smartling.com.

### Smartling string processing rules:

* If a source string contains valid markup tags or has any ampersand-escaped characters, Smartling considers the string web content, and all HTML base entity characters ( &, <, > and " ) will be ampersand-escaped in all translations.  
* If a source string is not considered web content then HTML base entity characters will remain un-escaped in all translations.  
* All ampersand-escaped BMP plane unicode characters (excluding &, <, > and " ) in original strings will be un-escaped in translation strings. For example &copy; will turn into ©.  
* For XML-based file types, any CDATA content within a translation string causes the entire translation to be enclosed in CDATA.  
* Users who cannot modify files for file upload configuration may define supported configuration directives as parameters in the upload API service call. For more information, see Files API.  When you integrate directives inline into the file, you can change the behavior for different strings within a single file.  When using directives via the API call they apply to the entire file, as if they only appeared at the top of the file, before all other content.
