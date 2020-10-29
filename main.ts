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
enum touche {
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
enum cRGB {
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
enum distanceOF {
    //% block="assez loin"
    assezLoin,
    //% block="loin"
    loin,
    //% block="trop près"
    tropPres
}
enum infrarouge {
    //% block="gauche"
    gauche,
    //% block="droite"
    droite
}
enum moteurs {
    //% block="avancer"
    avancer,
    //% block="reculer"
    reculer,
    //% block="tourner à gauche"
    tournerGauche,
    //% block="tourner à droite"
    tournerDroite,
    //% block="stopper le mouvement"
    stopper
}
enum posObs {
    //% block="devant"
    devant,
    //% block="à gauche"
    gauche,
    //% block="à droite"
    droite
}
let strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
//% color="#04B404" icon="\uf17b"
//% groups="['Démarrage', 'Événements', 'Actionneurs', 'Capteurs', 'LED']"
namespace Ks0426 {
/**
 * Initialisation du Robot Ks0426 de Keyestudio sur micro:bit
 */
//% blockId=Ks0426initialisation
//% weight=30
//% block="initialisation"
//% group="Démarrage"
export function initialisation (): void {
    // Réserver tous les Pins pour le robot
    led.enable(false)
    pins.analogSetPitchPin(AnalogPin.P0)
    // Mettre les IR gauche (sur P2) et droite (sur P11) en PullUp
    pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
    // Initialiser la bande à LEDs
    //strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
    strip.showRainbow(1, 360)
    basic.pause(2000)
    strip.clear()
    strip.show()
    // Initialiser les LEDs RGB et les moteurs
    PCA9685.reset(67)
    PCA9685.init(67, 0)
    basic.pause(1000)
    // Éteindre les LEDs RGB
    Ks0426.eteindreLED()
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
//% weight=80
//% block="[Moteurs] roue gauche à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function roueG (vitesse: number): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, fixSens(vitesse), 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, fixVitesse(vitesse), 67)
}
/**
 * Pour commander le roue droite
 */
//% blockId=Ks0426roueD
//% weight=70
//% block="[Moteurs] roue droite à $vitesse \\% de puissance"
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
function avancer (vitesse: number): void {
    roueG(vitesse)
    roueD(vitesse)
}
//% blockId=Ks0426reculer
//% weight=40
//% block="reculer à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
function reculer (vitesse: number): void {
    avancer(-vitesse)
}
//% blockId=Ks0426tournerD
//% weight=50
//% block="tourner à droite à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
function tournerD (vitesse: number): void {
    roueG(vitesse)
    roueD(-vitesse)
}
//% blockId=Ks0426tournerG
//% weight=60
//% block="tourner à gauche à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
function tournerG (vitesse: number): void{
    roueG(-vitesse)
    roueD(vitesse)
}
/**
 * Pour piloter les moteurs du robot
 */
//% blockId=Ks0426piloter
//% weight=100
//% block="[Moteurs] $roues à $vitesse \\% de puissance"
//% vitesse.shadow="speedPicker"
//% vitesse.defl=50
//% group="Moteurs"
export function piloter (roues: moteurs, vitesse: number): void{
    switch (roues) {
        case moteurs.avancer :
            avancer(vitesse)
            break
        case moteurs.reculer :
            reculer(vitesse)
            break
        case moteurs.tournerGauche :
            tournerG(vitesse)
            break
        case moteurs.tournerDroite :
            tournerD(vitesse)
            break
        case moteurs.stopper :
            stopper()
            break
    }
}
/**
 * Pour arrêter le robot
 */
//% blockId=Ks0426stopper
//% weight=90
//% block="[Moteurs] stopper le mouvement"
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
//% blochId=Ks0426sTelecommande
//% weight=7
//% block="touche télécommande = $irTouche"
//% group="Capteurs"
export function telecommande(irTouche: touche): boolean {
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
export function allumerLED (couleur: cRGB): void {
    switch (couleur) {
        case cRGB.blanc :
            allumerRGB (0, 0, 0)
            break
        case cRGB.rouge :
            allumerRGB (0, 100, 100)
            break
        case cRGB.rougeC :
            allumerRGB (75, 100, 100)
            break
        case cRGB.vert :
            allumerRGB (100, 0, 100)
            break
        case cRGB.vertC :
            allumerRGB (100, 75, 100)
            break
        case cRGB.bleu :
            allumerRGB (100, 100, 0)
            break
        case cRGB.bleuC :
            allumerRGB (100, 100, 75)
            break
        case cRGB.bleuC :
            allumerRGB (100, 100, 75)
            break
        case cRGB.rose :
            allumerRGB (0, 100, 0)
            break
        case cRGB.roseC :
            allumerRGB (75, 100, 75)
            break
        case cRGB.jaune :
            allumerRGB (0, 0, 100)
            break
        case cRGB.jauneC :
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
    if (pins.analogReadPin(AnalogPin.P1) < 200)
        { strip.showColor(neopixel.colors(NeoPixelColors.Red)); return true }
    else { strip.showColor(neopixel.colors(NeoPixelColors.Black)); return false }
    
}
/**
 * retourne un nombre compris entre 0 et 1023
 */
//% blochId=Ks0426cellPhoto
//% group="Capteurs"
//% weight=4
//% block="lire la luminosité"
export function luminosite(): number {
    return pins.analogReadPin(AnalogPin.P1)
}
/**
 * Retourne vrai s'il y a un obstacle
 */
//% blockId=Ks0426obstacle
//% weight=35
//% block="obstacle $position"
//% group="Capteurs"
export function obstacle (position: posObs): boolean {
    switch (position) {
        case posObs.devant :
            if (distanceObs() < 10) { return true } else { return false }
            break
        case posObs.gauche :
            if (pins.digitalReadPin(DigitalPin.P2) == 0) { return true } else { return false }
            break
        case posObs.droite :
            if (pins.digitalReadPin(DigitalPin.P11) == 0) { return true } else { return false }
            break
    }
}
/**
 * Événement : quand il y a au moins un obstacle
 */
//% blochId=Ks0426onEventObs
//% group="Événements"
//% weight=100
//% block="quand obstacle"
export function onEventObstacle(handler: () => void) {
    control.inBackground(function () {
        const obstacleOK: boolean = distanceObs() < 10
        while (true) {
            if (obstacleOK == true) {
                handler(); }
            basic.pause(20)
            }
        })
}
/**
 * Événement : quand il n'y a pas d'obstacle
 */
//% blochId=Ks0426onEventPasObs
//% group="Événements"
//% weight=90
//% block="quand pas obstacle"
export function onEventPasObstacle(handler: () => void) {
    control.inBackground(function () {
        const obstacleOK: boolean = distanceObs() < 10
        while (true) {
            if (obstacleOK == false) {
                handler(); }
            basic.pause(20)
            }
        })
}
/**
 * Événement : touche télécommande appuyée
 */
//% blochId=Ks0426qTelecommande
//% group="Événements"
//% weight=80
//% block="quand touche télécommande appuyée"
export function onEventTelecommande(handler: () => void) {
    control.inBackground(function () {
        let tCourant = 0
        let tAncien = 0
        while (true) {
            tCourant = maqueen.IR_read()
            if (tCourant != tAncien) { tAncien = tCourant; handler(); }
            basic.pause(20)
        }
    })
}
// au démarrage
initialisation
}