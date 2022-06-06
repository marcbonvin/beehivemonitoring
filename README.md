# BEEHIVEMONITORING

**Présentation du projet**

Dans le cadre du cours "visulisation de données" enseigné par le professeur Isaac Pante, nous avons créé deux "linechart" (graphiques linéaires) interactifs. Le but de ce projet est de s'intéresser à trois type de données essentiels pour un apiculteur. Il s'agit de la température, du poids et de l'humidité qui reigne dans la ruche. Ces données sont récoltées à l'aide de capteurs qui sont intégrés à la ruche et permettent à l'apiculteur de s'assurer de la bonne santé de la colonie. Pour ce projet, nous avons utilisé des données issues de deux ruches (**Schwartau et Wurzburg**) qui se trouvent en Allemagne (https://www.kaggle.com/datasets/se18m502/bee-hive-metrics), mais à terme nous aimerions pouvoir réutiliser le script afin de pouvoir visualiser les données produites par notre propre rucher en Valais.


**Explication de la visualisation**

Nous avons décidé de séparer les données du poids de celles de la température et de l'humidité. En effet, le poids est une variable importante pour l'apiculteur. L'évolution de ce dernier permet de détecter rapidement certains problèmes qui surviennent (essaimage, pillage, ...). Il aide également à choisir le moment de la récolte du miel et les périodes lors desquelles la ruche doit être nourrie (périodes froides, météo peu clémente, ...). 

Si la ruche **Wurzburg** suit une évolution logique du poids au fil des saisons, la ruche **Schwartau** présente quelques faits intéressants. Nous pouvons constater une chute abruptes en juin, août et novembre. Ces évènements peuvent correspondre à la récolte du miel par l'appiculteur (juin/aôut) et à la préparation de la ruche pour l'hiver (novembre). Les augmentations rapides des mois d'août, septembre et octobre (+/- 5kg) correspondent quant à eux au nourrissages de la ruche. 

<img width="1222" alt="Capture d’écran 2022-06-06 à 13 58 17" src="https://user-images.githubusercontent.com/81250617/172156527-03378e17-a291-4cd5-b0ef-fc3fa2f69750.png">

La comparaison des variables de la température et de l'humidité permet de pousser la surveillance plus loin et d'éviter certaines maladies par exemple. 

<img width="1222" alt="Capture d’écran 2022-06-06 à 13 58 05" src="https://user-images.githubusercontent.com/81250617/172156569-d086d387-d401-4d3b-a235-9cca7b70ec76.png">

L'utilisateur a la possibilité d'afficher les données qui l'intéresse. Il peut, par exemple, comparer la température qui règne au sein de la ruche de Wurzburg et celle de Schwartau en sélectionnant les boutons respectifs. Le But est de laisser le plus de liberté que possible à l'utilisateur afin qu'il puisse afficher les données qui lui semblent pertinentes. 

<img width="1222" alt="Capture d’écran 2022-06-06 à 14 02 05" src="https://user-images.githubusercontent.com/81250617/172156875-e99aa85f-144a-4c73-92b9-6d664bd9d338.png">


**Difficultées rencontrées**

Nous avons principalement rencontré des difficultés au niveau des jeux de données. Un tri assez conséquent des données été nécessaire pour que la visualisation fonctionne de manière convenable. Nous avons, par exemple, dû fortement réduire la quantité de données relatives au poids. En effet, le capteur était réglé pour prendre une mesure toutes les 5 minutes ce qui a considérablement augmenté le temps de chargement de la visualtion. Nous nous sommes donc limités à deux mesures par jour ce qui est, à notre sens, largement suffisant. De plus, les capteurs ont connu des disfonctionnement répétés. Nous avons donc décidé de supprimer les erreurs dans les données et de nous concentrer sur l'année 2017. 

L'interraction rendue possible avec les checkbuttons a également été un défi. En effet, la programmation de ces derniers a nécessité plusieurs essai avant que le résultat soit convainquant. 
