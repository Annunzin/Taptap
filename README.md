#=======Cahier des charges du projet Tauptaup=======

## Introduction

Le projet lancé par notre groupe s'intitule "Tauptaup".
Il aura pour but la création d'un petit jeu similaire au Chasse Taupes.
L'utilisateur arrivera sur un écran en rentrant l'adresse du serveur et choisira un pseudo. 
Il va ensuite pouvoir jouer au jeu et taper sur les taupes affichées à l'écran à l'aide des boutons connectés à l'Arduino.
Son score va grimper au fur et à mesure qu'il tape des taupes et sera affiché sur le petit écran connecté à l'Arduino.


### Technologies utilisées


- Web(node.js/HTML) : La partie web gèrera le serveur web et l'hébergement du client.


#=======Gestion des tâches======

- Rédaction du cahier des charges : Nicolas.

## ======Spécificités Software======


### Développement applicatif (Jérémie et Nicolas)

- Création du serveur web. 
- Création de la page web envoyée au client.
- Récupération des états des boutons et association avec le tableau de taupes.
- Gestion de l'apparition aléatoire des taupes (tableau).
- Gestion du scoring.
- (OPTIONNEL) Ajout d'un système multijoueurs.



## ======Spécificités Hardware======

### Besoins matériels

- Un Arduino Mega 2560.
- Un display (1602).
- Un Keypad 4x4.
- (OPTIONNEL) Un buzzer.


### Montage

- Branchement du matériel sur le Arduino

### Développement applicatif (Victor et Guillaume)

- Gestion des états des 16 boutons.
- Gestion de listeners pour le score/les messages envoyés par le serveur.


