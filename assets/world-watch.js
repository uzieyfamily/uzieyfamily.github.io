(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const zones = [
    { city: "Kuala Lumpur", zone: "Asia/Kuala_Lumpur", note: "Malaysia" },
    { city: "Tokyo", zone: "Asia/Tokyo", note: "Jepun" },
    { city: "Singapore", zone: "Asia/Singapore", note: "Singapura" },
    { city: "Dubai", zone: "Asia/Dubai", note: "UAE" },
    { city: "London", zone: "Europe/London", note: "United Kingdom" },
    { city: "New York", zone: "America/New_York", note: "Amerika Syarikat" },
    { city: "Sydney", zone: "Australia/Sydney", note: "Australia" },
    { city: "UTC", zone: "UTC", note: "Masa sejagat" }
  ];
  const dateTime = (date, zone, options) => new Intl.DateTimeFormat("ms-MY", { timeZone: zone, ...options }).format(date);

  function buildClocks() {
    document.querySelectorAll(".ww-clock-face").forEach((face) => {
      const isReverse = face.dataset.clock === "counterclockwise";
      const ticks = $(".ww-clock-ticks", face);
      const numbers = $(".ww-clock-numbers", face);
      for (let i = 0; i < 60; i++) {
        const tick = document.createElement("span");
        tick.className = "ww-clock-tick" + (i % 5 === 0 ? " major" : "");
        tick.style.transform = "rotate(" + (isReverse ? -i * 6 : i * 6) + "deg)";
        ticks.appendChild(tick);
      }
      for (let i = 1; i <= 12; i++) {
        const n = document.createElement("span");
        n.className = "ww-clock-number";
        n.textContent = String(i);
        const angle = (isReverse ? -1 : 1) * i * 30 * Math.PI / 180;
        n.style.left = (50 + 39 * Math.sin(angle)) + "%";
        n.style.top = (50 - 39 * Math.cos(angle)) + "%";
        numbers.appendChild(n);
      }
    });

    const grid = $("#timezone-grid");
    if (grid) {
      grid.replaceChildren();
      zones.forEach((item) => {
        const card = document.createElement("div");
        card.className = "ww-zone-card";
        card.innerHTML = '<div class="ww-zone-city"></div><div class="ww-zone-time" data-zone-time></div><div class="ww-zone-date" data-zone-date></div>';
        $(".ww-zone-city", card).textContent = item.city + " · " + item.note;
        card.dataset.zone = item.zone;
        grid.appendChild(card);
      });
    }
  }

  function updateClocks() {
    const now = new Date();
    const localZone = "Asia/Kuala_Lumpur";
    const digital = $("#digital-time");
    const date = $("#digital-date");
    if (digital) digital.textContent = dateTime(now, localZone, { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
    if (date) date.textContent = dateTime(now, localZone, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    document.querySelectorAll(".ww-clock-face").forEach((face) => {
      const reverse = face.dataset.clock === "counterclockwise";
      const hour = Number(dateTime(now, localZone, { hour: "2-digit", hourCycle: "h23" }));
      const minute = Number(dateTime(now, localZone, { minute: "2-digit" }));
      const second = Number(dateTime(now, localZone, { second: "2-digit" }));
      const sign = reverse ? -1 : 1;
      const angles = {
        ".ww-hour": sign * ((hour % 12) * 30 + minute * .5),
        ".ww-minute": sign * (minute * 6 + second * .1),
        ".ww-second": sign * (second * 6)
      };
      Object.entries(angles).forEach(([selector, angle]) => {
        const hand = $(selector, face);
        if (hand) hand.style.transform = "translateX(-50%) rotate(" + angle + "deg)";
      });
    });

    document.querySelectorAll(".ww-zone-card").forEach((card) => {
      const zone = card.dataset.zone;
      const time = $("[data-zone-time]", card);
      const day = $("[data-zone-date]", card);
      if (time) time.textContent = dateTime(now, zone, { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
      if (day) day.textContent = dateTime(now, zone, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    });
  }

  const safeText = (value, fallback = "Maklumat tidak tersedia") => {
    if (value === null || value === undefined || value === "") return fallback;
    return String(value);
  };
  function eventItem(title, detail, link, badge) {
    const row = document.createElement("div");
    row.className = "ww-event-item";
    const head = document.createElement("div");
    head.className = "ww-event-title";
    const label = document.createElement(link ? "a" : "span");
    label.textContent = safeText(title);
    if (link && /^https:\/\//i.test(link)) {
      label.href = link;
      label.target = "_blank";
      label.rel = "noopener noreferrer";
    }
    head.appendChild(label);
    if (badge) {
      const b = document.createElement("span");
      b.className = "ww-mag";
      b.textContent = badge;
      head.appendChild(b);
    }
    const d = document.createElement("div");
    d.className = "ww-event-detail";
    d.textContent = safeText(detail);
    row.append(head, d);
    return row;
  }
  function message(container, text, className = "ww-muted") {
    if (!container) return;
    const p = document.createElement("p");
    p.className = className;
    p.textContent = text;
    container.replaceChildren(p);
  }
  async function getJSON(url) {
    const response = await fetch(url, { cache: "no-store", headers: { "Accept": "application/geo+json, application/json" } });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  }
  async function getXML(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.text();
  }
  function renderQuakes(data) {
    const list = $("#quake-list");
    const features = Array.isArray(data.features) ? data.features : [];
    const count = $("#quake-count");
    if (count) count.textContent = String(features.length);
    if (!list) return;
    list.replaceChildren();
    if (!features.length) {
      message(list, "Tiada rekod gempa dalam feed 24 jam yang diterima. Semak pautan USGS untuk status terkini.");
      return;
    }
    features.sort((a, b) => (b.properties?.time || 0) - (a.properties?.time || 0)).slice(0, 7).forEach((feature) => {
      const p = feature.properties || {};
      const when = p.time ? dateTime(new Date(p.time), "Asia/Kuala_Lumpur", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) + " MYT" : "Masa tidak dinyatakan";
      const depth = feature.geometry?.coordinates?.[2];
      const details = when + " · Kedalaman " + (Number.isFinite(depth) ? depth.toFixed(1) + " km" : "—");
      list.appendChild(eventItem(p.place || "Lokasi tidak diketahui", details, p.url, "M" + (Number(p.mag || 0).toFixed(1))));
    });
  }

  function xmlEntries(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("XML tidak sah");
    return Array.from(doc.querySelectorAll("entry")).map((entry) => {
      const title = entry.querySelector("title")?.textContent?.trim() || "Buletin tsunami";
      const updated = entry.querySelector("updated, published")?.textContent?.trim() || "";
      const linkEl = entry.querySelector("link[rel='alternate'], link[href]");
      const href = linkEl?.getAttribute("href") || "";
      const summary = entry.querySelector("summary, content")?.textContent?.trim() || "";
      return { title, updated, href, summary };
    });
  }
  async function loadTsunami() {
    const list = $("#tsunami-list");
    const status = $("#tsunami-status");
    if (status) status.textContent = "Menyemak suapan NOAA PTWC dan NTWC…";
    try {
      const feeds = await Promise.allSettled([
        getXML("https://www.tsunami.gov/events/xml/PHEBAtom.xml"),
        getXML("https://www.tsunami.gov/events/xml/PAAQAtom.xml")
      ]);
      const entries = [];
      const errors = [];
      feeds.forEach((result, index) => {
        const label = index === 0 ? "PTWC" : "NTWC";
        if (result.status === "fulfilled") {
          xmlEntries(result.value).forEach((item) => entries.push({ ...item, source: label }));
        } else {
          errors.push(label);
        }
      });
      if (list) {
        list.replaceChildren();
        if (entries.length) {
          entries.slice(0, 6).forEach((item) => {
            const stamp = item.updated ? dateTime(new Date(item.updated), "Asia/Kuala_Lumpur", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) + " MYT" : "Masa tidak dinyatakan";
            list.appendChild(eventItem(item.title, item.source + " · " + stamp + (item.summary ? " · " + item.summary.slice(0, 130) : ""), item.href, item.source));
          });
        } else if (errors.length === 2) {
          message(list, "Pelayar tidak dapat membaca suapan Atom secara terus. Gunakan pautan PTWC / NTWC rasmi di bawah untuk melihat mesej terkini.");
        } else {
          message(list, "Tiada mesej terkini dalam suapan yang berjaya dibaca. Sila semak halaman rasmi NOAA.");
        }
      }
      if (status) status.textContent = errors.length ? "Paparan suapan terhad (" + errors.join(", ") + " tidak dapat dicapai dari pelayar)." : "Suapan NOAA berjaya disemak · " + entries.length + " mesej diterima.";
    } catch (error) {
      if (status) status.textContent = "Suapan automatik tidak dapat dibaca. Pautan rasmi NOAA masih tersedia.";
      message(list, "Tidak dapat mengambil data secara automatik. Buka feed PTWC atau NTWC melalui pautan rasmi.");
    }
  }

  function flattenRecords(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.features)) return data.features.map((f) => ({ ...(f.properties || {}), geometry: f.geometry }));
    if (data && typeof data === "object") {
      for (const key of ["volcanoes", "results", "items", "data", "events", "features"]) {
        if (Array.isArray(data[key])) return data[key].map((f) => f.properties ? { ...(f.properties || {}), geometry: f.geometry } : f);
      }
      for (const value of Object.values(data)) {
        if (Array.isArray(value)) return value;
      }
    }
    return [];
  }
  function pick(obj, keys) {
    for (const key of keys) {
      if (obj && obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
    }
    return "";
  }
  async function loadVolcanoes() {
    const list = $("#volcano-list");
    const status = $("#volcano-status");
    if (status) status.textContent = "Menyemak USGS dan GDACS…";
    const urls = [
      { name: "USGS", url: "https://volcanoes.usgs.gov/hans-public/api/volcano/getElevatedVolcanoes" },
      { name: "GDACS", url: "https://www.gdacs.org/contentdata/xml/gdacsVO.geojson" }
    ];
    const results = await Promise.allSettled(urls.map((item) => getJSON(item.url)));
    const visible = [];
    const failures = [];
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        failures.push(urls[index].name);
        return;
      }
      const records = flattenRecords(result.value);
      records.forEach((record) => visible.push({ record, source: urls[index].name }));
    });
    if (list) {
      list.replaceChildren();
      if (visible.length) {
        visible.slice(0, 7).forEach(({ record, source }) => {
          const name = pick(record, ["volcanoName", "volcano_name", "name", "volcano", "eventname", "eventName"]);
          const level = pick(record, ["alertLevel", "alert_level", "alertlevel", "level", "status", "alert"]);
          const updated = pick(record, ["updated", "alertDate", "alert_date", "date", "fromdate", "fromDate", "datetime"]);
          const link = pick(record, ["url", "link", "href", "eventurl", "eventUrl"]);
          const summary = (level ? String(level) + " · " : "") + source + (updated ? " · " + safeText(updated) : "");
          list.appendChild(eventItem(name || "Notis gunung berapi", summary, link, source));
        });
      } else if (failures.length === 2) {
        message(list, "Data automatik USGS/GDACS tidak dapat dicapai. Sila buka notis rasmi gunung berapi melalui pautan sumber.");
      } else {
        message(list, "Tiada notis gunung berapi meningkat dipaparkan dalam feed yang diterima. Semak notis rasmi bagi status terperinci.");
      }
    }
    if (status) {
      status.textContent = failures.length ? "Sumber tidak lengkap: " + failures.join(", ") + " tidak dapat dicapai." : "Sumber USGS dan GDACS berjaya disemak.";
    }
  }

  async function refreshData() {
    const stamp = $("#data-updated");
    const button = $("#refresh-data");
    if (button) { button.disabled = true; button.textContent = "↻ Mengemas kini…"; }
    const jobs = await Promise.allSettled([
      getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(renderQuakes),
      loadTsunami(),
      loadVolcanoes()
    ]);
    if (jobs[0].status === "rejected") {
      message($("#quake-list"), "Feed USGS tidak dapat dicapai sekarang. Gunakan pautan rasmi USGS.");
      const count = $("#quake-count"); if (count) count.textContent = "—";
    }
    if (stamp) stamp.textContent = "Semakan terakhir: " + dateTime(new Date(), "Asia/Kuala_Lumpur", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " MYT · Semakan automatik setiap 5 minit.";
    if (button) { button.disabled = false; button.textContent = "↻ Segar semula data"; }
  }

  buildClocks();
  updateClocks();
  window.setInterval(updateClocks, 1000);
  refreshData();
  window.setInterval(refreshData, 5 * 60 * 1000);
  const refreshButton = $("#refresh-data");
  if (refreshButton) refreshButton.addEventListener("click", refreshData);
})();