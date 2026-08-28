// Versteckter Zugang zur internen Seite.
//
// Auf jeder oeffentlichen Seite oeffnet die Taste "i" die Datei intern.html.
// Die Seite steht absichtlich in keinem Menue.

document.addEventListener("keydown", function (ereignis) {

  // Nur die blanke Taste "i". Cmd+I, Ctrl+I und Alt+I gehoeren dem Browser.
  if (ereignis.key !== "i") return;
  if (ereignis.metaKey || ereignis.ctrlKey || ereignis.altKey) return;

  // Nicht ausloesen, waehrend jemand in ein Eingabefeld tippt.
  const aktiv = document.activeElement;
  if (aktiv) {
    if (aktiv.tagName === "INPUT") return;
    if (aktiv.tagName === "TEXTAREA") return;
    if (aktiv.isContentEditable) return;
  }

  window.location.href = "intern.html";
});
