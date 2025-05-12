---
layout: page
title: Tools
permalink: /tools/
---

<details open>
  <summary>Clinical Knowledge Graph - CKG</summary>
  <h3>Integrating and Interpreting MS-based Proteomics Data</h3>
  <p>The Clinical Knowledge Graph (CKG) is a graph database with millions of nodes and relationships representing experimental data, databases, and scientific literature. Further, CKG is an open-source platform that allows easy expansion with new databases and experimental data types and it includes statistical and machine learning tools for faster proteomics analysis.</p>
  <p>We are currently working on a new version that will be more flexible and generalizable. <b>Stay tuned!</b></p>
  <a href="#zoom-ckg-workflow">
    <img src="{{ site.baseurl }}/public/ckg.jpeg"
        alt="ckg Workflow"
        style="cursor: zoom-in; max-width: 100%;">
  </a>
  <!-- Zoom overlay -->
  <div id="zoom-ckg-workflow" class="zoom-overlay">
    <a href="#ckg-workflow" style="text-decoration: none;">
      <img src="{{ site.baseurl }}/public/ckg.jpeg"
          alt="zoomed ckg Workflow"
          style="max-width: 90%; max-height: 90%; cursor: zoom-out;
                  transform: translate(5%, -5%);">
    </a>
  </div>
</details>


<details open>
  <summary>OrthoHPI 2.0</summary>
  <h2>Orthology–based Host–Parasite Protein–protein Interactions <a href="https://orthohpi.streamlit.app/">[link]</a></h2>
  <p>Understanding host-parasite interactions is vital for tackling infectious diseases. Due to the challenges in experimental identification, we propose a computational method to predict protein interactions between human and 18 eukaryotic parasites. Our approach leverages an orthology-based transfer of interactions, focusing on parasite secretomes and human membrane proteins. We also filter the host proteome based on the parasites' specific tissue tropisms. In this version, we added  cell-type specific expression annotations to provide further resolution of the host-parasite predicted interactions and we support interactions with structural information.</p>
  <h3>Giardia intestinalis Predicted PPI</h3>
  <iframe src="{{ site.baseurl }}/public/Gi_network.html" width="600" height="450" style="border:0;"></iframe>
</details>


<details open>
  <summary>Analytics Core (Acore) Library</summary>  
  <p>Acore, short for analytics core, is an open-source Python library to preprocess and analyse multi-omics data. It includes functionality related to preprocessing, e.g. for data normalization, missing value imputation or feature selection, and functionality for statistical data analysis, e.g. an analysis of covariance.</p> 
  <p>Acore is designed to be user-friendly and flexible, allowing users to easily apply different analysis strategies, testing effects of choosing specific steps.</p>
  <h4>Check out current recipes and the core libary documentation at <a href="https://analytics-core.readthedocs.io/">analytics-core.readthedocs.io</a></h4>
</details>


<details open>
  <summary>VueGen</summary>  
  <div style="text-align: center; margin-bottom: 20px;">
    <a href="https://github.com/Multiomics-Analytics-Group/vuegen" target="_blank">
      <img src="https://raw.githubusercontent.com/Multiomics-Analytics-Group/vuegen/main/docs/images/vuegen_logo.svg" alt="VueGen" width="250px">
    </a>
  </div>
  <p><b>VueGen</b> is a tool that automates the creation of <b>reports</b> from bioinformatics outputs, allowing researchers with minimal coding experience to communicate their results effectively. With VueGen, users can produce reports by simply specifying a directory containing output files, such as plots, tables, networks, Markdown text, HTML components, and API calls, along with the report format. Supported formats include <b>documents</b> (PDF, HTML, DOCX, ODT), <b>presentations</b> (PPTX, Reveal.js), <b>Jupyter notebooks</b> and <a href="https://streamlit.io/"><b>Streamlit</b></a> <b>web applications</b>.</p>
  <p>An overview of the VueGen workflow is shown in the figure below:</p>
  <a href="#zoom-vuegen-workflow">
    <img src="https://raw.githubusercontent.com/Multiomics-Analytics-Group/vuegen/main/docs/images/vuegen_graph_abstract.png"
        alt="VueGen Workflow"
        style="cursor: zoom-in; max-width: 100%;">
  </a>
  <!-- Zoom overlay -->
  <div id="zoom-vuegen-workflow" class="zoom-overlay">
    <a href="#vuegen-workflow" style="text-decoration: none;">
      <img src="https://raw.githubusercontent.com/Multiomics-Analytics-Group/vuegen/main/docs/images/vuegen_graph_abstract.png"
          alt="Zoomed_VueGen Workflow"
          style="max-width: 90%; max-height: 90%; cursor: zoom-out;
                  transform: translate(5%, -5%);">
    </a>
  </div>
  <p>VueGen offers various implementation options for both non-technical and experienced users. It is available as a <a href="https://pypi.org/project/vuegen/">Python package</a>, <a href="https://quay.io/repository/dtu_biosustain_dsp/vuegen">Docker image</a>, <a href="https://github.com/Multiomics-Analytics-Group/nf-vuegen/">nf-core module</a>, and <a href="https://github.com/Multiomics-Analytics-Group/vuegen/releases/tag/v0.3.2">cross-platform desktop application</a> with a user-friendly interface, making it accessible and customizable for different user needs and expertise levels.</p>
  <p>The documentation is available at <a href="https://vuegen.readthedocs.io/">vuegen.readthedocs.io</a>, where you can find detailed information of the package’s classes and functions, installation and execution instructions, and case studies to demonstrate its functionality.</p>
