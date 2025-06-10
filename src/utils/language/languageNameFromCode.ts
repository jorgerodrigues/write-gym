/**
 * Returns the English language name for a given language code
 * @param code - ISO 639-1, ISO 639-2 language code, or locale code (e.g., 'en_US', 'pt-BR')
 * @returns The English name of the language
 */
export function languageNameFromCode(code: string): string {
  // Map of language codes to English language names
  const languageMap: Record<string, string> = {
    // ISO 639-1 two-letter codes (most common)
    aa: "Afar",
    ab: "Abkhazian",
    ae: "Avestan",
    af: "Afrikaans",
    ak: "Akan",
    am: "Amharic",
    an: "Aragonese",
    ar: "Arabic",
    as: "Assamese",
    av: "Avaric",
    ay: "Aymara",
    az: "Azerbaijani",
    ba: "Bashkir",
    be: "Belarusian",
    bg: "Bulgarian",
    bh: "Bihari",
    bi: "Bislama",
    bm: "Bambara",
    bn: "Bengali",
    bo: "Tibetan",
    br: "Breton",
    bs: "Bosnian",
    ca: "Catalan",
    ce: "Chechen",
    ch: "Chamorro",
    co: "Corsican",
    cr: "Cree",
    cs: "Czech",
    cu: "Church Slavic",
    cv: "Chuvash",
    cy: "Welsh",
    da: "Danish",
    de: "German",
    dv: "Divehi",
    dz: "Dzongkha",
    ee: "Ewe",
    el: "Greek",
    en: "English",
    eo: "Esperanto",
    es: "Spanish",
    et: "Estonian",
    eu: "Basque",
    fa: "Persian",
    ff: "Fulah",
    fi: "Finnish",
    fj: "Fijian",
    fo: "Faroese",
    fr: "French",
    fy: "Western Frisian",
    ga: "Irish",
    gd: "Scottish Gaelic",
    gl: "Galician",
    gn: "Guarani",
    gu: "Gujarati",
    gv: "Manx",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    ho: "Hiri Motu",
    hr: "Croatian",
    ht: "Haitian",
    hu: "Hungarian",
    hy: "Armenian",
    hz: "Herero",
    ia: "Interlingua",
    id: "Indonesian",
    ie: "Interlingue",
    ig: "Igbo",
    ii: "Sichuan Yi",
    ik: "Inupiaq",
    io: "Ido",
    is: "Icelandic",
    it: "Italian",
    iu: "Inuktitut",
    ja: "Japanese",
    jv: "Javanese",
    ka: "Georgian",
    kg: "Kongo",
    ki: "Kikuyu",
    kj: "Kuanyama",
    kk: "Kazakh",
    kl: "Kalaallisut",
    km: "Khmer",
    kn: "Kannada",
    ko: "Korean",
    kr: "Kanuri",
    ks: "Kashmiri",
    ku: "Kurdish",
    kv: "Komi",
    kw: "Cornish",
    ky: "Kyrgyz",
    la: "Latin",
    lb: "Luxembourgish",
    lg: "Ganda",
    li: "Limburgan",
    ln: "Lingala",
    lo: "Lao",
    lt: "Lithuanian",
    lu: "Luba-Katanga",
    lv: "Latvian",
    mg: "Malagasy",
    mh: "Marshallese",
    mi: "Maori",
    mk: "Macedonian",
    ml: "Malayalam",
    mn: "Mongolian",
    mr: "Marathi",
    ms: "Malay",
    mt: "Maltese",
    my: "Burmese",
    na: "Nauru",
    nb: "Norwegian Bokmål",
    nd: "North Ndebele",
    ne: "Nepali",
    ng: "Ndonga",
    nl: "Dutch",
    nn: "Norwegian Nynorsk",
    no: "Norwegian",
    nr: "South Ndebele",
    nv: "Navajo",
    ny: "Chichewa",
    oc: "Occitan",
    oj: "Ojibwa",
    om: "Oromo",
    or: "Oriya",
    os: "Ossetian",
    pa: "Punjabi",
    pi: "Pali",
    pl: "Polish",
    ps: "Pashto",
    pt: "Portuguese",
    qu: "Quechua",
    rm: "Romansh",
    rn: "Rundi",
    ro: "Romanian",
    ru: "Russian",
    rw: "Kinyarwanda",
    sa: "Sanskrit",
    sc: "Sardinian",
    sd: "Sindhi",
    se: "Northern Sami",
    sg: "Sango",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    sm: "Samoan",
    sn: "Shona",
    so: "Somali",
    sq: "Albanian",
    sr: "Serbian",
    ss: "Swati",
    st: "Southern Sotho",
    su: "Sundanese",
    sv: "Swedish",
    sw: "Swahili",
    ta: "Tamil",
    te: "Telugu",
    tg: "Tajik",
    th: "Thai",
    ti: "Tigrinya",
    tk: "Turkmen",
    tl: "Tagalog",
    tn: "Tswana",
    to: "Tonga",
    tr: "Turkish",
    ts: "Tsonga",
    tt: "Tatar",
    tw: "Twi",
    ty: "Tahitian",
    ug: "Uighur",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    ve: "Venda",
    vi: "Vietnamese",
    vo: "Volapük",
    wa: "Walloon",
    wo: "Wolof",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    za: "Zhuang",
    zh: "Chinese",
    zu: "Zulu",

    // Common locale codes
    en_us: "American English",
    en_gb: "British English",
    en_au: "Australian English",
    en_ca: "Canadian English",
    fr_ca: "Canadian French",
    fr_fr: "French (France)",
    pt_br: "Brazilian Portuguese",
    pt_pt: "European Portuguese",
    es_es: "Spanish (Spain)",
    es_mx: "Mexican Spanish",
    es_ar: "Argentinian Spanish",
    de_de: "German (Germany)",
    de_at: "Austrian German",
    de_ch: "Swiss German",
    zh_cn: "Simplified Chinese",
    zh_tw: "Traditional Chinese",
    zh_hk: "Hong Kong Chinese",

    // ISO 639-2 three-letter codes (selected common ones)
    ara: "Arabic",
    ben: "Bengali",
    ces: "Czech",
    cze: "Czech",
    dan: "Danish",
    deu: "German",
    ger: "German",
    ell: "Greek",
    gre: "Greek",
    eng: "English",
    spa: "Spanish",
    fin: "Finnish",
    fra: "French",
    fre: "French",
    hin: "Hindi",
    hun: "Hungarian",
    ind: "Indonesian",
    ita: "Italian",
    jpn: "Japanese",
    kor: "Korean",
    nld: "Dutch",
    dut: "Dutch",
    nor: "Norwegian",
    pol: "Polish",
    por: "Portuguese",
    ron: "Romanian",
    rum: "Romanian",
    rus: "Russian",
    swe: "Swedish",
    tha: "Thai",
    tur: "Turkish",
    ukr: "Ukrainian",
    urd: "Urdu",
    vie: "Vietnamese",
    zho: "Chinese",
    chi: "Chinese",
  };

  // Handle locale codes like 'pt_BR' or 'en-US'
  const normalizedCode = code.toLowerCase();

  // Check if this is a locale code (contains underscore or hyphen)
  if (normalizedCode.includes("_") || normalizedCode.includes("-")) {
    // Extract just the language part (before the underscore or hyphen)
    const languagePart = normalizedCode.split(/[_-]/)[0];

    // Get the region part (after the underscore or hyphen)
    const regionPart = normalizedCode.split(/[_-]/)[1];

    // Check if we have a specific entry for this locale
    if (normalizedCode in languageMap) {
      return languageMap[normalizedCode];
    }

    // Check if we have the language part
    if (languagePart in languageMap) {
      const languageName = languageMap[languagePart];

      // For well-known region variants, return a more specific name
      if (languagePart === "pt" && regionPart === "br") {
        return "Brazilian Portuguese";
      } else if (languagePart === "en" && regionPart === "us") {
        return "American English";
      } else if (languagePart === "en" && regionPart === "gb") {
        return "British English";
      } else if (languagePart === "en" && regionPart === "au") {
        return "Australian English";
      } else if (languagePart === "en" && regionPart === "ca") {
        return "Canadian English";
      } else if (languagePart === "fr" && regionPart === "ca") {
        return "Canadian French";
      } else if (languagePart === "es" && regionPart === "mx") {
        return "Mexican Spanish";
      } else if (
        languagePart === "zh" &&
        (regionPart === "cn" || regionPart === "hans")
      ) {
        return "Simplified Chinese";
      } else if (
        languagePart === "zh" &&
        (regionPart === "tw" || regionPart === "hant")
      ) {
        return "Traditional Chinese";
      }

      // Return a generic "Language (Region)" format
      return `${languageName} (${regionPart.toUpperCase()})`;
    }
  } else {
    // Not a locale code, try direct lookup
    if (normalizedCode in languageMap) {
      return languageMap[normalizedCode];
    }
  }

  // If the code isn't in our map, return a formatted version of the code
  return `Unknown`;
}
