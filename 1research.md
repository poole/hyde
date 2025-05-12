---
layout: page
title: Research
permalink: /research/
---

# Projects

## Knowledge Graphs

**Building High-quality Knowledge Graphs.** Using and developing Knowledge Graph technologies and methods to structured data and to connect them to existing biological knowledge. These structures facilitate analysis and interpretation of complex data. We are contributing to a groundbreaking field by developing tools and methods to build, assess and investigate Knowledge Graphs and applying them to solve challenges in biology and health.


<details>
  <summary class="research">MicW2Graph</summary>  
  <div style="text-align: center; margin-bottom: 20px;">
    <a href="https://github.com/Multiomics-Analytics-Group/MicW2Graph" target="_blank">
      <img src="https://raw.githubusercontent.com/Multiomics-Analytics-Group/MicW2Graph/main/images/MicW2Graph_logo.svg" alt="MicW2Graph_logo" width="250px">
    </a>
  </div>
  <p>In this project, we investigated the microbiome of the <b>wastewater treatment</b> (WWT) process to build <b>MicW2Graph</b>, an open-source <b>knowledge graph</b> that integrates metagenomic and metatranscriptomic information with their biological context, including biological processes, environmental and phenotypic features, chemical compounds, and additional metadata. We developed a workflow to collect meta-omics datasets from <a href="https://www.ebi.ac.uk/metagenomics" target="_blank">MGnify</a> and infer potential interactions among microorganisms through <b>microbial association networks</b>. MicW2Graph enables the investigation of research questions related to WWT, focusing on aspects such as microbial connections, community memberships, and potential ecological functions.</p>
  <p>The following figure shows the general workflow of the MicW2Graph project:</p>
  <a href="#zoom-MicW2Graph-workflow">
    <img src="https://raw.githubusercontent.com/Multiomics-Analytics-Group/MicW2Graph/main/images/Methods_MicW2Graph.svg"
        alt="MicW2Graph Workflow"
        style="cursor: zoom-in; max-width: 100%;">
  </a>
  <!-- Zoom overlay -->
  <div id="zoom-MicW2Graph-workflow" class="zoom-overlay">
    <a href="#MicW2Graph-workflow" style="text-decoration: none;">
      <img src="https://raw.githubusercontent.com/Multiomics-Analytics-Group/MicW2Graph/main/images/Methods_MicW2Graph.svg"
          alt="Zoomed_MicW2Graph Workflow"
          style="max-width: 90%; max-height: 90%; cursor: zoom-out;
                  transform: translate(5%, -5%);">
    </a>
  </div>
</details>


<details>
  <summary class="research">KGBioGraphy</summary>  
  <p><b>KGBioGraphy</b> is a manually-curated knowledge graph that contains information of the data sources and usecases of published biological/biomedical knowledge graphs (BKGs). Currently, there are 69 BKGs summarized within KGBioGraphy. Each BKG within KGBioGraphy is represented by an ego network, linking the BKG to its publication, data sources (e.g., databases and ontologies), node and relationship types it contains, and usecases.</p>
  <p>We incorporated the open access BKG publications and KGBioGraphy into a corrective Retrievcal-Augmented Generation (RAG) model which provides a large language model (LLM) with a context-rich prompt to improve LLM response performance. <i>Coming soon:</i> Users will soon be able to interact with the KG-BioGraphy RAG through a streamlit interface and API.</p>
  <p>The following is a flow diagram of the Retrieval-Augmented Generation (RAG) model and KG-BioGraphy:</p>
  <a href="#zoom-KGBioGraphy-workflow">
    <img src="{{ site.baseurl }}/public/assets/BKGR LLM-RAG neo4j model.png"
        alt="KGBioGraphy Workflow"
        style="cursor: zoom-in; max-width: 100%;">
  </a>
  <!-- Zoom overlay -->
  <div id="zoom-KGBioGraphy-workflow" class="zoom-overlay">
    <a href="#KGBioGraphy-workflow" style="text-decoration: none;">
      <img src="{{ site.baseurl }}/public/assets/BKGR LLM-RAG neo4j model.png"
          alt="Zoomed_KGBioGraphy Workflow"
          style="max-width: 90%; max-height: 90%; cursor: zoom-out;
                  transform: translate(5%, -5%);">
    </a>
  </div>
  <p class="figure">(A) RAG Architecture workflow.</p> 
  <p class="figure">(B) A vector database (DB) comprising vector representations of text snippets from the publications included in the review.</p>
  <p class="figure">(C) KG-BioGraphy Neo4j DB.</p>
  <p class="figure">(D) The retrieved contexts are used to query 1) the LLM and 2) the KG-BioGraphy DB to generate a text and subgraph response, respectively, which is outputed to the user.</p>
  <p class="figure" style="font-size: 0.6rem;">This figure was created on Biorender.com.</p>
</details>

------------------------

## Graph Machine Learning

**Developing and Applying Novel Methods on Graphs.** Unleashing the power of Machine Learning on Graphs, a cutting-edge approach to extracting valuable insights from network data. We explore how this fusion of machine learning and graph theory helps to recognize patterns, generate predictions, and discovering new knowledge across a multitude of applications, including biological and medical networks.

------------------------

## Microbial Communities

**Exploring Microbial Communities and their Environments.** Integrating multiple biological resources to unravel the assembly, interaction and adaptation mechanisms of microbial networks, offering insights into their functions and inpact on ecosystems, and how changes affect those communities.


<iframe src="{{ site.baseurl }}/public/cluster_8.html" width="600" height="450" style="border:0;"></iframe>



------------------------

## Multimodal Data

**Implementing tools to process, integrate, and analyse multimodal data.** Diving into the benefits of harmonising multimodal data that converge to provide a comprehensive view of complex biological systems. Specifically we are interested in high-throughput multi-omics data generated using Mass spectrometry technology (proteomics and metabolomics) and metaomics data (metagenomics and metaproteomics).

------------------------

## Open Science

**Data Science Democratisation.** Focusing on data literacy training as a means to reduce inequality, and promoting open science by making all research, data content, and software open and accessible.


****
****


# Publications

Ayala-Ruano, S., Webel, H., & Santos, A. (2025). _VueGen: Automating the generation of scientific reports_. bioRxiv. [https://doi.org/10.1101/2025.03.05.641152](https://doi.org/10.1101/2025.03.05.641152)