//% color="#04B404" weight=100
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
//% block="roue gauche à $vitesse"
export function vitesseRG (vitesse: number): void {
    vitesse |= 0
    let vitRG = vitesse
    let sens = 0
    if (vitRG >= 0) {
        if (vitRG > 100) {
            vitRG = 100
        }
    } else {
        if (vitRG < -100) {
            vitRG = -100
        }
        sens = 100
    }
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, sens, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, Math.abs(vitRG), 67)
}
//% blockId=Ks0426vitesseRD
//% block="roue droite à $vitesse"
export function vitesse_roue_droite (vitesse: number): void {
    vitesse |= 50
    let vitesseRD = vitesse
    let sens = 0
    if (vitesseRD >= 0) {
        if (vitesseRD > 100) {
            vitesseRD = 100
        }
        sens = 0
    } else {
        if (vitesseRD < -100) {
            vitesseRD = -100
        }
        sens = 100
    }
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, sens, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, Math.abs(vitesseRD), 67)
}
//% blockId=Ks0426stopperMouvement
//% block="stopper le mouvement"
export function stopper_mouvement ():void {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
let strip: neopixel.Strip = null
}