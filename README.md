# beehivemonitoring

**présentation du projet**

Dans le cadre du cours "visulisation de données" donné par le professeur Isaac Pante, nous avons créer deux "linechart" (graphiques linéaires) interactifs. Le but de ce projet est de s'intéresser à trois type de données essentiels pour un apiculteur. Il s'agit de la température, le poids et l'humidité qui reigne dans la ruche. Ces données sont récoltées à l'aide de capteurs qui sont intégrés à la ruche et permettent à l'apiculteur de s'assurer de la bonne santé de l'essaim. Pour ce projet, nous avons utilisé des données issues de deux ruches qui se trouvent en Allemagne(https://www.kaggle.com/datasets/se18m502/bee-hive-metrics), mais à terme nous aimerions pouvoir réutiliser le script afin de pouvoir visualiser les données produites par notre propre ruche et qui se trouve en Valais.



**Explication de la visualisation:**

Nous avons décidé de séparer les données de température et d'humidité des données de poids. En effet, il est très utile pour l'apiculteur de pouvoir comparer ces deux **variables (je sais pas si c'est le bon terme**, alors que la comparaison avec le poids n'a pas de réel intérêt. 
L'utilisateur a ensuite la possibilité d'afficher les données qui l'intéresse. Il peut par exemple comparer la température qui règne au sein de la ruche de Wurzburg et celle de Schwartau en sélectionnant les checkbutton respectifs et en déselectionnant les checkbutton d'humidité. le But est de laisser le plus de liberté que possible à l'utilisateur afin qu'il puisse afficher les données qui lui semblent pertinentes. 



**difficultées rencontrées**

Nous avons principalement rencontré des difficultés au niveau des jeux de données. Un tri assez conséquent des données a été nécessaire pour que la visualisation fonctionne de manière convenable. Nous avons par exemple dû fortement réduire la quantité de données relatives au poids. En effet, le capteur était réglé pour prendre une mesure toutes les 5 minutes ce qui a considérablement augmenté le temps de chargement de la visualtion. Nous nous sommes donc limités à deux mesures par jour ce qui est largement suffisant. 
Comme on peut le voir dans la visualisation de **à compléter** il y a une erreur dans les données. probablement que le capteur a connu un disfonctionnement. C'est des choses qui sont inévitable et qui faussent la visualisation. Malheureusement, on ne peut rien faire pour corriger cela à part être attentif aux variations étranges qui peuvent indiquer un problème au niveau de la prise de mesure.   
 

données sur le poids, la température interne et externe, l'humidité, acoustique
use anomaly detection, selon certaines données, warning, notification

data from https://www.kaggle.com/datasets/se18m502/bee-hive-metrics

2 beehives : Schwartau & Wurzburg
weight, humidity, temperature

Documentation
https://observablehq.com/@observablehq/plot-line?collection=@observablehq/plot
