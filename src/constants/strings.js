export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "fr", label: "Francais" },
];

export const LOCALES = {
  en: {
    appName: "GardenWalk",
    menuItems: [
      {
        key: "connect",
        title: "Connect to Device",
        description: "Pair GardenWalk with your plant sensor or camera hardware.",
      },
      {
        key: "explore",
        title: "Explore Plant Species",
        description: "Browse a visual guide to plants, flowers, herbs, and trees.",
      },
      {
        key: "detected",
        title: "View Detected Species",
        description: "See recently identified plants and open their saved insights.",
      },
    ],
    splash: {
      eyebrow: "Nature in your pocket",
      title: "GardenWalk",
      copy:
        "Discover plant life around you, connect devices, and track what you detect on every walk.",
      loadingLabel: "Loading GardenWalk",
    },
    home: {
      eyebrow: "Welcome to GardenWalk",
      title: "Your smart companion for every plant discovery",
      copy:
        "Choose where you want to start and jump straight into your next garden walk.",
      connectedLabel: "Connected",
      disconnectedLabel: "Not Connected",
      languageLabel: "Language",
    },
    common: {
      back: "Back",
      close: "Close",
      previous: "Previous",
      next: "Next",
      searchBySpecies: "Search by species name",
      filterByDate: "Filter by date",
      noPlantSelected: "No plant selected",
    },
    device: {
      eyebrow: "Device pairing",
      title: "Connect your GardenWalk device over Bluetooth",
      copy:
        "Turn on your device, keep it nearby, then tap the button below to open the Bluetooth picker and select from available devices.",
      waitingLabel: "Waiting for connection",
      noDeviceSelected: "No device selected yet",
      searchingButton: "Searching for devices...",
      bluetoothButton: "Turn On Bluetooth",
      help:
        "The browser will prompt you to pick from nearby Bluetooth devices. This works on supported browsers such as Chrome or Edge on secure origins like localhost.",
      notConnectedMessage:
        "Your device is not connected. Turn on the device and start Bluetooth pairing.",
      unavailableMessage:
        "Bluetooth is not available in this browser. Open GardenWalk in Chrome or Edge on localhost or HTTPS.",
      lookingMessage:
        "Looking for nearby Bluetooth devices. Select your GardenWalk device when the picker opens.",
      connectedMessage: "You can now continue with GardenWalk features.",
      cancelledMessage:
        "No device was selected. Turn on the device Bluetooth and try again.",
      failedMessage:
        "GardenWalk could not connect right now. Check Bluetooth permissions and try again.",
    },
    placeholder: {
      eyebrow: "Coming next",
    },
    explore: {
      eyebrow: "Explore plant species",
      title: "Search the GardenWalk species catalog",
      copy:
        "Search by specie name, filter by date, and open any record to see its detailed plant profile.",
      searchPlaceholder: "Search plant species",
      resultSuffix: "species found",
      detailEyebrow: "Plant species detail",
      detailDateLabel: "Catalog date",
    },
    detected: {
      eyebrow: "Detected species",
      title: "Latest plants detected from your GardenWalk device",
      copy:
        "Refresh the latest Bluetooth data, search by species name, narrow by date, and switch between a table view and a map view.",
      refreshingButton: "Refreshing data...",
      refreshButton: "Refresh from Device",
      refreshingCopy:
        "Pulling the most recent detections from the Bluetooth device.",
      refreshIdleCopy:
        "Tap refresh to simulate syncing the latest detections.",
      tableView: "Table View",
      mapView: "Map View",
      searchPlaceholder: "Search detected plants",
      exportPdf: "Export as PDF",
      resultSuffix: "records found",
      mapLabel: "Detected Plants Map",
      mapInteractionTitle: "Map interaction",
      mapInteractionCopy:
        "Red markers represent detected plants. Tap a marker to open its popup, then use Open details to go to page X.",
      mapBillingCopy:
        "This map uses Leaflet with OpenStreetMap tiles, so no Google Maps billing setup is needed.",
      detailEyebrow: "Plant detail page X",
      detailDetectedLabel: "Detected on",
      locationTitle: "Detection Location",
      pdfTitle: "GardenWalk Detected Species Report",
      pdfCountLabel: "Filtered records exported",
      pdfOpenDetails: "Open details",
      connectionRequiredTitle: "Device connection required",
      connectionRequiredMessage:
        "Bluetooth is off or your GardenWalk device is not connected. Connect your device before refreshing the latest detected plants.",
      connectionRequiredAction: "Go to Connect Device",
    },
    table: {
      id: "ID",
      speciesId: "Plant Specie ID",
      speciesName: "Plant Specie Name",
      date: "Date",
      pageLabel: "Page",
      of: "of",
    },
  },
  fr: {
    appName: "GardenWalk",
    menuItems: [
      {
        key: "connect",
        title: "Connecter l'appareil",
        description:
          "Associez GardenWalk a votre capteur de plantes ou materiel camera.",
      },
      {
        key: "explore",
        title: "Explorer les especes de plantes",
        description:
          "Parcourez un guide visuel des plantes, fleurs, herbes et arbres.",
      },
      {
        key: "detected",
        title: "Voir les especes detectees",
        description:
          "Consultez les plantes identifiees recemment et leurs informations.",
      },
    ],
    splash: {
      eyebrow: "La nature dans votre poche",
      title: "GardenWalk",
      copy:
        "Decouvrez les plantes autour de vous, connectez des appareils et suivez ce que vous detectez a chaque promenade.",
      loadingLabel: "Chargement de GardenWalk",
    },
    home: {
      eyebrow: "Bienvenue dans GardenWalk",
      title: "Votre compagnon intelligent pour chaque decouverte vegetale",
      copy:
        "Choisissez votre point de depart et commencez votre prochaine promenade botanique.",
      connectedLabel: "Connecte",
      disconnectedLabel: "Non connecte",
      languageLabel: "Langue",
    },
    common: {
      back: "Retour",
      close: "Fermer",
      previous: "Precedent",
      next: "Suivant",
      searchBySpecies: "Rechercher par nom d'espece",
      filterByDate: "Filtrer par date",
      noPlantSelected: "Aucune plante selectionnee",
    },
    device: {
      eyebrow: "Association de l'appareil",
      title: "Connectez votre appareil GardenWalk en Bluetooth",
      copy:
        "Allumez votre appareil, gardez-le a proximite, puis appuyez sur le bouton ci-dessous pour ouvrir le selecteur Bluetooth et choisir parmi les appareils disponibles.",
      waitingLabel: "En attente de connexion",
      noDeviceSelected: "Aucun appareil selectionne",
      searchingButton: "Recherche des appareils...",
      bluetoothButton: "Activer le Bluetooth",
      help:
        "Le navigateur vous invitera a choisir parmi les appareils Bluetooth a proximite. Cela fonctionne sur des navigateurs compatibles comme Chrome ou Edge sur localhost ou HTTPS.",
      notConnectedMessage:
        "Votre appareil n'est pas connecte. Allumez l'appareil et lancez l'association Bluetooth.",
      unavailableMessage:
        "Le Bluetooth n'est pas disponible dans ce navigateur. Ouvrez GardenWalk dans Chrome ou Edge sur localhost ou HTTPS.",
      lookingMessage:
        "Recherche d'appareils Bluetooth a proximite. Selectionnez votre appareil GardenWalk lorsque le selecteur s'ouvre.",
      connectedMessage:
        "Vous pouvez maintenant continuer a utiliser les fonctionnalites de GardenWalk.",
      cancelledMessage:
        "Aucun appareil n'a ete selectionne. Activez le Bluetooth de l'appareil et reessayez.",
      failedMessage:
        "GardenWalk ne peut pas se connecter pour le moment. Verifiez les autorisations Bluetooth et reessayez.",
    },
    placeholder: {
      eyebrow: "Bientot disponible",
    },
    explore: {
      eyebrow: "Explorer les especes de plantes",
      title: "Rechercher dans le catalogue des especes GardenWalk",
      copy:
        "Recherchez par nom d'espece, filtrez par date et ouvrez un enregistrement pour voir son profil detaille.",
      searchPlaceholder: "Rechercher une espece de plante",
      resultSuffix: "especes trouvees",
      detailEyebrow: "Detail de l'espece",
      detailDateLabel: "Date du catalogue",
    },
    detected: {
      eyebrow: "Especes detectees",
      title: "Dernieres plantes detectees depuis votre appareil GardenWalk",
      copy:
        "Actualisez les dernieres donnees Bluetooth, recherchez par nom d'espece, filtrez par date et alternez entre la vue tableau et la vue carte.",
      refreshingButton: "Actualisation des donnees...",
      refreshButton: "Actualiser depuis l'appareil",
      refreshingCopy:
        "Recuperation des detections les plus recentes depuis l'appareil Bluetooth.",
      refreshIdleCopy:
        "Appuyez sur actualiser pour simuler la synchronisation des dernieres detections.",
      tableView: "Vue tableau",
      mapView: "Vue carte",
      searchPlaceholder: "Rechercher des plantes detectees",
      exportPdf: "Exporter en PDF",
      resultSuffix: "enregistrements trouves",
      mapLabel: "Carte des plantes detectees",
      mapInteractionTitle: "Interaction avec la carte",
      mapInteractionCopy:
        "Les marqueurs rouges representent les plantes detectees. Touchez un marqueur pour ouvrir sa fenetre, puis utilisez Ouvrir les details pour aller a la page X.",
      mapBillingCopy:
        "Cette carte utilise Leaflet avec les tuiles OpenStreetMap, donc aucune configuration de facturation Google Maps n'est necessaire.",
      detailEyebrow: "Page detail plante X",
      detailDetectedLabel: "Detectee le",
      locationTitle: "Lieu de detection",
      pdfTitle: "Rapport des especes detectees GardenWalk",
      pdfCountLabel: "Enregistrements filtres exportes",
      pdfOpenDetails: "Ouvrir les details",
      connectionRequiredTitle: "Connexion de l'appareil requise",
      connectionRequiredMessage:
        "Le Bluetooth est desactive ou votre appareil GardenWalk n'est pas connecte. Connectez votre appareil avant d'actualiser les plantes detectees.",
      connectionRequiredAction: "Aller a Connecter l'appareil",
    },
    table: {
      id: "ID",
      speciesId: "ID espece plante",
      speciesName: "Nom de l'espece",
      date: "Date",
      pageLabel: "Page",
      of: "sur",
    },
  },
};
