// les tests vont ici ; cela ne sera pas compilé si ce paquet est utilisé en tant qu'extension.
Ks0426.initialisation()
let flag = 0
basic.forever(function () {
    if (input.isGesture(Gesture.LogoUp)) { flag = 1 }
    if (input.isGesture(Gesture.ScreenUp)) { flag = 0 }
    if (flag == 0) { Ks0426.stopper() }
    else {
        if (Ks0426.obstacleF()) { Ks0426.tournerD(50) } else { Ks0426.avancer(50) }
        if (Ks0426.obstacleD()) { Ks0426.tournerG(50); basic.pause(250) }
        if (Ks0426.obstacleG()) { Ks0426.tournerD(50); basic.pause(500) }
    }
})