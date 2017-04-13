#=======Cahier des charges du projet Tauptaup=======

## Introduction

Le projet lancé par notre groupe s'intitule "Tauptaup".
C'est un jeu similaire au Chasse Taupes, où le but est de taper sur des taupes qui apparaitrons à l'écran.
Pour taper sur les taupes, nous utiliserons un keypad 4x4 connecté à un arduino.
Le score du joueur s'affichera sur la page web et sur un écran LCI connecté à l'arduino.
Le jeu est accessible depuis un navigateur web.
Chaque faute diminue le score et chaque taupe frappée l'augmente.

### Technologies utilisées

- Web(node.js/HTML) : La partie web gèrera le serveur web et l'hébergement du client.
- Arduino(C/C++)

#=======Gestion des tâches======

- Rédaction du cahier des charges : Nicolas.
- Mise en place du serveur Web : Jeremie
- Programmation Arduino : Guillaume
- Interface web : Victor
- Communication client/serveur : Jeremie
- Algorithme et programmation du jeu : Jeremie
- Connexion Arduino / Serveur : Guillaume
- Gestion hardware : Victor / Nicolas
- Conception de la boite et esthétique de l'arnuido : Nicolas 

## ======Spécificités Software======

### Modules Node.js

- rebuild : permet la comptatibilité windows/linux du projet
- express : permet de créer des routes sur le serveur web
- socket.io : permet de créer une connexion entre le client et le serveur
- serialport : permet d'écouter et d'écrire sur un port serie

### Modules Arduino

- Keypad.h : gestion du keypad
- LiquidCrystal_I2C.h : gestion de l'écran LCI

### Développement applicatif

- Création du serveur web. 
- Création de la page web envoyée au client.
- Récupération des états des boutons et association avec le tableau de taupes.
- Gestion de l'apparition aléatoire des taupes
- Gestion du scoring.
- Affichage sur écran LCI (Arduino)
- (OPTIONNEL) Ajout d'un système multijoueurs.



## ======Spécificités Hardware======

### Besoins matériels

- Un Arduino Mega 2560.
- Un display (1602).
- Un Keypad 4x4.


### Développement applicatif

- Gestion des états des 16 boutons.
- Gestion affichage du score sur écran Arduino
- Gestion de listeners pour le score/les messages envoyés par le serveur.


