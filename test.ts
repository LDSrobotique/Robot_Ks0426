// les tests vont ici ; cela ne sera pas compilé si ce paquet est utilisé en tant qu'extension.
Ks0426.initialisation()
let flag = 0
basic.forever(function () {
    // Test de déplacement du robot
    // Si le robot est sur ses roues
    if (input.isGesture(Gesture.LogoUp)) { flag = 1 }
    // Si le robot est face vers le haut
    if (input.isGesture(Gesture.ScreenUp)) { flag = 0 }
    // Si le robot est face vers le haut, il doit s'arrêter de rouler
    if (flag == 0) { Ks0426.stopper() }
    // Si le robot est sur ses roues, il doit rouler
    else {
        if (Ks0426.obstacleF())
            { Ks0426.tournerD(75) }
        else { Ks0426.avancer(50) }
        if (Ks0426.obstacleD())
            { Ks0426.tournerG(75); basic.pause(200) }
        if (Ks0426.obstacleG())
            { Ks0426.tournerD(75); basic.pause(400) }
    }
})