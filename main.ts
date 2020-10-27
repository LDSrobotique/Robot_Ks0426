/**
 * Robot Ks0426 de Keyestudio sur micro:bit
 */
enum irLN { gauche, droite }
enum irSol {
    //% block="du vide"
    vide,
    //% block="noire"
    noire,
    //% block="blanche"
    blanche }
enum _touche {
    //% block="flêche Haut"
    irTH=70,
    //% block="flêche Bas"
    irTB=21,
    //% block="flêche Gauche"
    irTG=68,
    //% block="flêche Droite"
    irTD=67,
    //% block="OK"
    irTOK=64,
    //% block="1"
    ir1=22,
    //% block="2"
    ir2=25,
    //% block="3"
    ir3=13,
    //% block="4"
    ir4=12,
    //% block="5"
    ir5=24,
    //% block="6"
    ir6=94,
    //% block="7"
    ir7=8,
    //% block="8"
    ir8=28,
    //% block="9"
    ir9=90,
    //% block="*"
    irE=66,
    //% block="0"
    ir0=82,
    //% block="#"
    irD=74 }
enum _cRGB {
    //% block="Blanc"
    blanc,
    //% block="Rouge"
    rouge,
    //% block="Rouge clair"
    rougeC,
    //% block="Vert"
    vert,
    //% block="Vert clair"
    vertC,
    //% block="Bleu"
    bleu,
    //% block="Bleu clair"
    bleuC,
    //% block="Rose"
    rose,
    //% block="Rose clair"
    roseC,
    //% block="Jaune"
    jaune,
    //% block="Jaune clair"
    jauneC }
//% color="#04B404" icon="\uf17b"
//% groups="['Moteurs', 'Capteurs', 'LED']"
namespace Ks0426 {
/**
 * Initialisation du Robot Ks0426 de Keyestudio sur micro:bit
 */
function initialisation (): void {
    // Rendre tous les Pins utilisables par le robot
    //led.enable(false)
    // Pour le port série ?
    //pins.analogSetPitchPin(AnalogPin.P0)
    // Mettre les IR gauche (sur P2) et droite (sur P11) en PullUp
    pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
    // Initialiser les LEDs RGB et les moteurs
    // PCA9685.reset(67)
    PCA9685.init(67, 0)
    basic.pause(1000)
    // Éteindre les LEDs RGB
    eteindreLED()
    // Initialiser la bande à LEDs
    strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
    basic.pause(2000)
    strip.clear()
    strip.show()
}
// La vitesse de la roue doit être comprise entre -100 et 100 inclus.
// Si la vitesse est positive alors la roue tourne pour avancer sinon la roue tourne en sens inverse.
// fixSens renvoie 0 pour faire avancer la roue, 100 pour la faire reculer
function fixSens (vitesse: number) {
    if (vitesse >= 0) { return 0 } else { return 100 }
}
// fixVitesse renvoie un nombre compris entre 0 et 100 en fonction de vitesse qui
// est compris entre -100 et 100
function fixVitesse (vitesse: number) {
    if (vitesse > 100 || vitesse < -100) { return 100 }
    else { return Math.abs(vitesse)}
}
/**
 * Pour commander la roue gauche
 * - -100 < vitesse < 100
 * - vitesse négative pour reculer
 * - vitesse positive pour avancer
 */
//% blockId=Ks0426roueG
//% weight=30
//% block="roue gauche à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
//% 
export function roueG (vitesse: number): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, fixSens(vitesse), 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, fixVitesse(vitesse), 67)
}
/**
 * Pour commander le roue droite
 */
//% blockId=Ks0426roueD
//% weight=20
//% block="roue droite à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function roueD (vitesse: number): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, fixSens(vitesse), 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, fixVitesse(vitesse), 67)
}
//% blockId=Ks0426avancer
//% weight=70
//% block="avancer à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function avancer (vitesse: number): void {
    roueG(vitesse)
    roueD(vitesse)
}
//% blockId=Ks0426reculer
//% weight=40
//% block="reculer à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function reculer (vitesse: number): void {
    avancer(-vitesse)
}
//% blockId=Ks0426tournerD
//% weight=50
//% block="tourner à droite à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function tournerD (vitesse: number): void {
    roueG(vitesse)
    roueD(-vitesse)
}
//% blockId=Ks0426tournerG
//% weight=60
//% block="tourner à gauche à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function tournerG (vitesse: number): void{
    roueG(-vitesse)
    roueD(vitesse)
}
/**
 * Pour arrêter le robot
 */
//% blockId=Ks0426stopper
//% weight=10
//% block="stopper le mouvement"
//% group="Moteurs"
export function stopper (): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
/**
 * Retourne la distance de l'obstacle (en cm) qui se trouve devant
 */
//% blockId=Ks0426distanceObs
//% weight=40
//% block="distance obstacle devant"
//% group="Capteurs"
export function distanceObs (): number {
    // envoyer pulse
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.digitalWritePin(DigitalPin.P14, 0);
    control.waitMicros(2);
    pins.digitalWritePin(DigitalPin.P14, 1);
    control.waitMicros(10);
    pins.digitalWritePin(DigitalPin.P14, 0);
    // lire pulse
    return Math.idiv(pins.pulseIn(DigitalPin.P15, PulseValue.High, 500 * 58), 58)
}
/**
 * Retourne vrai si obstacle à moins de 10cm détecté devant
 */
//% blockId=Ks0426obstacleF
//% weight=30
//% block="obstacle devant"
//% group="Capteurs"
export function obstacleF (): boolean {
    if (distanceObs() < 10) { return true } else { return false }
}
/**
 * Retourne vrai s'il y a un obstacle sur la gauche
 */
//% blockId=Ks0426obstacleG
//% weight=20
//% block="obstacle à gauche"
//% group="Capteurs"
export function obstacleG (): boolean {
    if (pins.digitalReadPin(DigitalPin.P2) == 0) { return true } else { return false }
}
/**
 * Retourne vrai s'il y a un obstacle sur la droite
 */
//% blockId=Ks0426obstacleD
//% weight=10
//% block="obstacle à droite"
//% group="Capteurs"
export function obstacleD (): boolean {
    if (pins.digitalReadPin(DigitalPin.P11) == 0) { return true } else { return false }
}
/**
 * Suiveur de ligne
 * - Retourne vrai si détection d'une ligne noire
 */
//% blockId=Ks0426irLigneN
//% weight=9
//% block="[Suiveur de ligne] capteur $irLigneN au dessus d'une ligne noire"
//% group="Capteurs"
export function ligneNoire (irLigneN: irLN): boolean {
    switch (irLigneN) {
        case irLN.gauche :
            if (pins.digitalReadPin(DigitalPin.P13) == 1) { return true } else { return false }
            break
        case irLN.droite :
            if (pins.digitalReadPin(DigitalPin.P12) == 1) { return true } else { return false }
            break
    }
}
/**
 * Retourne vrai s'il y a du vide,
 * - une surface foncée ou
 * - une surface claire devant le robot
 */
//% blockId=Ks0426surfaceN
//% weight=8
//% block="[Capteur de sol] surface $irSurface"
//% group="Capteurs"
export function surface(irSurface: irSol): boolean {
    switch (irSurface) {
        case irSol.vide : // surface vide ou foncée
            if (pins.digitalReadPin(DigitalPin.P12) == 1 || pins.digitalReadPin(DigitalPin.P13) == 1)
                { return true } else { return false }
            break
        case irSol.noire :
            if (pins.digitalReadPin(DigitalPin.P12) == 1 || pins.digitalReadPin(DigitalPin.P13) == 1)
                { return true } else { return false }
            break
        case irSol.blanche : // surface claire
            if (pins.digitalReadPin(DigitalPin.P12) == 0 || pins.digitalReadPin(DigitalPin.P13) == 0)
                { return true } else { return false }
            break
    }
}
/**
 * Gestion de la télécommande infrarouge
 */
//% blochId=Ks0426telecommande
//% weight=7
//% block="touche télécommande = $irTouche"
//% group="Capteurs"
export function telecommande(irTouche: _touche): boolean {
    if (maqueen.IR_read() == irTouche) {
        return true
    } else {
        return false
    }
}
/**
 * Gestion des 2 LEDs RGB
 */
// led5 => LED Bleu, led6 => LED Vert et led7 => LED Rouge
// 0 => allumé à 100%, 75 => (100 - 75)% allumé et 100 => éteint (0% allumé)
function allumerRGB (led7: number, led6: number, led5: number): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, led5, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, led6, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, led7, 67)
}
//% blochId=Ks0426ledRGB
//% weight=80
//% block="les LED RGB s'éteignent"
//% group="LED"
export function eteindreLED (): void {
    allumerRGB (100, 100, 100)
}
//% blochId=Ks0426ledRGB
//% weight=100
//% block="les LED RGB s'allume en $couleur"
//% group="LED"
export function allumerLED (couleur: _cRGB): void {
    switch (couleur) {
        case _cRGB.blanc :
            allumerRGB (0, 0, 0)
            break
        case _cRGB.rouge :
            allumerRGB (0, 100, 100)
            break
        case _cRGB.rougeC :
            allumerRGB (75, 100, 100)
            break
        case _cRGB.vert :
            allumerRGB (100, 0, 100)
            break
        case _cRGB.vertC :
            allumerRGB (100, 75, 100)
            break
        case _cRGB.bleu :
            allumerRGB (100, 100, 0)
            break
        case _cRGB.bleuC :
            allumerRGB (100, 100, 75)
            break
        case _cRGB.bleuC :
            allumerRGB (100, 100, 75)
            break
        case _cRGB.rose :
            allumerRGB (0, 100, 0)
            break
        case _cRGB.roseC :
            allumerRGB (75, 100, 75)
            break
        case _cRGB.jaune :
            allumerRGB (0, 0, 100)
            break
        case _cRGB.jauneC :
            allumerRGB (75, 75, 100)
            break
    }
}
//% blochId=Ks0426ledRGBcTous
//% group="LED"
//% weight=90
//% block="les LED RGB : Rouge $rouge \\%, Vert $vert \\%, Bleu $bleu \\%"
export function allumerRVB (rouge: number, vert: number, bleu: number): void {
    if (rouge < 0) { rouge = 0 }
    if (rouge > 100) { rouge = 100 }
    if (vert < 0) { vert = 0 }
    if (vert > 100) { vert = 100 }
    if (bleu < 0) { bleu = 0 }
    if (bleu > 100) { bleu = 100 }
    allumerRGB (100-rouge, 100-vert, 100-bleu)
}
/**
 * Détection du jour
 */
//% blochId=Ks0426nuitOK
//% group="Capteurs"
//% weight=5
//% block="il fait nuit"
export function nuitOK(): boolean {
    if (pins.analogReadPin(AnalogPin.P1) < 200) { return true } else { return false }
}
//% blochId=Ks0426cellPhoto
//% group="Capteurs"
//% weight=4
//% block="lire la luminosité du lieu"
export function luminosite(): number {
    return pins.analogReadPin(AnalogPin.P1)
}
// au démarrage
initialisation()
let strip: neopixel.Strip = null
}