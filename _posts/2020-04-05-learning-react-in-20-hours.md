---
title: 'Learning React in 20 hours: 2nd attempt'
date: 2020-04-05T10:56:34+00:00
author: avic
layout: post
permalink: /learning-react-in-20-hours/
categories:
  - React
---
## Day 1: The first 2 hours(28th March 2020)

This article in its current state is not meant as a tutorial on react. It is collection of notes I took while learning React. This is my way of keeping a log of what I learnt. This article will help me easily pick up the concepts I learn in the past.

The first time I learn React, I prepared some notes but lost them. When I tried to recall what I had learnt, I drew a blank and since I had no notes to refer to, I had to relearn everything from scratch.

I decided to have another go at React after testing a little bit on Vue.

## Choosing learning materials

I researched for a selection of tutorials to follow along. I settled on two tutorials that seemed reasonable to me at the time:

<li style="list-style-type: none;">
  <ul>
    <li style="list-style-type: none;">
      <ul>
        <li>
          <a href="https://www.taniarascia.com/getting-started-with-react/">Tania Rascia&#8217;s React tutorial</a>
        </li>
        <li>
          <a href="https://reactjs.org/tutorial/tutorial.html">React&#8217;s official Tic-tac-toe tutorial</a>
        </li>
      </ul>
    </li>
  </ul>
</li>

I decided to first try the React&#8217;s official Tic-tac-toe project based tutorial.

## Installating Create-React-App

It took me about 15-20 minutes to install a create react app project.  
I used the following command to install this app.

<pre>npx create-react-app react-tutorial-2
cd react-tutorial-2
yarn start</pre>

After the last command, I got the following notification on the terminal:

<pre>You can now view react-tutorial-2 in the browser.
Local: http://localhost:3000
On Your Network: http://192.168.43.11:3000</pre>

I entered the url on the browser and the react project was live.

## Components in React

React is used to build user interfaces UI&#8217;s. You can build complex UI&#8217;s by building small parts called components.

There are different kind of components

1. React.Component subclasses

<pre>class ShoppingList extends React.Component {
render() {
  return (
    &lt;div className="shopping-list"&gt;
      &lt;h1&gt;Shopping List for {this.props.name}&lt;/h1&gt;
      &lt;ul&gt;
        &lt;li&gt;Instagram&lt;/li&gt;
        &lt;li&gt;WhatsApp&lt;/li&gt;
        &lt;li&gt;Oculus&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
   );
  }
}</pre>

<pre>// Example usage: &lt;ShoppingList name="Mark" /&gt;</pre>

Components tell react what it should show on screen/ display.  
A component takes in parameters, called props (short for “properties”), and returns a hierarchy of views to display via the render method.( I have no Idea what this means at this particular time).

The render method returns a description of what you want to see on the screen. React takes the description and displays the result.

Each React component is encapsulated and can operate independently; this allows you to build complex UIs from simple components.

## Starter code for Tic-tac-toe app

Delete files inside src by:

<pre>rm -f *
touch index.js index.css</pre>

Copy starter code for index.js and index.css

Inspecting the code, you’ll notice that we have three React components:

<li style="list-style-type: none;">
  <ul>
    <li style="list-style-type: none;">
      <ul>
        <li>
          Square
        </li>
        <li>
          Board
        </li>
        <li>
          Game
        </li>
      </ul>
    </li>
  </ul>
</li>

&nbsp;

They have this syntax:

<pre>class Square extends React.Component {
  render() {
    return (

    )
  }
}</pre>

## Passing a props from parent to child

Parent:

<pre>class Board extends React.Component {
  renderSquare(i) {
    return &lt;Square value={i} /&gt;;
}</pre>

Child:

<pre>class Square extends React.Component {
render() {
return (
&lt;button className="square"&gt;
{this.props.value}
&lt;/button&gt;
);
}
}</pre>

Passing props is how information flows in React apps, from parents to children.

Click event handler:

<pre>&lt;button className="square" onClick={()=&gt;{alert("clicked")}}&gt;
   {this.props.value}
&lt;/button&gt;</pre>

## React&#8217;s component State memory

Components use state to remember what has happened.  
React components can have state by setting this.state in their constructors. this.state should be considered as private to a React component that it’s defined in.

<pre>class Square extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      value:null
    };
  }
  render() {
    return (
      &lt;button className="square" 
       onClick={()=&gt;{alert("clicked")}}&gt;
           {this.props.value}
      &lt;/button&gt;
    );
  }
}</pre>

Finally instead of alert, let there be an X inside the square.

<pre>class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
render() {
  return (
    &lt;button
     className="square"
     onClick={() =&gt; this.setState({value: 'X'})}&gt;
     {this.state.value}
    &lt;/button&gt;
  );
 }
}</pre>

