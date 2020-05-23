---
title: 'Why do we use Flexbox? &#8211; Answered'
date: 2019-08-19T11:00:31+00:00
author: avic
layout: post
permalink: /why-do-we-use-flexbox-answered/
categories:
  - CSS
---
We use flexbox because we want to:

<li style="list-style-type: none;">
  <ol>
    <li>
      display a collection of items in either the horizontal or vertical direction.
    </li>
    <li>
      control the dimensions of the items in that one dimension(horizontal or vertical) of your choice.
    </li>
    <li>
      control the spacing between the items.
    </li>
    <li>
      centering items.
    </li>
  </ol>
</li>

<!--more-->

## 1. Display a group of items(vertically or horizontally)

Flexbox is ideal for displaying a group of items because:

<li style="list-style-type: none;">
  <ul>
    <li>
      It allocates space to a group of items automatically.
    </li>
    <li>
      You can set the items to stay in one row or to reflow to a second or third row.
    </li>
    <li>
      If the number of the items changes(is not fixed, the size and order will be taken care of.)
    </li>
    <li>
      You can control the order of the items.
    </li>
  </ul>
</li>

## 2. Control the dimension of items

You can use flexbox if you want to maintain the ratio of width or height between the items.  
When you area using flexbox, you can create card components of equal width and height. Their heights will be the height of the card with the most content.

## 3. Control spacing between HTML elements

Flexbox has 3 ways to control the space between the elements. These are: space-around, space-evenly and space-between. These cater for majority of the issues that usually arose from setting the spacing between items.

## 4. Centering items

CSS makes centering items both horizontally and vertically straight forward. To center items horizontally, just set the flex direction to row. To center items vertically, set the flex direction to columns.

### Reasons to use flexbox

<li style="list-style-type: none;">
  <ul>
    <li>
      Flexbox is well supported by all major browsers.
    </li>
    <li>
      Flexbox syntax is easy to understand and pick up.
    </li>
  </ul>
</li>

### When not to use flexbox

Don&#8217;t use flexbox for the main layout of the page. Instead use media queries and max-width to create resposive pages.  
Don&#8217;t add flex property to all containers in the page. It is not a silver bullet. Instead, use it only when its the simplest solution to the problem of layout(alignment, scaling, or order) of containers.

### Why was flexbox introduced

Previously, CSS layout and positioning were some of the most difficult concepts for web designers, regardless of experience.  Infact some of the ways items were laidout involved using hacks. With CSS flexbox, positioning and layout is straight forward.  
With display: flexbox; designers and developers are also in control of the direction, alignment, and spacing of page elements.