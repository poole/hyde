---
layout: post
title: "Temperatura Promedio en México (Parte 1)"
output: html_document
excerpt_separator: <!--more-->
categories: blog
tags: temperatura r exploratorio
---



<div class="message">
  En este primer análisis, nos damos a la tarea de explorar las variaciones de temperatura desde 1985 en los 32 estados de la República Mexicana.
</div>

México es uno de los países que cuenta con uno de los sistemas climáticos más diversos del mundo. Uno de los factores que contribuye es la situación geográfica del país, ubicándolo en un área atravesada por el **Trópico de Cáncer**.

<!--more-->

> "México presenta un gran variedad de climas; áridos en el norte del territorio, cálidos húmedos y subhúmedos en el sur, sureste y climas fríos o templados en las regiones geográficas elevadas."

> Instituto Nacional de Estadística y Geografía ([INEGI](http://www.inegi.org.mx/geo/contenidos/recnat/clima/))

Por lo mismo, es posible encontrar climas fríos a unos cuántos cientos de kilómetros de climas calurosos. Además, algunos estados de la República pueden mostrar una gran variabilidad climática.

> El más notable por sus variaciones es el clima del estado de **Durango**, donde se dan las *temperaturas más bajas del país*, que llegan en ocasiones a los -26 <c2><b0>C, y las *más altas* en el desierto de Mexicali, **Baja California** que en ocasiones supera los 50 <c2><b0>C.

> Wikipedia: [México](https://es.wikipedia.org/wiki/M%C3%A9xico#Clima)

A continuación presentamos un análisis exploratorio de la temperatura promedio a nivel mensual estatal desde 1985 a finales del 2015, medida a través de estaciones convencionales y automáticas. Todo el código necesario para el análisis fue desarrollado en [R](https://www.r-project.org/) y se encuentra disponible en nuestro [repositorio](https://github.com/mexicoendatos/Mexico-Data/tree/master/R/Temperature/TemperatureMax) en GitHub. El código que genera este post se encuentra en este [sitio](https://github.com/mexicoendatos/mexicoendatos.github.io/blob/master/_R/2016-08-05-Temperatura-Promedio-01.Rmd).

## Datos de Temperatura

Los datos fueron proveídos por la Comisión Nacional del Agua (CONAGUA) y se encuentran disponibles en la página de [datos abiertos](http://datos.gob.mx/busca/dataset/temperatura-promedio-excel) del Gobierno de la República Mexicana. Éstos fueron leídos directamente del sitio web para facilitar la reproducibilidad del análisis. Posteriormente, los datos fueron preprocesados para poder trabajar con ellos adecuadamente en R, y el resultado se muestra en la siguiente tabla. Las variables a considerar son: la entidad federativa, el año, el mes y la temperatura correspondiente.







<p> 
<iframe frameborder="0" width="700" height="650" 
        sandbox="allow-same-origin allow-scripts"
        scrolling="no" seamless="seamless"
        src="/widgets/2016-08-05-Temperatura-Promedio-01/temperature_data.html">
</iframe>
</p> 

Primero, graficamos un [mapa de calor](https://en.wikipedia.org/wiki/Heat_map) de los valores en la Tabla 1 para cada uno de los estados. El gráfico que obtenemos muestra una serie de patrones interesantes a nivel estatal. Las más interesantes las resumimos a continuación. 

![testing](/figs/2016-08-05-Temperatura-Promedio-01/plotting-1.png)





### El estado más caliente: **Tabasco**

El estado más caliente es **Tabasco**, con una temperatura promedio de **26.84 ºC** en 30 años.

![testing](/figs/2016-08-05-Temperatura-Promedio-01/hottest-1.png)

### El estado más frío: **Tlaxcala**

El estado más frío es **Tlaxcala**, con una temperatura promedio de **14.44 ºC** en 30 años. 

![testing](/figs/2016-08-05-Temperatura-Promedio-01/coldest-1.png)



### El estado más variable: **Sonora**

El estado con los cambios de temperatura más grandes es **Sonora**, con una variabilidad de temperatura promedio anual de **6.0964 ºC**. 

![testing](/figs/2016-08-05-Temperatura-Promedio-01/most variable-1.png)

### El estado menos variable: **Guerrero**

El estado con la temperatura más estable es **Guerrero**, con una variabilidad de temperatura promedio anual de **1.339 ºC**. 

![testing](/figs/2016-08-05-Temperatura-Promedio-01/least variable-1.png)

### Mención Honorífica 1: **Chiapas**

Uno de los estados en donde se nota más el aumento de la temperatura en los últimos años es **Chiapas**. En 1985, la temperatura promedio anual fue de **19.24 ºC**. Para 2015, la temperatura promedio anual subió a **21.21 ºC**

![testing](/figs/2016-08-05-Temperatura-Promedio-01/unnamed-chunk-2-1.png)

### Mención Honorífica 2: **Nuevo León**

El estado de **Nuevo León** presenta un patrón interesante ya que del 2002 al 2005 la temperatura estatal disminuyó drásticamente respecto a años anteriores. Del 2006 en adelante, la temperatura aumentó y en promedio se ha mantenido más alta con respecto a las temperaturas previas al 2002.

![testing](/figs/2016-08-05-Temperatura-Promedio-01/unnamed-chunk-3-1.png)

<p> 
<iframe frameborder="0" width="710" height="350" 
        sandbox="allow-same-origin allow-scripts"
        scrolling="no" seamless="seamless"
        src="/widgets/2016-08-05-Temperatura-Promedio-01/NL.html">
</iframe>
</p> 

## Temperatura por Estado

Las temperaturas promedio de todos los estados se encuentran ordenadas en la siguiente tabla. Haz click en las flechas para ordenar alfabéticamente la entidad, o de forma ascendente (o decreciente) la temperatura promedio.

<p> 
<iframe frameborder="0" width="700" height="1350" 
        sandbox="allow-same-origin allow-scripts"
        scrolling="no" seamless="seamless"
        src="/widgets/2016-08-05-Temperatura-Promedio-01/mean_temperature.html">
</iframe>
</p> 

## Variabilidad de Temperatura por Estado

Las variablidades de temperatura promedio de todos los estados se encuentran ordenadas en la siguiente tabla. Haz click en las flechas para ordenar alfabéticamente la entidad, o de forma ascendente (o decreciente) la variabilidad promedio.

<p> 
<iframe frameborder="0" width="700" height="1350" 
        sandbox="allow-same-origin allow-scripts"
        scrolling="no" seamless="seamless"
        src="/widgets/2016-08-05-Temperatura-Promedio-01/mean_variability.html">
</iframe>
</p> 
