//% color="#00FF00" weight=100
namespace Ks0426 {
/**
 * Robot Ks0426 de Keyestudio sur micro:bit
 */
//% blockId=Ks0426initialisation
//% block="initialisation"
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
//% blockId=Ks0426vitesseRG
//% block="vitesse roue gauche à $vitesse %% de puissance"
export function vitesse_roue_gauche (vitesse: number): void {
    vitesse |= 50
    vitesseRG = vitesse
    if (vitesseRG >= 0) {
        if (vitesseRG > 100) {
            vitesseRG = 100
        }
        sensRG = 0
    } else {
        if (vitesseRG < -100) {
            vitesseRG = -100
        }
        sensRG = 100
    }
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, sensRG, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, Math.abs(vitesseRG), 67)
}
function stopper_le_mouvement () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
let sensRG = 0
let vitesseRG = 0
let strip: neopixel.Strip = null
}