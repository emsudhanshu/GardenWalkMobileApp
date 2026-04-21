import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { LOCALES } from "./constants/strings";
import plantnetAppRecords from "./data/plantnetAppRecords.json";

const DETECTED_SPECIES_API_TARGET = "http://192.168.50.1:5000/data";


function formatDate(dateValue, language) {
  const locale = language === "fr" ? "fr-FR" : "en-US";

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

function getConfidenceScore(record) {
  const numericId = Number.parseInt(record.speciesId, 10) || record.id || 1;
  const confidence = 88 + (numericId % 11);

  return `${confidence}%`;
}

function getRandomQuote(strings) {
  const quotes = strings.quotes.items;
  const randomIndex = Math.floor(Math.random() * quotes.length);

  return quotes[randomIndex];
}

function normalizeDetectedRecord(record, index) {
  return {
    ...record,
    image: record.image || null,
    _clientId:
      record._clientId ||
      `${record.id ?? "record"}-${record.speciesId ?? "species"}-${record.detectedAt ?? "time"}-${index}`,
  };
}

function normalizeDetectedRecords(records) {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.map((record, index) => normalizeDetectedRecord(record, index));
}

async function fetchDetectedSpeciesRecords() {
  const response = await fetch(DETECTED_SPECIES_API_TARGET);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return normalizeDetectedRecords(data);
}

function exportRecordsAsPdf(records, strings, language) {
  const exportWindow = window.open("", "_blank", "width=900,height=700");

  if (!exportWindow) {
    return;
  }

  const rowsMarkup = records
    .map(
      (record) => `
        <tr>
          <td>${record.id}</td>
          <td>${record.speciesId}</td>
          <td>${record.speciesName}</td>
          <td>${formatDate(record.detectedAt, language)}</td>
        </tr>
      `
    )
    .join("");

  exportWindow.document.write(`
    <!doctype html>
    <html lang="${language}">
      <head>
        <meta charset="UTF-8" />
        <title>${strings.detected.pdfTitle}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 32px;
            color: #143126;
          }

          h1 {
            margin: 0 0 8px;
          }

          p {
            margin: 0 0 18px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            padding: 12px;
            border: 1px solid #c9ddbc;
            text-align: left;
          }

          thead {
            background: #e7f3dc;
          }
        </style>
      </head>
      <body>
        <h1>${strings.detected.pdfTitle}</h1>
        <p>${strings.detected.pdfCountLabel}: ${records.length}</p>
        <table>
          <thead>
            <tr>
              <th>${strings.table.id}</th>
              <th>${strings.table.speciesId}</th>
              <th>${strings.table.speciesName}</th>
              <th>${strings.table.date}</th>
            </tr>
          </thead>
          <tbody>
            ${rowsMarkup}
          </tbody>
        </table>
      </body>
    </html>
  `);
  exportWindow.document.close();
  exportWindow.focus();
  exportWindow.print();
}

function GardenWalkLogo() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <div className="brand-mark__halo" />
      <div className="brand-mark__badge">
        <span className="brand-mark__stem" />
        <span className="brand-mark__leaf brand-mark__leaf--left" />
        <span className="brand-mark__leaf brand-mark__leaf--right" />
        <span className="brand-mark__path" />
      </div>
    </div>
  );
}