</details>


<details open>
  <summary>FermentDB</summary>
  <h3>A Standard Data Model for Precision Fermentation</h3>
  <div style="text-align: justify; margin: 2em 0;">
  <b>FermentDB</b> is a platform for bioprocess data <i>Integration</i>, <i>Analysis</i> and <i>Visualization</i>.<br><br>
    It is designed to address key challenges in precision fermentation by establishing a community standard for biofoundries. It streamlines the integration of high-throughput bioprocess data, supporting the development and scaling of biosustainable production processes.<br><br>
    As an open-source database, FermentDB addresses the main obstacles related to FAIR data principles. By providing a standardized data model, it offers the scientific community a powerful computational tool for bioprocess data integration.<br><br>
    It also supports the upscaling of research through descriptive analytics for fermentation monitoring, enabling more efficient scaling of biomanufacturing and reducing time to market for new bioproducts.<br><br> 
    By enabling seamless integration of new datasets from collaborators, including omics data and in silico testing and optimization, FermentDB reduces time and resource demands and accelerates innovation in biomanufacturing.
  </div>
  <p>A graphical image of FermentDB workflow is shown in the figure below:</p>
  <a href="#zoom-fermentdb-workflow">
    <img src="{{ site.baseurl }}/public/assets/graphical_abst_fermentDB.png"
        alt="Graphical_Abstract"
        style="cursor: zoom-in; max-width: 100%;">
  </a>
  <!-- Zoom overlay -->
  <div id="zoom-fermentdb-workflow" class="zoom-overlay">
    <a href="#fermentdb-workflow" style="text-decoration: none;">
      <img src="{{ site.baseurl }}/public/assets/graphical_abst_fermentDB.png"
          alt="Zoomed_Image"
          style="max-width: 90%; max-height: 90%; cursor: zoom-out;
                  transform: translate(5%, -5%);">
    </a>
  </div>
  <p>FermentDB is freely available on the website<a href="fermentdb.streamlit.app">fermentdb.streamlit.app</a></p>
  <p style="text-align: justify;">The application code is publicly  available in GitGub: <a href="https://github.com/Multiomics-Analytics-Group/FermentDB"> FermentDB Graph </a> and <a href="https://github.com/Multiomics-Analytics-Group/fermentdb_api"> FermentDB API</a>.</p>
</details>


<details open>
  <summary>gdbcore</summary>
  <h3>A Graph Database Builder python library</h3>
  <p><b>gdbcore</b> is a python library that can take your tables and transform them into graph databases in Networkx, graph-tool or Neo4j (v4). gdbcore is available for installation from <a href="https://pypi.org/project/gdbcore/">PyPI</a>.</p>
  <p>We are currently improving the project and the documentation. <b>Stay tuned!</b></p>
</details>


<!-- <details open>
  <summary>Additional Tool (Template)</summary>  

  <img src="url or path to img" width="10%" alt="example icon">

  <p>Paragraph of text inside</p>

  <h2>This is a subheader in the collapsable section.</h2>

  <p>More text here if you want</p>

</details> -->
