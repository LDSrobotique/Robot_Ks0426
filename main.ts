/**
 * Robot Ks0426 de Keyestudio sur micro:bit
 */
enum irLN { gauche, droite }
enum irSol { le_vide, foncee, claire }
//% color="#04B404" icon="\uf17b"
//% groups="['Démarrage', 'Moteurs', 'Capteurs']"
namespace Ks0426 {
/**
 * Initialisation du Robot Ks0426 de Keyestudio sur micro:bit
 */
//% blockId=Ks0426initialisation
//% block="initialisation"
//% group="Démarrage"
export function initialisation (): void {
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
    // Pour éteindre les LEDs RGB
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED5, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED6, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED7, 100, 67)
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
    return sonar.ping(DigitalPin.P14, DigitalPin.P15, PingUnit.Centimeters)
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
//% blockId=Ks0426surfaceN
//% weight=8
//% block="[Capteur de sol] surface $irSurface"
//% group="Capteurs"
export function surfaceN(irSurface: irSol): boolean {
    switch (irSurface) {
        case irSol.le_vide : // || irSol.foncee : // surface vide ou foncée
            if (pins.digitalReadPin(DigitalPin.P12) == 1 || pins.digitalReadPin(DigitalPin.P13) == 1)
                { return true } else { return false}
            break
        case irSol.foncee :
            return true
            break
        case irSol.claire : // surface claire
            if (pins.digitalReadPin(DigitalPin.P12) == 0 || pins.digitalReadPin(DigitalPin.P13) == 0)
                { return true } else { return false }
            break
    }
}
let strip: neopixel.Strip = null
}