function PlantMap({
  records,
  selectedRecordId,
  onSelectRecord,
  onOpenRecord,
  heightClass,
  strings,
}) {
  const mapCenter =
    records.length > 0
      ? [records[0].latitude, records[0].longitude]
      : [40.7128, -74.006];

  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom
      className={`leaflet-map ${heightClass || ""}`.trim()}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {records.map((record) => (
        <CircleMarker
          key={record._clientId}
          center={[record.latitude, record.longitude]}
          radius={selectedRecordId === record._clientId ? 10 : 8}
          pathOptions={{
            color: "#b8201f",
            fillColor: "#d9423a",
            fillOpacity: 0.92,
            weight: 2,
          }}
          eventHandlers={{
            click: () => onSelectRecord?.(record._clientId),
          }}
        >
          <Popup>
            <div className="leaflet-popup-card">
              <strong>{record.speciesName}</strong>
              <button
                className="leaflet-popup-card__action"
                type="button"
                onClick={() => onOpenRecord(record)}
              >
                {strings.detected.pdfOpenDetails}
              </button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

function SplashScreen({ strings, dailyQuote }) {
  return (
    <section className="screen screen--splash">
      <div className="screen__glow screen__glow--left" />
      <div className="screen__glow screen__glow--right" />
      <div className="splash-card">
        <GardenWalkLogo />
        <p className="eyebrow">{strings.splash.eyebrow}</p>
        <h1>{strings.splash.title}</h1>
        <p className="splash-copy">{strings.splash.copy}</p>
        <div className="quote-card">
          <p className="quote-card__label">{strings.quotes.title}</p>
          <p className="quote-card__text">"{dailyQuote}"</p>
        </div>
        <div className="loading-bar" aria-label={strings.splash.loadingLabel}>
          <span className="loading-bar__fill" />
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ onSelectOption, strings }) {
  return (
    <section className="screen screen--home">
      <div className="home-shell">
        {/* Language selector kept disabled for now. English remains the default.
        <div className="language-bar">
          <label className="language-bar__label" htmlFor="language-select">
            {strings.home.languageLabel}
          </label>
          <select
            id="language-select"
            className="language-bar__select"
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        */}

        <header className="hero-panel">
          <div>
            <p className="eyebrow">{strings.home.eyebrow}</p>
            <h2>{strings.home.title}</h2>
            <p className="hero-copy">{strings.home.copy}</p>
          </div>
          <GardenWalkLogo />
        </header>

        <div className="option-grid">
          {strings.menuItems.map((item) => (
            <button
              className="option-card"
              key={item.title}
              type="button"
              onClick={() => onSelectOption(item.key)}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExploreSpeciesScreen({
  records,
  searchTerm,
  currentPage,
  onBack,
  onSearchChange,
  onPageChange,
  onOpenRecord,
  strings,
}) {
  const filteredRecords = records.filter((record) => {
    return record.speciesName
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRecords = filteredRecords.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  return (
    <section className="screen screen--home">
      <div className="home-shell">
        <header className="hero-panel">
          <div>
            <button className="back-link" type="button" onClick={onBack}>
              {strings.common.back}
            </button>
            <p className="eyebrow">{strings.explore.eyebrow}</p>
            <h2>{strings.explore.title}</h2>
            <p className="hero-copy">{strings.explore.copy}</p>
          </div>
          <GardenWalkLogo />
        </header>

        <section className="detected-toolbar">
          <div className="filters-panel">
            <label className="field">
              <span>{strings.common.searchBySpecies}</span>
              <input
                type="search"
                placeholder={strings.explore.searchPlaceholder}
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="table-panel">
          <div className="table-meta">
            <p>{filteredRecords.length} {strings.explore.resultSuffix}</p>
            <p>
              {strings.table.pageLabel} {safePage} {strings.table.of} {totalPages}
            </p>
          </div>

          <div className="table-wrap">
            <table className="species-table">
              <thead>
                <tr>
                  <th>{strings.table.id}</th>
                  <th>{strings.table.speciesId}</th>
                  <th>{strings.table.speciesName}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record) => (
                  <tr
                    key={`explore-${record.id}`}
                    className="species-table__row"
                    onClick={() => onOpenRecord(record)}
                  >
                    <td>{record.id}</td>
                    <td>{record.speciesId}</td>
                    <td>{record.speciesName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="secondary-action"
              type="button"
              onClick={() => onPageChange(safePage - 1)}
              disabled={safePage === 1}
            >
              {strings.common.previous}
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => onPageChange(safePage + 1)}
              disabled={safePage === totalPages}
            >
              {strings.common.next}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

function DetectedSpeciesScreen({
  records,
  activeDetectedView,
  searchTerm,
  dateFilter,
  currentPage,
  refreshState,
  refreshProgress,
  selectedMapRecordId,
  onBack,
  onSwitchView,
  onSearchChange,
  onDateFilterChange,
  onRefresh,
  onPageChange,
  onOpenRecord,
  onMapPinSelect,
  strings,
  language,
}) {
  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.speciesName
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const matchesDate = dateFilter
      ? record.detectedAt.slice(0, 10) === dateFilter
      : true;

    return matchesSearch && matchesDate;
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRecords = filteredRecords.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );
  const selectedMapRecord =
    filteredRecords.find((record) => record._clientId === selectedMapRecordId) ||
    filteredRecords[0] ||
    null;

  return (
    <section className="screen screen--home">
      <div className="home-shell">
        <header className="hero-panel hero-panel--detected">
          <div>
            <button className="back-link" type="button" onClick={onBack}>
              {strings.common.back}
            </button>
            <p className="eyebrow">{strings.detected.eyebrow}</p>
            <h2>{strings.detected.title}</h2>
            <p className="hero-copy">{strings.detected.copy}</p>
          </div>
          <div className="refresh-panel">
            <button
              className="primary-action"
              type="button"
              onClick={onRefresh}
              disabled={refreshState === "loading"}
            >
              {refreshState === "loading"
                ? strings.detected.refreshingButton
                : strings.detected.refreshButton}
            </button>
            <div
              className="refresh-progress"
              aria-live="polite"
              aria-label={`${strings.detected.loadingBarLabel} ${Math.round(refreshProgress)}%`}
            >
              <div className="refresh-progress__header">
                <span>{strings.detected.loadingBarLabel}</span>
                <strong>{Math.round(refreshProgress)}%</strong>
              </div>
              <div className="loading-bar loading-bar--compact" aria-hidden="true">
                <span
                  className="loading-bar__fill loading-bar__fill--manual"
                  style={{ transform: `scaleX(${refreshProgress / 100})` }}
                />
              </div>
            </div>
            <p className="device-help">
              {refreshState === "loading"
                ? strings.detected.refreshingCopy
                : strings.detected.refreshIdleCopy}
            </p>
          </div>
        </header>

        <section className="detected-toolbar">
          <div className="view-switch">
            <button
              className={`view-switch__button ${
                activeDetectedView === "table" ? "view-switch__button--active" : ""
              }`}
              type="button"
              onClick={() => onSwitchView("table")}
            >
              {strings.detected.tableView}
            </button>
            <button
              className={`view-switch__button ${
                activeDetectedView === "map" ? "view-switch__button--active" : ""
              }`}
              type="button"
              onClick={() => onSwitchView("map")}
            >
              {strings.detected.mapView}
            </button>
          </div>

          <div className="filters-panel">
            <label className="field">
              <span>{strings.common.searchBySpecies}</span>
              <input
                type="search"
                placeholder={strings.detected.searchPlaceholder}
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </label>

            <label className="field">
              <span>{strings.common.filterByDate}</span>
              <input
                type="date"
                value={dateFilter}
                onChange={(event) => onDateFilterChange(event.target.value)}
              />
            </label>
          </div>

          <div className="toolbar-actions">
            <button
              className="secondary-action"
              type="button"
              onClick={() => exportRecordsAsPdf(filteredRecords, strings, language)}
            >
              {strings.detected.exportPdf}
            </button>
          </div>
        </section>

        {activeDetectedView === "table" ? (
          <section className="table-panel">
            <div className="table-meta">
              <p>{filteredRecords.length} {strings.detected.resultSuffix}</p>
              <p>
                {strings.table.pageLabel} {safePage} {strings.table.of} {totalPages}
              </p>
            </div>

            <div className="table-wrap">
              <table className="species-table">
                <thead>
                  <tr>
                    <th>{strings.table.id}</th>
                    <th>{strings.table.speciesId}</th>
                    <th>{strings.table.speciesName}</th>
                    <th>{strings.table.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((record) => (
                    <tr
                      key={record._clientId}
                      className="species-table__row"
                      onClick={() => onOpenRecord(record)}
                    >
                      <td>{record.id}</td>
                      <td>{record.speciesId}</td>
                      <td>{record.speciesName}</td>
                      <td>{formatDate(record.detectedAt, language)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                className="secondary-action"
                type="button"
                onClick={() => onPageChange(safePage - 1)}
                disabled={safePage === 1}
              >
                {strings.common.previous}
              </button>
              <button
                className="secondary-action"
                type="button"
                onClick={() => onPageChange(safePage + 1)}
                disabled={safePage === totalPages}
              >
                {strings.common.next}
              </button>
            </div>
          </section>
        ) : (
          <section className="map-panel">
            <div className="map-canvas">
              <div className="map-canvas__label">{strings.detected.mapLabel}</div>
              <PlantMap
                records={filteredRecords}
                selectedRecordId={selectedMapRecord?.id}
                onSelectRecord={onMapPinSelect}
                onOpenRecord={onOpenRecord}
                heightClass="leaflet-map--panel"
                strings={strings}
              />
            </div>

            <div className="map-sidecard">
              <h3>{strings.detected.mapInteractionTitle}</h3>
              <p>{strings.detected.mapInteractionCopy}</p>
              <p>{strings.detected.mapBillingCopy}</p>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

function PlantDetailScreen({ record, onBack, strings, language }) {
  if (!record) {
    return (
      <section className="screen screen--home">
        <div className="home-shell">
          <div className="placeholder-panel">
            <button className="back-link" type="button" onClick={onBack}>
              {strings.common.back}
            </button>
            <h2>{strings.common.noPlantSelected}</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="screen screen--home">
      <div className="home-shell">
        <div className="detail-panel">
          <div className="detail-panel__header">
            <div>
              <button className="back-link" type="button" onClick={onBack}>
                {strings.common.back}
              </button>
              <p className="eyebrow">{strings.detected.detailEyebrow}</p>
              <h2>{record.speciesName}</h2>
              <p className="hero-copy">
                {strings.detected.detailSpeciesIdLabel}: {record.speciesId}
              </p>
              <p className="hero-copy">
                {strings.detected.detailDetectedLabel}: {formatDate(record.detectedAt, language)}
              </p>
              <p className="hero-copy">
                {strings.detected.detailConfidenceLabel}: {getConfidenceScore(record)}
              </p>
            </div>
            {record.image ? (
              <img
                className="detail-panel__image"
                src={record.image}
                alt={record.speciesName}
              />
            ) : (
              <div className="detail-panel__image detail-panel__image--placeholder">
                <GardenWalkLogo />
              </div>
            )}
          </div>

          <div className="detail-map">
            <div className="detail-map__header">
              <h3>{strings.detected.locationTitle}</h3>
              <p>
                Latitude {record.latitude.toFixed(4)} | Longitude{" "}
                {record.longitude.toFixed(4)}
              </p>
            </div>
            <div className="detail-map__canvas">
              <PlantMap
                records={[record]}
                selectedRecordId={record.id}
                onOpenRecord={() => {}}
                heightClass="leaflet-map--detail"
                strings={strings}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExplorePlantDetailScreen({ record, onBack, strings, language }) {
  if (!record) {
    return (
      <section className="screen screen--home">
        <div className="home-shell">
          <div className="placeholder-panel">
            <button className="back-link" type="button" onClick={onBack}>
              {strings.common.back}
            </button>
            <h2>{strings.common.noPlantSelected}</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="screen screen--home">
      <div className="home-shell">
        <div className="detail-panel">
          <div className="detail-panel__header">
            <div>
              <button className="back-link" type="button" onClick={onBack}>
                {strings.common.back}
              </button>
              <p className="eyebrow">{strings.explore.detailEyebrow}</p>
              <h2>{record.speciesName}</h2>
            </div>
            <img
              className="detail-panel__image"
              src={record.image}
              alt={record.speciesName}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionModal({ title, message, closeLabel, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="action-modal-title"
      >
        <h3 id="action-modal-title">{title}</h3>
        <p>{message}</p>
        <div className="modal-card__actions">
          <button className="primary-action" type="button" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState("home");
  const [detectedRecords, setDetectedRecords] = useState(() =>
    normalizeDetectedRecords(plantnetAppRecords)
  );
  const [detectedView, setDetectedView] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshState, setRefreshState] = useState("idle");
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [selectedMapRecordId, setSelectedMapRecordId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [exploreSearchTerm, setExploreSearchTerm] = useState("");
  const [exploreCurrentPage, setExploreCurrentPage] = useState(1);
  const [selectedExploreRecord, setSelectedExploreRecord] = useState(null);
  const [refreshErrorMessage, setRefreshErrorMessage] = useState("");
  const strings = LOCALES[selectedLanguage];
  const [dailyQuote, setDailyQuote] = useState(() => getRandomQuote(LOCALES.en));

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter]);

  useEffect(() => {
    setExploreCurrentPage(1);
  }, [exploreSearchTerm]);

  useEffect(() => {
    setDailyQuote(getRandomQuote(strings));
  }, [strings]);

  useEffect(() => {
    setSelectedMapRecordId((currentSelectedId) => {
      if (
        currentSelectedId &&
        detectedRecords.some((record) => record._clientId === currentSelectedId)
      ) {
        return currentSelectedId;
      }

      return detectedRecords[0]?._clientId ?? null;
    });
  }, [detectedRecords]);

  useEffect(() => {
    if (activeScreen !== "detected") {
      return;
    }

    const fetchOnDetectedScreenOpen = async () => {
      setRefreshState("loading");
      setRefreshProgress(15);
      setRefreshErrorMessage("");

      try {
        const normalizedRecords = await fetchDetectedSpeciesRecords();

        setRefreshProgress(100);
        setDetectedRecords(normalizedRecords);
        setRefreshState("done");
        window.setTimeout(() => {
          setRefreshState("idle");
          setRefreshProgress(0);
        }, 800);
      } catch {
        setRefreshProgress(0);
        setRefreshState("idle");
        setRefreshErrorMessage(strings.detected.refreshFailedMessage);
      }
    };

    void fetchOnDetectedScreenOpen();
  }, [activeScreen, strings]);

  const handleSelectOption = (screenKey) => {
    setActiveScreen(screenKey);
  };

  const handleRefreshDetectedData = async () => {
    setRefreshState("loading");
    setRefreshProgress(0);
    setRefreshErrorMessage("");

    let progressValue = 0;
    const progressInterval = window.setInterval(() => {
      progressValue += 20;
      setRefreshProgress(Math.min(progressValue, 100));
    }, 450);

    try {
      const normalizedRecords = await fetchDetectedSpeciesRecords();

      window.clearInterval(progressInterval);
      setRefreshProgress(100);

      setDetectedRecords(normalizedRecords);
      setRefreshState("done");
      window.setTimeout(() => {
        setRefreshState("idle");
        setRefreshProgress(0);
      }, 800);
    } catch {
      window.clearInterval(progressInterval);
      setRefreshProgress(0);
      setRefreshState("idle");
      setRefreshErrorMessage(strings.detected.refreshFailedMessage);
    }
  };

  const handleOpenRecord = (record) => {
    setSelectedRecord(record);
    setActiveScreen("species-detail");
  };

  const handleOpenExploreRecord = (record) => {
    setSelectedExploreRecord(record);
    setActiveScreen("explore-detail");
  };

  let screenContent = (
    <HomeScreen
      onSelectOption={handleSelectOption}
      strings={strings}
    />
  );

  if (activeScreen === "explore") {
    screenContent = (
      <ExploreSpeciesScreen
        records={detectedRecords}
        searchTerm={exploreSearchTerm}
        currentPage={exploreCurrentPage}
        onBack={() => setActiveScreen("home")}
        onSearchChange={setExploreSearchTerm}
        onPageChange={setExploreCurrentPage}
        onOpenRecord={handleOpenExploreRecord}
        strings={strings}
      />
    );
  }

  if (activeScreen === "detected") {
    screenContent = (
      <DetectedSpeciesScreen
        records={detectedRecords}
        activeDetectedView={detectedView}
        searchTerm={searchTerm}
        dateFilter={dateFilter}
        currentPage={currentPage}
        refreshState={refreshState}
        refreshProgress={refreshProgress}
        selectedMapRecordId={selectedMapRecordId}
        onBack={() => setActiveScreen("home")}
        onSwitchView={setDetectedView}
        onSearchChange={setSearchTerm}
        onDateFilterChange={setDateFilter}
        onRefresh={handleRefreshDetectedData}
        onPageChange={setCurrentPage}
        onOpenRecord={handleOpenRecord}
        onMapPinSelect={setSelectedMapRecordId}
        strings={strings}
        language={selectedLanguage}
      />
    );
  }

  if (activeScreen === "species-detail") {
    screenContent = (
      <PlantDetailScreen
        record={selectedRecord}
        onBack={() => setActiveScreen("detected")}
        strings={strings}
        language={selectedLanguage}
      />
    );
  }

  if (activeScreen === "explore-detail") {
    screenContent = (
      <ExplorePlantDetailScreen
        record={selectedExploreRecord}
        onBack={() => setActiveScreen("explore")}
        strings={strings}
        language={selectedLanguage}
      />
    );
  }

  return (
    <main className="app-shell">
      {isLoading ? <SplashScreen strings={strings} dailyQuote={dailyQuote} /> : screenContent}
      {refreshErrorMessage ? (
        <ActionModal
          title={strings.detected.refreshFailedTitle}
          message={refreshErrorMessage}
          closeLabel={strings.common.close}
          onClose={() => setRefreshErrorMessage("")}
        />
      ) : null}
    </main>
  );
}

export default App;