By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked. After the update, the Square’s this.state.value will be &#8216;X&#8217;, so we’ll see the X on the game board. If you click on any Square, an X should show up.

When you call setState in a component, React automatically updates the child components inside of it too.

In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start with a super(props) call.

### Personal Practice project

I practiced practice making simple components on personal project. You can see the code here.

## Day 2: Reacts props and state

Data is handled using properties(props) and state

Create an array of objects that will contain the data to be added to the table.  
This data should go to the most top level component.

<pre>class App extends React.Component {
  render() {
    const characters = [
    {
      name: "Character",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    }
   ]
    return (
      &lt;div className="app"&gt;
         &lt;Table /&gt;
         &lt;NewTable /&gt;
      &lt;/div&gt;
    )
  }
}</pre>

Pass the data to the child component (Table) with properties.  
Give the property a name: characterData

<pre>&lt;NewTable characterData={characters}/&gt;</pre>

Accessing the data on the child NewTable

<pre>const { characterData } = this.props</pre>

Pass the data to the child TableBody

<pre>&lt;TableBody characterData= {characterData}/&gt;</pre>

Lets pass the headings of the table as props  
1. Create an object in App component

<pre>const tableHeadings = {
  column1: "Name",
  column2: "Job"
}</pre>

2. Pass it to the child component Table

<pre>&lt;Table tableHeadings= { tableHeadings }/&gt;</pre>

3. Render the component in the table heading

<pre>const {tableHeadings} = this.props
  &lt;thead&gt;
    &lt;tr&gt;
       &lt;th&gt;{ tableHeadings.column1 }&lt;/th&gt;
       &lt;th&gt;{ tableHeadings.column2 }&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;</pre>

15:47

// create the data value that you want to keep track of in state  
state ={ count: 0 }

// create a callback function in the parent component

countKeeper = (childCount) => {  
this.setState({count: childCount})  
}  
Pass it as a props to the child Navbar  
<Navbar  
parentCallback = {this.callbackFunction}  
parentCountKeeper = {this.countKeeper}  
/>

in the child  
sendCount = ()=> {  
this.props.parentCountKeeper(10);  
}

add a button to call this function

<pre>&lt;button className="button" 
    onClick={()=&gt; this.sendCount()}&gt;
Button&lt;/button&gt;</pre>

This should modify the value of count on parent

You can read more here.

<https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf>

Full example:

<pre>import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// react pass data from parent to child
// Good solutions https://guide.freecodecamp.org/certifications/front-end-libraries/react/pass-state-as-props-to-child-components/
// Good explanation: https://www.freecodecamp.org/forum/t/react-pass-state-as-props-to-child-components/202933/4
// react pass data back from child to parent

// create the data value that you want to keep track of in state
// i.e. count: 0
// create a callback function in the parent component

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      message: "",
      count:0
     }
  }
countKeeper = (childCount) =&gt; {
   this.setState({count: childCount})
}
callbackFunction = (childData) =&gt; {
   this.setState({message: childData})
};
render() {
  return (
    &lt;div&gt;
       &lt;Navbar
       parentCallback = {this.callbackFunction}
       parentCountKeeper = {this.countKeeper}
       count= {this.state.count}
       /&gt;
       &lt;p&gt; {this.state.message} &lt;/p&gt;
       &lt;p&gt; {this.state.count}&lt;/p&gt;
    &lt;/div&gt;
    );
  }
};

class Navbar extends React.Component {
sendData = () =&gt; {
this.props.parentCallback("Hey Popsie, How’s it going?");
};
sendCount = ()=&gt; {
this.props.parentCountKeeper(5 );
}
render() {
return(
&lt;div className="header"&gt;
&lt;h1 id="my-logo" className="title"&gt;Picture learner&lt;/h1&gt;
&lt;button className="button" onClick={(e)=&gt; this.sendData(e)}&gt;Button&lt;/button&gt;
&lt;button className="button" onClick={()=&gt; this.sendCount()}&gt;Button&lt;/button&gt;
&lt;p&gt; {this.props.count}&lt;/p&gt;

&lt;/div&gt;
)
//you can call function sendData whenever you'd like to send data from child component to Parent component.
}
};

ReactDOM.render(&lt;App /&gt;, document.getElementById('root'))</pre>

Refactoring picture learner  
Create new component

<pre>class CycleButtons extends Component {
render(){
return(
&lt;div&gt;
&lt;button className="button" onClick={(e)=&gt; this.decrement(e)}&gt;Previous&lt;/button&gt;
&lt;button className="button" onClick={(e)=&gt; this.increment(e)}&gt;Next&lt;/button&gt;
&lt;/div&gt;
)
}
}

Add this in Items component
&lt;CycleButtons /&gt;</pre>