// les tests vont ici ; cela ne sera pas compilé si ce paquet est utilisé en tant qu'extension.
Ks0426.initialisation()
basic.forever(function () {
    if (Ks0426.obstacleF) { Ks0426.stopper() } else { Ks0426.avancer(50) }
})