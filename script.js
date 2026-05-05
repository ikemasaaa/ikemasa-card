(function () {
  const STORAGE_KEYS = {
    draft: "personal-card:draft:v1",
    theme: "personal-card:theme:v1",
    legacyTheme: "card-theme",
  };

  const FALLBACK_CONFIG = {
    version: 1,
    profile: {
      name: "Ikemasa",
      label: "デジタル名刺",
      tagline: "AI活用・業務改善・プロダクトづくりの相談相手",
      description: "現場の課題を、小さく試せる形に落とすところから手伝います。",
      body:
        "AIを使った業務改善や、プロダクトづくりの支援をしています。現場の課題を丁寧に聞き、小さく試せる形に落とし込むところから伴走します。話すのが好きで、整理するのも得意です。",
      details: [
        { term: "相談しやすいこと", description: "AI活用の入口、業務改善、MVP、壁打ち" },
        { term: "今日の使い方", description: "話した内容を思い出し、必要なら後からつながる" },
      ],
    },
    eventContext: {
      enabled: true,
      kicker: "今日お会いした方へ",
      upcomingKicker: "今回お会いする方へ",
      title: "今日の文脈",
      upcomingTitle: "今回の文脈",
      eventName: "AIなんでも展示会",
      displayDate: "2026.05.06",
      location: "",
      activeFrom: "2026-05-06",
      activeUntil: "2026-05-06",
      note: "会場でお会いした方向けの短いメモです。",
      topicLabel: "今日話せること",
      upcomingTopicLabel: "今回話せること",
      topics: ["AI導入の最初の一歩", "業務効率化の相談", "プロダクト開発の壁打ち"],
    },
    defaultContext: {
      kicker: "Default",
      title: "普段の相談テーマ",
      summary: "イベントがない日も、こんな相談なら話しやすいです。",
      topicLabel: "相談しやすいこと",
      topics: ["AI活用の入口設計", "業務効率化・自動化", "プロダクトづくり", "壁打ち・整理"],
    },
    topics: [
      {
        title: "AI活用の入口設計",
        description: "何から試すべきか、業務にどう入れるかを一緒に整理します。",
      },
      {
        title: "業務効率化・自動化",
        description: "手作業や属人化している流れを、小さく改善できる形に分解します。",
      },
      {
        title: "プロダクトづくり",
        description: "アイデアを画面、仕様、プロトタイプに落とします。",
      },
      {
        title: "壁打ち・整理",
        description: "まだ曖昧な相談を、次の手に変えるところから手伝います。",
      },
    ],
    contacts: [
      {
        id: "email",
        type: "email",
        icon: "mail",
        label: "メールで連絡する",
        value: "",
        detail: "メールアドレス未設定",
        enabled: false,
        showWhenDisabled: true,
      },
      {
        id: "x",
        type: "url",
        icon: "x",
        label: "Xでつながる",
        value: "https://x.com/ikedamasaki",
        detail: "ゆるく情報交換しましょう",
        enabled: true,
        showWhenDisabled: false,
      },
      {
        id: "instagram",
        type: "url",
        icon: "instagram",
        label: "Instagramを見る",
        value: "",
        detail: "写真や日々の発信など",
        enabled: false,
        showWhenDisabled: false,
      },
      {
        id: "github",
        type: "url",
        icon: "github",
        label: "GitHubを見る",
        value: "https://github.com/ikedamasaki",
        detail: "公開している制作物など",
        enabled: true,
        showWhenDisabled: false,
      },
    ],
  };

  const ICONS = {
    arrow: "M5 12h14M13 5l7 7-7 7",
    box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z M3.3 7 12 12l8.7-5 M12 22V12",
    calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    chat: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z M8 9h8M8 13h5",
    github: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6A4.6 4.6 0 0 0 19 5a4.2 4.2 0 0 0-.1-3s-1.3-.4-4 1.5a13.4 13.4 0 0 0-7 0C5.2 1.6 3.9 2 3.9 2A4.2 4.2 0 0 0 4 5a4.6 4.6 0 0 0-1 3.5c0 4.5 3 6 6 6A4.8 4.8 0 0 0 8 18v4 M8 20c-3 .9-5-1-6-3",
    instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z M17.5 6.5h.01",
    mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M22 6l-10 7L2 6",
    pen: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
    send: "M22 2 11 13 M22 2l-7 20-4-9-9-4 20-7Z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-5",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
    user: "M20 21a8 8 0 0 0-16 0 M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    workflow: "M3 6h6v6H3z M15 12h6v6h-6z M9 9h3a3 3 0 0 1 3 3 M12 15H9a3 3 0 0 1-3-3",
    x: "M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l5 7 5-7Z",
  };

  const baseConfig = normalizeConfig(deepMerge(FALLBACK_CONFIG, window.SITE_CONFIG || {}));
  const eventOverride = readEventOverrideFromHash();
  const isEditing = new URLSearchParams(window.location.search).has("edit");
  const initialDraftConfig = isEditing ? loadDraftConfig() : null;
  let draftApplied = Boolean(initialDraftConfig);
  let currentConfig = normalizeConfig(
    isEditing ? initialDraftConfig || baseConfig : applyEventOverride(baseConfig, eventOverride),
  );

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function deepMerge(base, override) {
    if (Array.isArray(base) || Array.isArray(override)) {
      return override === undefined ? clone(base) : clone(override);
    }
    if (!isPlainObject(base) || !isPlainObject(override)) {
      return override === undefined ? clone(base) : clone(override);
    }

    const result = clone(base);
    Object.keys(override).forEach((key) => {
      result[key] = deepMerge(base[key], override[key]);
    });
    return result;
  }

  function clone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  function normalizeConfig(config) {
    const next = deepMerge(FALLBACK_CONFIG, config || {});
    next.profile.details = Array.isArray(next.profile.details) ? next.profile.details : [];
    next.topics = Array.isArray(next.topics) ? next.topics : [];
    next.eventContext.topics = Array.isArray(next.eventContext.topics)
      ? next.eventContext.topics.filter(Boolean).map((topic) => String(topic).trim()).filter(Boolean)
      : [];
    next.defaultContext.topics = Array.isArray(next.defaultContext.topics)
      ? next.defaultContext.topics.filter(Boolean).map((topic) => String(topic).trim()).filter(Boolean)
      : [];
    next.contacts = ensureContactSet(next.contacts);
    return next;
  }

  function ensureContactSet(contacts) {
    const normalized = (Array.isArray(contacts) ? contacts : []).map(normalizeContact);
    const byId = new Map(normalized.map((contact) => [contact.id, contact]));

    FALLBACK_CONFIG.contacts.map(normalizeContact).forEach((fallbackContact) => {
      if (!byId.has(fallbackContact.id)) byId.set(fallbackContact.id, fallbackContact);
    });

    return Array.from(byId.values());
  }

  function normalizeContact(contact) {
    const original = contact || {};
    const legacyKind = original.type || "";
    const id = String(original.id || legacyKind || slugify(original.label) || "contact").trim();
    const type = legacyKind === "mail" || legacyKind === "email" ? "email" : original.type === "email" ? "email" : "url";
    const value = getContactValue(original, type);
    const enabled = typeof original.enabled === "boolean" ? original.enabled : !original.disabled && Boolean(value);

    return {
      id,
      type,
      icon: original.icon || getDefaultIcon(id, type),
      label: String(original.label || getDefaultLabel(id, type)).trim(),
      value,
      detail: String(original.detail || "").trim(),
      enabled,
      showWhenDisabled: typeof original.showWhenDisabled === "boolean" ? original.showWhenDisabled : id === "email",
    };
  }

  function getDefaultIcon(id, type) {
    if (id === "github") return "github";
    if (id === "instagram") return "instagram";
    if (id === "x") return "x";
    if (type === "email") return "mail";
    return "send";
  }

  function getDefaultLabel(id, type) {
    if (id === "github") return "GitHubを見る";
    if (id === "instagram") return "Instagramを見る";
    if (id === "x") return "Xでつながる";
    if (type === "email") return "メールで連絡する";
    return "リンクを開く";
  }

  function getContactValue(contact, type) {
    const directValue = String(contact.value || "").trim();
    if (directValue) return directValue;

    const href = String(contact.href || "").trim();
    if (!href) return "";
    if (type === "email" || href.startsWith("mailto:")) return getMailAddress(href);
    return href;
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value || "";
    });
  }

  function setPhraseText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      const parts = String(value || "").split("・");
      const spans = parts.map((part, index) => {
        const span = document.createElement("span");
        span.className = "phrase";
        span.textContent = index < parts.length - 1 ? `${part}・` : part;
        return span;
      });
      node.replaceChildren(...spans);
    });
  }

  function clearAndAppend(parent, children) {
    if (!parent) return;
    parent.replaceChildren(...children);
  }

  function isValidHttpsUrl(value) {
    return /^https:\/\/[^\s]+$/i.test(String(value || "").trim());
  }

  function isValidEmail(value) {
    const email = String(value || "").trim();
    if (!email || /[\r\n]/.test(email)) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getMailAddress(href) {
    const trimmed = String(href || "").trim();
    if (/[\r\n]/.test(trimmed)) return "";

    if (!trimmed.startsWith("mailto:")) return isValidEmail(trimmed) ? trimmed : "";

    let url;
    try {
      url = new URL(trimmed);
    } catch (_error) {
      return "";
    }

    if (url.protocol !== "mailto:") return "";
    const address = decodeURIComponent(url.pathname || "");
    if (/[\r\n]/.test(address)) return "";
    return isValidEmail(address) ? address : "";
  }

  function getContactHref(contact) {
    if (!contact || !contact.enabled) return "";
    if (contact.type === "email") {
      return isValidEmail(contact.value) ? `mailto:${contact.value.trim()}` : "";
    }
    return isValidHttpsUrl(contact.value) ? contact.value.trim() : "";
  }

  function getContactKind(contact) {
    if (!getContactHref(contact)) return "";
    return contact.type === "email" ? "mail" : "link";
  }

  function isDisplayableContact(contact) {
    return Boolean(contact && contact.label && (contact.enabled || contact.showWhenDisabled));
  }

  function createIcon(name, className = "icon") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("class", className);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    path.setAttribute("d", ICONS[name] || ICONS.arrow);
    svg.append(path);
    return svg;
  }

  function decorateStaticIcons() {
    document.querySelectorAll("[data-icon]").forEach((node) => {
      node.replaceChildren(createIcon(node.dataset.icon, "icon"));
    });
    document.querySelectorAll("[data-primary-icon]").forEach((node) => {
      node.replaceChildren(createIcon("mail", "icon"));
    });
    document.querySelectorAll("[data-secondary-icon]").forEach((node) => {
      node.replaceChildren(createIcon("user", "icon"));
    });
    document.querySelectorAll(".note-icon").forEach((node) => {
      node.replaceChildren(createIcon("shield", "icon"));
    });
  }

  function setButtonContent(button, label, iconName) {
    const iconWrap = document.createElement("span");
    const text = document.createElement("span");
    iconWrap.className = "button-icon";
    iconWrap.setAttribute("aria-hidden", "true");
    iconWrap.append(createIcon(iconName, "icon"));
    text.textContent = label;
    button.replaceChildren(iconWrap, text);
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function getTodayKey(date = new Date()) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function getDateKey(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
  }

  function getEventState(eventContext, now = new Date(), options = {}) {
    if (!eventContext || !eventContext.enabled) return "inactive";

    const activeFrom = getDateKey(eventContext.activeFrom);
    const activeUntil = getDateKey(eventContext.activeUntil);
    if (!activeFrom || !activeUntil || activeFrom > activeUntil) return "inactive";

    const current = getTodayKey(now);
    if (current < activeFrom) return "upcoming";
    if (current <= activeUntil) return "active";
    return options.preservePast ? "past" : "inactive";
  }

  function createMetaRow(term, description) {
    const wrap = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    wrap.append(dt, dd);
    return wrap;
  }

  function renderAll() {
    renderProfile();
    renderTopics();
    renderContext();
    renderContacts();
  }

  function renderProfile() {
    const { profile } = currentConfig;
    setText("[data-profile-name]", profile.name);
    setText("[data-profile-headline]", profile.name);
    setText("[data-profile-label]", profile.label);
    setPhraseText("[data-profile-tagline]", profile.tagline);
    setText("[data-profile-description]", profile.description);
    setText("[data-profile-body]", profile.body);
    setText("[data-footer-name]", profile.name);

    document.title = `${profile.name} | ${profile.tagline}`;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (descriptionMeta) descriptionMeta.content = profile.description || "";
    if (ogTitle) ogTitle.content = `${profile.name} | デジタル名刺`;
    if (ogDescription) ogDescription.content = profile.description || "";

    clearAndAppend(
      document.querySelector("[data-profile-details]"),
      profile.details.map(({ term, description }) => createMetaRow(term, description)),
    );
  }

  function renderTopics() {
    const topicList = document.querySelector("[data-topic-list]");
    const icons = ["box", "workflow", "pen", "chat"];
    const items = currentConfig.topics.map(({ title, description }, index) => {
      const article = document.createElement("article");
      article.className = "topic-row";

      const iconWrap = document.createElement("span");
      iconWrap.className = "topic-icon";
      iconWrap.append(createIcon(icons[index] || "chat", "icon"));

      const copy = document.createElement("div");
      const heading = document.createElement("h3");
      const text = document.createElement("p");
      heading.textContent = title;
      text.textContent = description;
      copy.append(heading, text);

      const arrow = document.createElement("span");
      arrow.className = "row-arrow";
      arrow.append(createIcon("arrow", "icon"));

      article.append(iconWrap, copy, arrow);
      return article;
    });

    clearAndAppend(topicList, items);
  }

  function renderContext() {
    const eventState = getEventState(currentConfig.eventContext, new Date(), {
      preservePast: Boolean(eventOverride) && !isEditing,
    });
    const eventVisible = eventState === "active" || eventState === "upcoming" || eventState === "past";
    const context = eventVisible ? currentConfig.eventContext : currentConfig.defaultContext;
    const title = eventState === "active"
      ? context.title
      : eventState === "upcoming"
        ? context.upcomingTitle
        : eventState === "past"
          ? "このイベントの文脈"
          : currentConfig.defaultContext.title;
    const kicker = eventState === "past"
      ? "このイベントでお会いした方へ"
      : eventState === "upcoming"
        ? context.upcomingKicker
        : context.kicker;
    const topicLabel = eventState === "upcoming"
      ? context.upcomingTopicLabel
      : eventState === "past"
        ? "このイベントで話しやすいこと"
        : context.topicLabel;
    const summary = eventVisible ? context.eventName : currentConfig.defaultContext.summary;

    setText("[data-context-kicker]", kicker || "");
    setText("[data-context-title]", title);
    setText("[data-context-summary]", summary);
    setText("[data-context-topic-label]", topicLabel || "相談しやすいこと");
    setText("[data-footer-context]", eventVisible ? `${context.eventName} ${context.displayDate}` : "Personal card");

    const metaItems = [];
    if (eventVisible && context.displayDate) metaItems.push(createMetaRow("日付", context.displayDate));
    if (eventVisible && context.location) metaItems.push(createMetaRow("場所", context.location));
    if (eventState === "past") metaItems.push(createMetaRow("状態", "過去イベントの文脈"));
    if (!eventVisible) metaItems.push(createMetaRow("状態", "常設の名刺ページ"));
    clearAndAppend(document.querySelector("[data-context-meta]"), metaItems);

    const topicNodes = (context.topics || []).map((topic) => {
      const item = document.createElement("li");
      item.textContent = topic;
      return item;
    });
    clearAndAppend(document.querySelector("[data-context-topics]"), topicNodes);
  }

  function renderContacts() {
    const contactConfig = Array.isArray(currentConfig.contacts) ? currentConfig.contacts : [];
    const contacts = contactConfig.filter(isDisplayableContact);
    const hasActiveContacts = contactConfig.some((contact) => Boolean(getContactHref(contact)));
    const hasContacts = contacts.length > 0;
    const contactSection = document.querySelector("[data-contact-section]");
    const contactNav = document.querySelector("[data-contact-nav]");
    const contactNote = document.querySelector("[data-contact-note]");
    const primaryCta = document.querySelector("[data-primary-cta]");
    const secondaryCta = document.querySelector("[data-secondary-cta]");

    if (contactSection) contactSection.hidden = !hasContacts;
    if (contactNav) contactNav.hidden = !hasContacts;
    if (contactNote) contactNote.hidden = !hasContacts;

    if (primaryCta && secondaryCta) {
      if (hasActiveContacts) {
        primaryCta.href = "#contact";
        primaryCta.dataset.scrollTarget = "contact";
        setButtonContent(primaryCta, "連絡する", "mail");
        secondaryCta.href = "#topics";
        secondaryCta.dataset.scrollTarget = "topics";
        setButtonContent(secondaryCta, "話せることを見る", "chat");
      } else {
        primaryCta.href = "#topics";
        primaryCta.dataset.scrollTarget = "topics";
        setButtonContent(primaryCta, "話せることを見る", "chat");
        secondaryCta.href = "#profile";
        secondaryCta.dataset.scrollTarget = "profile";
        setButtonContent(secondaryCta, "プロフィールを見る", "user");
      }
    }

    const contactNodes = contacts.map((contact) => {
      const item = document.createElement("li");
      const contactKind = getContactKind(contact);
      const href = getContactHref(contact);
      const link = document.createElement(contactKind ? "a" : "div");
      link.className = contactKind ? "action-link" : "action-link is-disabled";
      link.append(createIcon(contact.icon || contactKind || "send", "icon"));

      if (contactKind) link.href = href;
      if (contactKind && contactKind !== "mail") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      if (!contactKind) link.setAttribute("aria-disabled", "true");

      const label = document.createElement("span");
      label.textContent = contact.label;
      const detail = document.createElement("small");
      detail.textContent = contact.detail || "あとで確認できます";
      link.append(label, detail);
      item.append(link);

      if (contactKind === "mail") {
        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.type = "button";
        copyButton.textContent = "コピー";
        copyButton.dataset.copyValue = contact.value.trim();
        item.append(copyButton);
      }

      return item;
    });

    clearAndAppend(document.querySelector("[data-contact-list]"), contactNodes);
  }

  function readEventOverrideFromHash() {
    const hash = window.location.hash || "";
    if (!hash.startsWith("#event=")) return null;

    try {
      const encoded = hash.slice("#event=".length);
      const parsed = JSON.parse(base64UrlDecode(encoded));
      return sanitizeEventOverride(parsed);
    } catch (_error) {
      return null;
    }
  }

  function sanitizeEventOverride(value) {
    if (!isPlainObject(value) || value.version !== 1) return null;

    const event = isPlainObject(value.event) ? value.event : {};
    const topics = Array.isArray(value.topics)
      ? value.topics.map((topic) => limitText(topic, 72)).filter(Boolean).slice(0, 5)
      : [];
    const contacts = isPlainObject(value.contacts) ? value.contacts : {};

    const override = {
      version: 1,
      event: {
        enabled: typeof event.enabled === "boolean" ? event.enabled : true,
        eventName: limitText(event.eventName, 80),
        displayDate: limitText(event.displayDate, 32),
        location: limitText(event.location, 80),
        activeFrom: getDateKey(event.activeFrom),
        activeUntil: getDateKey(event.activeUntil),
        note: limitText(event.note, 120),
      },
      topics,
      contacts: {},
    };

    Object.keys(contacts).forEach((id) => {
      if (/^[a-z0-9-]+$/i.test(id) && typeof contacts[id] === "boolean") {
        override.contacts[id] = contacts[id];
      }
    });

    return override;
  }

  function limitText(value, maxLength) {
    return String(value || "").trim().slice(0, maxLength);
  }

  function applyEventOverride(config, override) {
    const next = clone(config);
    if (!override) return next;

    const event = override.event || {};
    next.eventContext.enabled = typeof event.enabled === "boolean" ? event.enabled : next.eventContext.enabled;
    if (event.eventName) next.eventContext.eventName = event.eventName;
    if (event.displayDate) next.eventContext.displayDate = event.displayDate;
    if (event.location !== undefined) next.eventContext.location = event.location;
    if (event.activeFrom) next.eventContext.activeFrom = event.activeFrom;
    if (event.activeUntil) next.eventContext.activeUntil = event.activeUntil;
    if (event.note) next.eventContext.note = event.note;
    if (override.topics && override.topics.length) next.eventContext.topics = override.topics;

    next.contacts = next.contacts.map((contact) => {
      if (!Object.prototype.hasOwnProperty.call(override.contacts || {}, contact.id)) return contact;
      return { ...contact, enabled: Boolean(override.contacts[contact.id]) };
    });

    return normalizeConfig(next);
  }

  function buildEventOverride(config) {
    const eventContext = config.eventContext || {};
    const contacts = {};
    (config.contacts || []).forEach((contact) => {
      contacts[contact.id] = Boolean(contact.enabled);
    });

    return {
      version: 1,
      event: {
        enabled: Boolean(eventContext.enabled),
        eventName: eventContext.eventName || "",
        displayDate: eventContext.displayDate || "",
        location: eventContext.location || "",
        activeFrom: getDateKey(eventContext.activeFrom),
        activeUntil: getDateKey(eventContext.activeUntil),
        note: eventContext.note || "",
      },
      topics: (eventContext.topics || []).slice(0, 5),
      contacts,
    };
  }

  function base64UrlEncode(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function base64UrlDecode(value) {
    const padded = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
    const withPadding = padded.padEnd(Math.ceil(padded.length / 4) * 4, "=");
    const binary = atob(withPadding);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function loadDraftConfig() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.draft);
      if (!raw) return null;
      return normalizeConfig(JSON.parse(raw));
    } catch (_error) {
      return null;
    }
  }

  function saveDraftConfig(config) {
    window.localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(config));
  }

  function removeDraftConfig() {
    window.localStorage.removeItem(STORAGE_KEYS.draft);
  }

  function getField(name) {
    return document.querySelector(`[data-editor-field="${name}"]`);
  }

  function setFieldValue(name, value) {
    const field = getField(name);
    if (!field) return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value || "";
  }

  function getFieldValue(name) {
    const field = getField(name);
    if (!field) return "";
    if (field.type === "checkbox") return field.checked;
    return field.value.trim();
  }

  function populateEditor(config) {
    const eventContext = config.eventContext || {};
    setFieldValue("event.enabled", Boolean(eventContext.enabled));
    setFieldValue("event.eventName", eventContext.eventName || "");
    setFieldValue("event.displayDate", eventContext.displayDate || "");
    setFieldValue("event.location", eventContext.location || "");
    setFieldValue("event.activeFrom", getDateKey(eventContext.activeFrom));
    setFieldValue("event.activeUntil", getDateKey(eventContext.activeUntil));
    setFieldValue("event.note", eventContext.note || "");

    document.querySelectorAll("[data-event-topic]").forEach((field, index) => {
      field.value = eventContext.topics[index] || "";
    });

    const contactsById = new Map((config.contacts || []).map((contact) => [contact.id, contact]));
    document.querySelectorAll("[data-editor-contact-id]").forEach((row) => {
      const contact = contactsById.get(row.dataset.editorContactId) || {};
      row.querySelectorAll("[data-contact-field]").forEach((field) => {
        const key = field.dataset.contactField;
        if (field.type === "checkbox") field.checked = Boolean(contact[key]);
        else field.value = contact[key] || "";
      });
    });

    updateEditorState();
  }

  function readEditorConfig() {
    const next = clone(baseConfig);
    next.eventContext.enabled = Boolean(getFieldValue("event.enabled"));
    next.eventContext.eventName = getFieldValue("event.eventName");
    next.eventContext.displayDate = getFieldValue("event.displayDate");
    next.eventContext.location = getFieldValue("event.location");
    next.eventContext.activeFrom = getFieldValue("event.activeFrom");
    next.eventContext.activeUntil = getFieldValue("event.activeUntil");
    next.eventContext.note = getFieldValue("event.note");
    next.eventContext.topics = Array.from(document.querySelectorAll("[data-event-topic]"))
      .map((field) => field.value.trim())
      .filter(Boolean)
      .slice(0, 5);

    const contactsById = new Map(next.contacts.map((contact) => [contact.id, contact]));
    document.querySelectorAll("[data-editor-contact-id]").forEach((row) => {
      const id = row.dataset.editorContactId;
      const contact = contactsById.get(id) || normalizeContact({ id });
      row.querySelectorAll("[data-contact-field]").forEach((field) => {
        const key = field.dataset.contactField;
        contact[key] = field.type === "checkbox" ? field.checked : field.value.trim();
      });
      contactsById.set(id, normalizeContact(contact));
    });
    next.contacts = Array.from(contactsById.values());

    return normalizeConfig(next);
  }

  function validateConfig(config) {
    const errors = [];
    const warnings = [];
    const eventContext = config.eventContext || {};
    const activeFrom = getDateKey(eventContext.activeFrom);
    const activeUntil = getDateKey(eventContext.activeUntil);

    if (eventContext.enabled) {
      if (!eventContext.eventName) errors.push("イベント名が空です。");
      if (!activeFrom || !activeUntil) errors.push("表示開始日と表示終了日を入れてください。");
      if (activeFrom && activeUntil && activeFrom > activeUntil) errors.push("表示開始日が表示終了日より後になっています。");
      if (!eventContext.topics || !eventContext.topics.length) warnings.push("その場で話しやすいトピックが空です。");
    }

    (config.contacts || []).forEach((contact) => {
      if (!contact.enabled) return;
      if (contact.type === "email" && !isValidEmail(contact.value)) {
        errors.push(`${contact.label || "メール"}のメールアドレスが未設定、または形式不正です。`);
      }
      if (contact.type !== "email" && !isValidHttpsUrl(contact.value)) {
        errors.push(`${contact.label || "リンク"}のURLは https:// から始めてください。`);
      }
    });

    return { errors, warnings };
  }

  function validateEventUrlConfig(config) {
    const errors = [];
    const baseContacts = new Map((baseConfig.contacts || []).map((contact) => [contact.id, contact]));

    (config.contacts || []).forEach((contact) => {
      if (!contact.enabled) return;

      const baseContact = baseContacts.get(contact.id);
      const baseHref = getContactHref(baseContact);
      const valueChanged = String(contact.value || "").trim() !== String(baseContact?.value || "").trim();
      const labelChanged = String(contact.label || "").trim() !== String(baseContact?.label || "").trim();
      const detailChanged = String(contact.detail || "").trim() !== String(baseContact?.detail || "").trim();

      if (!baseHref) {
        errors.push(`${contact.label || contact.id}は config.js に有効なURL/メールがないため、イベントURLだけでは公開リンクになりません。先に config.js をコピーして反映してください。`);
        return;
      }

      if (valueChanged || labelChanged || detailChanged) {
        errors.push(`${contact.label || contact.id}のURL・ラベル・補足はイベントURLに入りません。先に config.js をコピーして恒久設定へ反映してください。`);
      }
    });

    return errors;
  }

  function updateEditorState() {
    if (!isEditing) return;
    currentConfig = readEditorConfig();
    renderAll();
    const validation = validateConfig(currentConfig);
    showEditorMessages(validation.errors, validation.warnings);
  }

  function showEditorMessages(errors, warnings) {
    const wrap = document.querySelector("[data-editor-messages]");
    if (!wrap) return;
    const messages = [
      ...errors.map((message) => ({ type: "error", message })),
      ...warnings.map((message) => ({ type: "warning", message })),
    ];

    wrap.hidden = messages.length === 0;
    clearAndAppend(
      wrap,
      messages.map((item) => {
        const paragraph = document.createElement("p");
        paragraph.className = `editor-message ${item.type}`;
        paragraph.textContent = item.message;
        return paragraph;
      }),
    );
  }

  function buildPublicEventUrl(config) {
    const url = new URL(window.location.href);
    url.search = "";
    const override = buildEventOverride(config);
    url.hash = `event=${base64UrlEncode(JSON.stringify(override))}`;
    return url.toString();
  }

  function buildConfigJs(config) {
    return `window.SITE_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
  }

  async function copyValue(value, options = {}) {
    const copyStatus = options.statusNode || document.querySelector("[data-copy-status]");
    const outputNode = options.outputNode || null;
    if (outputNode) outputNode.value = value;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("copy command failed");
      }
      if (copyStatus) copyStatus.textContent = options.successMessage || "コピーしました";
      return true;
    } catch (_error) {
      if (copyStatus) {
        copyStatus.textContent = options.failureMessage || "コピーできませんでした。表示欄から選択してコピーしてください。";
      }
      if (outputNode) {
        outputNode.focus();
        outputNode.select();
      }
      return false;
    }
  }

  function setEditorStatus(message) {
    const status = document.querySelector("[data-editor-status]");
    if (status) status.textContent = message || "";
  }

  function setDraftIndicator(visible) {
    const indicator = document.querySelector("[data-draft-indicator]");
    if (indicator) indicator.hidden = !visible;
  }

  function bindEditorEvents() {
    const shell = document.querySelector("[data-editor-shell]");
    if (!shell) return;

    shell.addEventListener("input", updateEditorState);
    shell.addEventListener("change", updateEditorState);

    const outputNode = document.querySelector("[data-editor-output]");
    const statusNode = document.querySelector("[data-editor-status]");

    const saveButton = document.querySelector("[data-save-draft]");
    if (saveButton) {
      saveButton.addEventListener("click", () => {
        updateEditorState();
        saveDraftConfig(currentConfig);
        draftApplied = true;
        setDraftIndicator(true);
        setEditorStatus("下書きをこの端末に保存しました。公開ページにはまだ反映していません。");
      });
    }

    const clearButton = document.querySelector("[data-clear-draft]");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        removeDraftConfig();
        draftApplied = false;
        currentConfig = normalizeConfig(baseConfig);
        populateEditor(currentConfig);
        setDraftIndicator(false);
        setEditorStatus("下書きを消して、config.js の状態に戻しました。");
      });
    }

    const importButton = document.querySelector("[data-import-event]");
    if (importButton) {
      importButton.addEventListener("click", () => {
        if (!eventOverride) return;
        draftApplied = false;
        currentConfig = applyEventOverride(currentConfig, eventOverride);
        populateEditor(currentConfig);
        setDraftIndicator(false);
        setEditorStatus("URLに入っていたイベント設定を編集画面に取り込みました。");
      });
    }

    const eventUrlButton = document.querySelector("[data-copy-event-url]");
    if (eventUrlButton) {
      eventUrlButton.addEventListener("click", async () => {
        updateEditorState();
        const validation = validateConfig(currentConfig);
        const eventUrlErrors = validateEventUrlConfig(currentConfig);
        if (validation.errors.length || eventUrlErrors.length) {
          showEditorMessages([...validation.errors, ...eventUrlErrors], validation.warnings);
          setEditorStatus("先に赤い注意を直してください。公開URLはまだ作っていません。");
          return;
        }

        const publicUrl = buildPublicEventUrl(currentConfig);
        if (publicUrl.length > 3000) {
          setEditorStatus("URLが長すぎます。トピックやメモを短くしてからコピーしてください。");
          return;
        }
        if (publicUrl.length > 2000) {
          setEditorStatus("URLが少し長めです。QRにする前にスマホで読み取り確認してください。");
        }

        await copyValue(publicUrl, {
          statusNode,
          outputNode,
          successMessage: "イベントURLをコピーしました。QRにする前に別端末で開いて確認してください。",
          failureMessage: "自動コピーできませんでした。下の欄からイベントURLをコピーしてください。",
        });
      });
    }

    const configButton = document.querySelector("[data-copy-config]");
    if (configButton) {
      configButton.addEventListener("click", async () => {
        updateEditorState();
        await copyValue(buildConfigJs(currentConfig), {
          statusNode,
          outputNode,
          successMessage: "config.js 用の設定を出力しました。恒久変更に使う内容です。",
          failureMessage: "自動コピーできませんでした。下の欄から config.js 内容をコピーしてください。",
        });
      });
    }
  }

  function initEditor() {
    const layout = document.querySelector("[data-edit-layout]");
    const shell = document.querySelector("[data-editor-shell]");
    const importWrap = document.querySelector("[data-event-import-wrap]");

    if (!isEditing) {
      if (shell) shell.hidden = true;
      return;
    }

    document.documentElement.dataset.mode = "edit";
    if (layout) layout.classList.add("is-editing");
    if (shell) shell.hidden = false;
    if (importWrap) importWrap.hidden = !eventOverride;
    populateEditor(currentConfig);
    setDraftIndicator(draftApplied);
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const copyButton = event.target.closest("[data-copy-value]");
      if (copyButton) {
        copyValue(copyButton.dataset.copyValue);
        return;
      }

      const scrollLink = event.target.closest("[data-scroll-target]");
      if (scrollLink) {
        const target = document.getElementById(scrollLink.dataset.scrollTarget);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });

    const themeToggle = document.querySelector("[data-theme-toggle]");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
        applyTheme(currentTheme === "light" ? "dark" : "light");
      });
    }

    bindEditorEvents();
  }

  function applyTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
    } catch (_error) {
      // localStorage can be unavailable in locked-down preview contexts.
    }
    setText("[data-theme-icon]", nextTheme === "light" ? "☀" : "☾");
  }

  function initTheme() {
    let savedTheme = "";
    try {
      savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme)
        || window.localStorage.getItem(STORAGE_KEYS.legacyTheme)
        || "";
    } catch (_error) {
      savedTheme = "";
    }
    applyTheme(savedTheme || "dark");
  }

  initTheme();
  decorateStaticIcons();
  renderAll();
  initEditor();
  bindEvents();
})();
