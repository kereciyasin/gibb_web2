# Einfache Einkaufsliste (30min)

## Auftrag 1.0 - Vue-Basics lernen

Erstelle eine Vue 3-Anwendung, die eine einfache Einkaufsliste enthält. Du sollst neue Artikel zur Liste hinzufügen und vorhandene Artikel aus der Liste löschen können.

1. HTML-Grundgerüst vorbereiten

Erstelle eine neue HTML-Datei und füge die Grundelemente für eine Vue 3-Anwendung ein. Dazu gehören ein div-Element mit einer `id`-Attribute und ein `script`-Tag für die Definition der Vue-Komponente. Nutze das CDN für Vue 3:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Einfache Einkaufsliste</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <!-- Hier wird die Einkaufsliste angezeigt -->
  </div>

  <script>
    // Hier wird die Vue-Komponente definiert
  </script>
</body>
</html>
```

2. Vue-Komponente erstellen

Definiere eine Vue-Komponente mit der Composition API, die eine Liste von Einkaufsartikeln enthält. Verwende die `reactive()`-Funktion, um ein `items`-Array in der Komponente zu speichern. Definiere auch eine Methode zum Hinzufügen von neuen Artikeln zur Liste und eine Methode zum Löschen von Artikeln aus der Liste:

```html
<script>
  const { reactive, createApp } = Vue;

  createApp({
    setup() {
      // Deine Lösung
    }
  }).mount('#app');
</script>
```

3. Anzeige der Einkaufsliste

Binde die `items`-Property an eine `ul`-Liste in der Vue-Komponente, um die Einkaufsliste auf der Seite anzuzeigen. Nutze die `v-for`-Direktive, um die Artikel in der Liste anzuzeigen, und eine Schleife mit `v-if`-Direktive, um ein `x`-Symbol neben jedem Artikel anzuzeigen, damit du den Artikel löschen kannst:

4. Testen der Anwendung

Speichere die HTML-Datei und öffne sie in einem Webbrowser, um die Anwendung zu testen. Du solltest neue Artikel zur Liste hinzufügen und vorhandene Artikel aus der Liste lös

**Zusatz**

Erstelle eine weitere Funktion, die den Text der H1-Überschrift wieder auf "Hallo Welt!" zurücksetzt, wenn sie erneut aufgerufen wird.

### Hilfestellungen

Verwende document.getElementById, um auf das H1-Element zuzugreifen und den Text zu ändern. Verwende console.log, um eine Nachricht in der Konsole auszugeben.





