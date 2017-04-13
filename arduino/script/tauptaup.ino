
/* YourDuino.com Example Software Sketch
 16 character 2 line I2C Display
 Backpack Interface labelled "A0 A1 A2" at lower right.
 ..and
 Backpack Interface labelled "YwRobot Arduino LCM1602 IIC V1"
 MOST use address 0x27, a FEW use 0x3F
 terry@yourduino.com */

/*-----( Import needed libraries )-----*/
//#include <Wire.h>  // Comes with Arduino IDE
// Get the LCD I2C Library here: 
// https://bitbucket.org/fmalpartida/new-liquidcrystal/downloads
// Move any other LCD libraries to another folder or delete them
// See Library "Docs" folder for possible commands etc.
#include <LiquidCrystal_I2C.h>

#include <Keypad.h>
/*-----( Declare Constants )-----*/
/*-----( Declare objects )-----*/
// set the LCD address to 0x27 for a 16 chars 2 line display
// A FEW use address 0x3F
// Set the pins on the I2C chip used for LCD connections:
//                    addr, en,rw,rs,d4,d5,d6,d7,bl,blpol
LiquidCrystal_I2C lcd(0x3F, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);  // Set the LCD I2C address

const byte ROWS = 4; //4 lignes
const byte COLS = 4; //4 colonnes
char keys[ROWS][COLS] = {
  {'0','1','2','3'},
  {'4','5','6','7'},
  {'8','9','A','B'},
  {'C','D','E','F'}
};
//Brancher le clavier sur 2 3 4 5 (colonnes) et 6 7 8 9 (lignes)
byte rowPins[ROWS] = {9, 8, 7, 6}; //Lignes
byte colPins[COLS] = {5, 4, 3, 2}; //Colonnes
// Connections des touches
/*
S1  contact 4 8
S2  contact 3 8
S3  contact 2 8
S4  contact 1 8
S5  contact 4 7
S6  contact 3 7
S9  contact 4 6
S10  contact 3 6
S11  contact 2 6
S12  contact 1 6
S13  contact 4 5
S14  contact 3 5
S15  contact 2 5
S16  contact  1 5
*/

// Initialiser une instance de la classe keypad
Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );


/*-----( Declare Variables )-----*/
//NONE

void setup()   /*----( SETUP: RUNS ONCE )----*/
{
  Serial.begin(9600);  // Used to type in characters

  lcd.begin(16,2);   // initialize the lcd for 16 chars 2 lines, turn on backlight
 
  // Pour activer l'état HOLD
  unsigned int time_hold = 4;
  keypad.setHoldTime(time_hold);
 
  //Anti rebond
  unsigned int time_anti_rebond = 4;  //4 ms
  keypad.setDebounceTime(time_anti_rebond);
      



}/*--(end setup )---*/


void loop()   /*----( LOOP: RUNS CONSTANTLY )----*/
{
      int i =0;
      char key = keypad.getKey();
      char message[10] ;
      if (key != NO_KEY){
        Serial.write(key);
      }
  //{
    
    // when characters arrive over the serial port...
    if (Serial.available()) {
     // if (Serial.read() ){
      // wait a bit for the entire message to arrive
      delay(100);
      // clear the screen

      //lcd.setCursor(0,1);
      // read all the available characters
      //message = Serial.read() ;
      //lcd.setCursor(0,0);
      while (Serial.available() > 0) {
        
        // display each character to the LCD
        if (i==16){
          lcd.setCursor(0,1);
        }
        char c = Serial.read();
        if (c == '?'){
          lcd.clear(); 
          i=0;
        }else {
          lcd.print(c);
          i++;
        }
         
       
      }
   
    }
    //}
  

}/* --(end main loop )-- */


/* ( THE END ) */
