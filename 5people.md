---
layout: page
title: People
permalink: /people/
---

<html>

<head>

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
  html {
    box-sizing: border-box;
  }

  h1 {
  padding-top: 50px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .column {
    float: left;
    width: 33.3%;
    margin-bottom: 16px;
    padding: 0 8px;
  }

  h2 {
    font-size: 24px; /* Default font size */
    max-width: 100%; /* Ensure it doesn't exceed the container width */
    white-space: normal; /* Allow wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Add ellipsis for overflowing text */
  }

  p {
    max-width: 100%; /* Ensure it doesn't exceed the container width */
    overflow-wrap: break-word; /* Break long words */
    word-wrap: break-word; /* For older browsers */
    white-space: normal; /* Allow wrapping */
  }

  @media screen and (max-width: 650px) {
    .column {
      width: 100%;
      display: block;
    }
    h2 {
      font-size: 18px;
    }
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 5px; 
  }

  .card img {
    display: block;
    margin: 0 auto;
  }

  .container {
    padding: 0 16px;
  }

  .container::after, .row::after {
    content: "";
    clear: both;
    display: table;
  }

  .title {
    color: grey;
  }

  .button {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
  }

  .button:hover {
    background-color: #555;
  }

</style>

</head>

<body>

<br>

<h1>Meet The Team</h1>

<div class="row">
  <h2>Multi-omics Network Analytics (MoNA)</h2>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/ASD.jpeg" alt="Alberto" style="width:45%">
      <div class="container">
        <h2>Alberto Santos</h2>
        <p class="title">Director, Informatics Platform</p>
        <p class="title">Group Lead</p>
        <p>albsad@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/ALP.jpeg" alt="Angel" style="width:45%">
      <div class="container">
        <h2>Angel L. Phanthanourak</h2>
        <p class="title">PhD Student</p>
        <p>anglup@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/asar.jpg" alt="Sebastian" style="width:70%">
      <div class="container">
        <h2>Sebastian Ayala Ruano</h2>
        <p class="title">Research Assistant</p>
        <p>asaru@dtu.dk</p>
      </div>
    </div>
  </div>
</div>

<div class="row">

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/txell.jpeg" alt="Txell" style="width:45%">
      <div class="container">
        <h2>Txell Amigo</h2>
        <p class="title">Research Assistant</p>
        <p>txeami@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/marco.jpeg" alt="Marco" style="width:45%">
      <div class="container">
        <h2>Marco Reverenna</h2>
        <p class="title">PhD Student</p>
        <p>marcor@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/juik.jpeg" alt="Jui-Tse" style="width:45%">
      <div class="container">
        <h2>Jui-Tse Ko</h2>
        <p class="title">PhD Student</p>
        <p>juik@dtu.dk</p>
      </div>
    </div>
  </div>

</div>

<div class="row">

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/alzub.jpeg" alt="Alexander" style="width:45%">
      <div class="container">
        <h2>Alexander Zubov</h2>
        <p class="title">PhD Student</p>
        <p>alzub@dtu.dk</p>
      </div>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/binsun.jpeg" alt="Binhuan" style="width:45%">
      <div class="container">
        <h2>Binhuan Sun</h2>
        <p class="title">PhD Student</p>
        <p>binsun@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/edir.jpeg" alt="Edir" style="width:45%">
      <div class="container">
        <h2>Edir Sebastian Vidal Castro</h2>
        <p class="title">MSc Student & Student Assistant</p>
        <p>s243564@dtu.dk</p>
      </div>
    </div>
  </div>

</div>

<div class="row">
  <h2>Data Science Platform</h2>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/APC.jpeg" alt="Albert" style="width:45%">
      <div class="container">
        <h2>Albert Pallejà Caro</h2>
        <p class="title">Team Lead Data Science Platform</p>
        <p>apca@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/JBJ.jpeg" alt="Jakob" style="width:45%">
      <div class="container">
        <h2>Jakob B. Jespersen</h2>
        <p class="title">Data Scientist</p>
        <p>jbeje@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/hw.jpeg" alt="Henry" style="width:45%">
      <div class="container">
        <h2>Henry Webel</h2>
        <p class="title">Senior Data Scientist</p>
        <p>heweb@dtu.dk</p>
      </div>
    </div>
  </div>

</div>

<div class="row">

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/jasge.jpeg" alt="Juliana" style="width:45%">
      <div class="container">
        <h2>Juliana Assis</h2>
        <p class="title">Senior Data Scientist</p>
        <p>jasge@dtu.dk</p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src="{{ site.baseurl }}/public/assets/sebschu.jpeg" alt="Sebastian" style="width:45%">
      <div class="container">
        <h2>Sebastian Schulz</h2>
        <p class="title">Senior Data Scientist</p>
        <p>sebschu@dtu.dk</p>
      </div>
    </div>
  </div>

</div>
</body>
</html>
