---
title: HTML Tags List For Table
date: 2020-05-09T07:35:26+00:00
author: avic
layout: page
guid: https://learn.avicndugu.com/?page_id=613
permalink: /html-tags-list-for-table/
---
<!-- OUTLINE
1. HTML table elements list
2. Use of table HTML elements 
3. Basic HTML table example
4. Merge two cells in a Column HTML table
5. Merge two cells in a row HTML table
 -->

<h2>List of all elements used to create a HTML table</h2>
You can use the following HTML tags to make a table your web page.
- table
- thead
- tbody
- th
- tr
- td
- tfoot
- col
- colspan="2"
- rowspan="3"
- colgroup
- caption

<h2>Function of each HTML tags used on a table</h2>
Table containing elements and the function of HTML tags used to create a HTML table.

<table>
    <thead>
        <th>HTML Element</th>
        <th>Function of the HTML element</th>
    </thead>
    <tbody>
        <tr>
            <td>table</td>
            <td>Creates a HTML table</td>
        </tr>
        <tr>
            <td>thead</td>
            <td>Creates a row for the column headings</td>
        </tr>
        <tr>
            <td>tbody</td>
            <td>It's a section to hold rest of the table data</td>
        </tr>
        <tr>
            <td>th</td>
            <td>Creates a heading for each column</td>
        </tr>
                <tr>
            <td>tr</td>
            <td>Creates a row on the HTML table</td>
        </tr>
        <tr>
            <td>td</td>
            <td>Creates a cell that holds all the data</td>
        </tr>
        <tr>
            <td>tfoot</td>
            <td>Creates a footer for the table.</td>
        </tr>
        <tr>
            <td>col</td>
            <td>Defines a column within a table.</td>
        </tr>
        <tr>
            <td>colspan="2"</td>
            <td>Allows a cell to span across 2 columns or more.</td>
        </tr>
        <tr>
            <td>rowspan="3"</td>
            <td>Allows a cell to span across 2 rows or more.</td>
        </tr>
        <tr>
            <td>colgroup</td>
            <td>defines a group of columns within a table.</td>
        </tr>
        <tr>
            <td>caption</td>
            <td>Creates a caption for your table</td>
        </tr>
    </tbody>
</table>

<h2>Creating Your First HTML table</h2>
Every HTML table is contained inside <code><table></table></code> tags.

Table cells

Each table has to have cells that contains the data. You create cells by using the <code><td></td></code> tags. Example:
<code>
    <td>   </td>
</code>

Table rows

To create rows in a HTML table, we use: <code><tr></tr></code> tags.
Example:
{% highlight html %}
<code>
    <tr>
        <td>First Item</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</code>
{% endhighlight html %}

<h2>Basic HTML table code example</h2>


Embed a basic HTML code


Merge two cells in a Column HTML table
```
<table>
  <tr>
    <th colspan="2">Animals</th>
  </tr>
  <tr>
    <th colspan="2">Hippopotamus</th>
  </tr>
  <tr>
    <td>Stallion</td>
  </tr>
  <tr>
    <th colspan="2">Crocodile</th>
  </tr>
  <tr>
    <td>Rooster</td>
  </tr>
</table>
```
View the result on codepen

Merge two cells in a row HTML table
<code>
```html5
<table>
  <tr>
    <td>Stallion</td>
  </tr>
  <tr>
    <th rowspan="2">Chicken</th>
    <td>Hen</td>
  </tr>
  <tr>
    <td>Rooster</td>
  </tr>
</table>
```

Resources: [Table basics MDN(Mozilla Development Network)]("https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics")