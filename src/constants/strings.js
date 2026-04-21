export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "fr", label: "Francais" },
];

export const LOCALES = {
  en: {
    appName: "Nature Walk",
    menuItems: [
      {
        key: "explore",
        title: "Explore Plant Species",
        description:
          "Browse the plant species catalog used by the Nature Walk application.",
      },
      {
        key: "detected",
        title: "View Detected Plant Species",
        description:
          "Review detected plant species, timestamps, and locations from the latest synced records.",
      },
    ],
    splash: {
      eyebrow: "Plant Species Detection System",
      title: "Nature Walk",
      copy:
        "Identify and catalogue plant species during outdoor walks with the Nature Walk mobile application.",
      loadingLabel: "Loading Nature Walk",
    },
    home: {
      eyebrow: "Welcome to Nature Walk",
      title: "Plant species detection with a companion mobile organizer",
      copy:
        "Explore the plant catalog and review plant species detections with timestamps and GPS locations.",
      connectedLabel: "Connected",
      disconnectedLabel: "Not Connected",
      languageLabel: "Language",
    },
    common: {
      back: "Back",
      close: "Close",
      continue: "Continue",
      previous: "Previous",
      next: "Next",
      searchBySpecies: "Search by species name",
      filterByDate: "Filter by date",
      noPlantSelected: "No plant selected",
    },
    placeholder: {
      eyebrow: "Coming next",
    },
    quotes: {
      title: "Quote of the Day",
      items: [
        "In every walk with nature, one receives far more than he seeks.",
        "Look deep into nature, and then you will understand everything better.",
        "The earth has music for those who listen.",
        "Nature always wears the colors of the spirit.",
        "Adopt the pace of nature: her secret is patience.",
        "The poetry of the earth is never dead.",
        "Heaven is under our feet as well as over our heads.",
        "To forget how to dig the earth and to tend the soil is to forget ourselves.",
        "There are always flowers for those who want to see them.",
        "Study nature, love nature, stay close to nature. It will never fail you.",
      ],
    },
    explore: {
      eyebrow: "Explore plant species",
      title: "Search the Nature Walk plant species catalog",
      copy:
        "Search by specie name, filter by date, and open any record to review its plant profile from the catalog.",
      searchPlaceholder: "Search plant species",
      resultSuffix: "species found",
      detailEyebrow: "Plant species detail",
      detailDescription:
        "This catalog entry is part of the offline plant species reference used by the companion application.",
    },
    detected: {
      eyebrow: "Detected species",
      title: "Latest detected plant species",
      copy:
        "Refresh the latest records from the API, search by species name, narrow by date, and review the detections gathered during your walk.",
      refreshingButton: "Refreshing data...",
      refreshButton: "Refresh from Wearable Device",
      refreshingCopy:
        "Pulling the most recent detections from the API.",
      refreshIdleCopy:
        "Tap refresh to sync the latest detections.",
      loadingBarLabel: "Loading progress",
      refreshFailedTitle: "Unable to refresh data",
      refreshFailedMessage:
        "Nature Walk could not load the latest detected plant records from the API.",
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
      detailEyebrow: "Detected Plant Specie",
      detailDetectedLabel: "Detected on",
      detailSpeciesIdLabel: "Specie ID",
      detailConfidenceLabel: "Confidence Score",
      locationTitle: "Detection Location",
      pdfTitle: "Nature Walk Detected Species Report",
      pdfCountLabel: "Filtered records exported",
      pdfOpenDetails: "Open details",
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
    appName: "Nature Walk",
    menuItems: [
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
      eyebrow: "Detection intelligente des plantes",
      title: "Nature Walk",
      copy:
        "Decouvrez les plantes autour de vous et suivez ce que vous detectez a chaque promenade.",
      loadingLabel: "Chargement de GardenWalk",
    },
    home: {
      eyebrow: "Bienvenue dans Nature Walk",
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
      continue: "Continuer",
      previous: "Precedent",
      next: "Suivant",
      searchBySpecies: "Rechercher par nom d'espece",
      filterByDate: "Filtrer par date",
      noPlantSelected: "Aucune plante selectionnee",
    },
    placeholder: {
      eyebrow: "Bientot disponible",
    },
    quotes: {
      title: "Citation du jour",
      items: [
        "Dans chaque promenade avec la nature, on recoit bien plus que ce que l'on cherche.",
        "Regardez profondement la nature, et vous comprendrez tout beaucoup mieux.",
        "La terre a une musique pour ceux qui ecoutent.",
        "La nature porte toujours les couleurs de l'esprit.",
        "Adoptez le rythme de la nature : son secret est la patience.",
        "La poesie de la terre ne meurt jamais.",
        "Le ciel est sous nos pieds autant qu'au-dessus de nos tetes.",
        "Oublier comment travailler la terre, c'est nous oublier nous-memes.",
        "Il y a toujours des fleurs pour ceux qui veulent les voir.",
        "Etudiez la nature, aimez la nature, restez proches d'elle. Elle ne vous decevra jamais.",
      ],
    },
    explore: {
      eyebrow: "Explorer les especes de plantes",
      title: "Rechercher dans le catalogue des especes Nature Walk",
      copy:
        "Recherchez par nom d'espece, filtrez par date et ouvrez un enregistrement pour voir son profil detaille.",
      searchPlaceholder: "Rechercher une espece de plante",
      resultSuffix: "especes trouvees",
      detailEyebrow: "Detail de l'espece",
      detailDescription:
        "Cette entree du catalogue fait partie de la reference hors ligne des especes de plantes utilisee par l'application compagnon.",
    },
    detected: {
      eyebrow: "Especes detectees",
      title: "Dernieres plantes detectees",
      copy:
        "Actualisez les derniers enregistrements depuis l'API, recherchez par nom d'espece, filtrez par date et alternez entre la vue tableau et la vue carte.",
      refreshingButton: "Actualisation des donnees...",
      refreshButton: "Actualiser depuis l'appareil portable",
      refreshingCopy:
        "Recuperation des detections les plus recentes depuis l'API.",
      refreshIdleCopy:
        "Appuyez sur actualiser pour synchroniser les dernieres detections.",
      loadingBarLabel: "Progression du chargement",
      refreshFailedTitle: "Impossible d'actualiser les donnees",
      refreshFailedMessage:
        "Nature Walk n'a pas pu charger les derniers enregistrements detectes depuis l'API.",
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
      detailEyebrow: "Espece de plante detectee",
      detailDetectedLabel: "Detectee le",
      detailSpeciesIdLabel: "ID espece",
      detailConfidenceLabel: "Score de confiance",
      locationTitle: "Lieu de detection",
      pdfTitle: "Rapport des especes detectees Nature Walk",
      pdfCountLabel: "Enregistrements filtres exportes",
      pdfOpenDetails: "Ouvrir les details",
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
