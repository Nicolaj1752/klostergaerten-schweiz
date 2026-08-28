// Nimmt die Ladeanimation weg, sobald ein Foto da ist.
//
// Die Animation steckt in der Klasse "bild-laedt" (siehe redesign.css).
// Sie liegt von Anfang an im HTML, damit schon vor dem ersten Skript etwas
// zu sehen ist. Hier wird sie nur wieder entfernt.

const ladeBilder = document.querySelectorAll(".bild-laedt img");

ladeBilder.forEach(function (bild) {

  // Fertig heisst: Animation weg beim umgebenden Rahmen
  function fertig() {
    bild.closest(".bild-laedt").classList.remove("bild-laedt");
  }

  // Aus dem Zwischenspeicher sind Bilder schon beim Start fertig.
  // complete faengt genau diesen Fall ab, sonst bliebe die Animation stehen.
  if (bild.complete) {
    fertig();
  } else {
    bild.addEventListener("load", fertig);
    bild.addEventListener("error", fertig);   // auch bei Fehlern nicht ewig laufen
  }
});
