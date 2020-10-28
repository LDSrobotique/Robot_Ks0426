// les tests vont ici ; cela ne sera pas compilé si ce paquet est utilisé en tant qu'extension.
// LED RGB : Bleu Blanc Rouge
Ks0426.allumerLED(_cRGB.bleu)
basic.pause(2000)
Ks0426.allumerLED(_cRGB.blanc)
basic.pause(2000)
Ks0426.allumerLED(_cRGB.rouge)
basic.pause(2000)
Ks0426.eteindreLED()
basic.forever(function () {
    /* S'il fait nuit on allume les phares sinon on les éteints 
    if (Ks0426.nuitOK()) { Ks0426.allumerLED(_cRGB.blanc) }
    else { Ks0426.eteindreLED() } */
    /* Test de déplacement du robot */
    // Si obstacle devant alors tourne à droite
    if (Ks0426.obstacleF()) { Ks0426.tournerD(75) }
    // S'il n'y a pas d'obstacle devant alors avance
    else { Ks0426.avancer(50) }
    // Si obstacle à droite alors tourne à gauche pendant 200ms
    if (Ks0426.obstacleD()) { Ks0426.tournerG(75); basic.pause(200) }
    // Si obstacle à gauche alors tourne à droite pendant 400ms
    if (Ks0426.obstacleG()) { Ks0426.tournerD(75); basic.pause(400) }
    // S'il y a du vide devant ou un sol noir alors s'en aller
    if (Ks0426.surface(irSol.vide)) { Ks0426.stopper(); basic.pause(1000); Ks0426.roueD(0); Ks0426.roueG(-50); basic.pause(750) }
})