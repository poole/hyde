---
id: 547
title: What is a react component?
date: 2020-04-01T15:15:16+00:00
author: avic
layout: post
guid: https://learn.avicndugu.com/?p=547
permalink: /what-is-a-react-component/
categories:
  - Javascript
  - React
---
A React component is an independent piece of your complete user interface UI. Using a component allows you to think about how to manipulate it in isolation from the rest of the user interface.

If I had a blog-post UI, it might have three components:

<li style="list-style-type: none;">
  <ol>
    <li>
      The post component containing the heading and the content components.
    </li>
    <li>
      heading component containing the heading text.
    </li>
    <li>
      The content component containing a paragraph of text.
    </li>
  </ol>
</li>

<img src="/public/2020-04-01-174916_1280x800_scrot.png" alt="Component visualisation" /> 

## The different kinds of React components

There are two types of react components. They are named according to how you create them.

### 1. Function components

You can create a component in React by just using a simple Javascript function. The function component can look looks like this one below.

<pre>import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Start of react function component
function BlogPost() {
  return &lt;h1&gt;Rubberband powered Planes&lt;/h1&gt;;
}
// End of a function component

ReactDOM.render(&lt;BlogPost /&gt;, document.getElementById('root'));</pre>

You can pass properties(props) to the function like this:

<pre>import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Start of react function component
function BlogPost(props) {
  return &lt;h1&gt;{props.title}&lt;/h1&gt;;
}
// End of a function component

ReactDOM.render(&lt;BlogPost title="Rubberband powered Planes"/&gt;, document.getElementById('root'));</pre>

### 2. Class components

You create this component by using a class defined in ES6 Javascript.

<pre>import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Start of a class component
class BlogPost extends React.Component {
render() {
  return &lt;h1&gt;Rubberband powered Planes&lt;/h1&gt;;
}
// End of react function component

ReactDOM.render(&lt;BlogPost /&gt;, document.getElementById('root'));</pre>

When you add the properties(props) to the react component.

<pre>import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class BlogPost extends React.Component {
 render() {
    return &lt;h1&gt;{this.props.title}&lt;/h1&gt;;
 }
}
// End of react function component

ReactDOM.render(&lt;BlogPost title="Rubberband powered Planes"/&gt;, document.getElementById('root'));</pre>

The complete blogpost component with the heading and content components can then become:

<pre>import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Heading(props) {
  return &lt;h1&gt;{props.title}&lt;/h1&gt;;
}

function Content(props) {
  return &lt;p&gt;{props.bodytext}&lt;/p&gt;;
}

class BlogPost extends React.Component {
  render() {
    return (
            &lt;div&gt;
                &lt;Heading title="Rubberband powered Planes"/&gt;
                &lt;Content bodytext="This is a blob of text about Rubberband powered planes. They are only able to fly for a short time because the rubber band can only store a limited amount of energy" /&gt;
            &lt;/div&gt;
        )
    }
}

ReactDOM.render(&lt;BlogPost /&gt;, document.getElementById('root'));</pre>

## What kind of components should I use?

I started learning React this week so I am in no position to advice on which method to use. However, I am mainly using class based components in the current [practice project](https://learn.avicndugu.com/projects/). I found the [React&#8217;s official documentation](https://reactjs.org/docs/components-and-props.html) explanation very helpful on this question.