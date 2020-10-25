/**
 * Robot Ks0426 de Keyestudio sur micro:bit
 */
//% color="#04B404" weight=100
//% groups="['Démarrage', 'Moteurs', 'Capteurs']"
namespace Ks0426 {
/**
 * Initialisation du Robot Ks0426 de Keyestudio sur micro:bit
 */
//% blockId=Ks0426initialisation
//% block="initialisation"
//% group="Démarrage"
export function initialisation (): void {
    basic.clearScreen()
    // Initialiser les LEDs RGB et les moteurs
    PCA9685.reset(67)
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
//% blockId=Ks0426roueG
//% block="roue gauche à $vitesse"
//% vitesse.defl=50
//% group="Moteurs"
export function roueG (vitesse: number): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, fixSens(vitesse), 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, fixVitesse(vitesse), 67)
}
//% blockId=Ks0426roueD
//% block="roue droite à $vitesse"
//% vitesse.defl=50
//% group="Moteurs"
export function roueD (vitesse: number): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, fixSens(vitesse), 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, fixVitesse(vitesse), 67)
}
//% blockId=Ks0426avancer
//% block="avancer à $vitesse"
//% vitesse.defl=50
//% group="Moteurs"
export function avancer (vitesse: number): void {
    roueG(vitesse)
    roueD(vitesse)
}
//% blockId=Ks0426reculer
//% block="reculer à $vitesse"
//% vitesse.defl=50
//% group="Moteurs"
export function reculer (vitesse: number): void {
    avancer(-vitesse)
}
//% blockId=Ks0426tournerD
//% block="tourner à droite à $vitesse"
//% vitesse.defl=50
//% group="Moteurs"
export function tournerD (vitesse: number): void {
    roueG(vitesse)
    roueD(-vitesse)
}
//% blockId=Ks0426tournerG
//% block="tourner à gauche à $vitesse"
//% vitesse.defl=50
//% group="Moteurs"
export function tournerG (vitesse: number): void{
    roueG(-vitesse)
    roueD(vitesse)
}
//% blockId=Ks0426stopper
//% block="stopper le mouvement"
//% group="Moteurs"
export function stopper (): void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
//% blockId=Ks0426distanceObs
//% block="distance obstacle devant"
//% group="Capteurs"
export function distanceObs (): number {
    return sonar.ping(DigitalPin.P14, DigitalPin.P15, PingUnit.Centimeters)
}
//% blockId=Ks0426obstacleF
//% block="obstacle devant"
//% group="Capteurs"
export function obstacleD (): boolean {
    if (distanceObs() < 10) { return true } else { return false }
}
let strip: neopixel.Strip = null
}