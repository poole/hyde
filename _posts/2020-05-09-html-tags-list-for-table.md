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
- table <code><table> </table></code>
- thead  <code> <thead> </thead> </code> 
- tbody  <code> <tbody> </tbody> </code>
- th  <code> <th> </th> </code>
- tr  <code> <tr> </tr> </code>
- td  <code> <td> </td> </code>
- tfoot  <code> <tfoot> </tfoot> </code>
- col  <code> <col> </code>
- colspan="2"  <code>  </code>
- rowspan="3"  <code> </code>
- colgroup  <code> <colgroup> </colgroup> </code>
- caption  <code> <caption> </caption> </code>

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

### Table cells

Each table has to have cells that contains the data. You create cells by using the <code><td></td></code> tags. Example:
```
<code>
    <td>Your first HTML table cell</td>
    <td>Your second HTML table cell</td>
    <td>Your third HTML table cell</td>
    <td>Your fourth HTML table Cell</td>
</code>
```
<table>
    <td>Your first HTML table cell</td>
    <td>Your second HTML table cell</td>
    <td>Your third HTML table cell</td>
    <td>Your fourth HTML table Cell</td>
</table>


### Table rows

To create rows in a HTML table, we use: <code><tr></tr></code> tags.
Example:

**Code**
```
<table>
    <tr>
        <td>Your first HTML table Cell</td>
        <td>Your second HTML table Cell</td>
    </tr>
    <tr>
        <td>Your third HTML table Cell</td>
        <td>Your fourth HTML table Cell</td>
    </tr>
</table>
```
**Result**
<table>
    <tr>
        <td>Your first HTML table Cell</td>
        <td>Your second HTML table Cell</td>
    </tr>
    <tr>
        <td>Your third HTML table Cell</td>
        <td>Your fourth HTML table Cell</td>
    </tr>
</table>

## Basic HTML table code example
**Code:**
```
<table>
  <tr>
    <td>&nbsp;</td>
    <td>Knocky</td>
    <td>Flor</td>
    <td>Ella</td>
    <td>Juan</td>
  </tr>
  <tr>
    <td>Breed</td>
    <td>Jack Russell</td>
    <td>Poodle</td>
    <td>Streetdog</td>
    <td>Cocker Spaniel</td>
  </tr>
  <tr>
    <td>Age</td>
    <td>16</td>
    <td>9</td>
    <td>10</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Owner</td>
    <td>Mother-in-law</td>
    <td>Me</td>
    <td>Me</td>
    <td>Sister-in-law</td>
  </tr>
  <tr>
    <td>Eating Habits</td>
    <td>Eats everyone's leftovers</td>
    <td>Nibbles at food</td>
    <td>Hearty eater</td>
    <td>Will eat till he explodes</td>
  </tr>
</table>
```
**Result**:
<table>
  <tr>
    <td>&nbsp;</td>
    <td>Knocky</td>
    <td>Flor</td>
    <td>Ella</td>
    <td>Juan</td>
  </tr>
  <tr>
    <td>Breed</td>
    <td>Jack Russell</td>
    <td>Poodle</td>
    <td>Streetdog</td>
    <td>Cocker Spaniel</td>
  </tr>
  <tr>
    <td>Age</td>
    <td>16</td>
    <td>9</td>
    <td>10</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Owner</td>
    <td>Mother-in-law</td>
    <td>Me</td>
    <td>Me</td>
    <td>Sister-in-law</td>
  </tr>
  <tr>
    <td>Eating Habits</td>
    <td>Eats everyone's leftovers</td>
    <td>Nibbles at food</td>
    <td>Hearty eater</td>
    <td>Will eat till he explodes</td>
  </tr>
</table>

## Full feature Table Example


## Merge two cells in a Column HTML table

To merge two cells in a column, you use colspan="2". Example:

**Code:**
```
<table>
  <tr>
    <th colspan="4">Animals</th>
  </tr>
  <tr>
    <td colspan="2">Mammals</td>
    <td colspan="2">Birds</td>
  </tr>
  <tr>
    <td>Cow</td>
    <td>Horse</td>
    <td>Chicken</td>
    <td>Ducks</td>
  </tr>
```
**Result:**
<table>
  <tr>
    <th colspan="4">Animals</th>
  </tr>
  <tr>
    <td colspan="2">Mammals</td>
    <td colspan="2">Birds</td>
  </tr>
  <tr>
    <td>Cow</td>
    <td>Horse</td>
    <td>Chicken</td>
    <td>Ducks</td>
  </tr>
</table>
View the result on codepen

## Merge two cells in a row HTML table

To merge two cells in a row, you use colspan="2". Example:

**Code**
```
<table>
  <tr>
    <td>Stallion</td>
    <td>Horse</td>
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
**Result**
<table>
  <tr>
    <td>Stallion</td>
    <td>Horse</td>
  </tr>
  <tr>
    <th rowspan="2">Chicken</th>
    <td>Hen</td>
  </tr>
  <tr>
    <td>Rooster</td>
  </tr>
</table>

<a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics">Resources: Table basics MDN(Mozilla Development Network)</a>