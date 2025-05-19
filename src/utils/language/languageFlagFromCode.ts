/**
 * Returns the flag emoji for a given language code
 * @param code - ISO 639-1, ISO 639-2 language code, or locale code (e.g., 'en_US', 'pt-BR')
 * @returns The flag emoji for the language/country
 */
export function languageFlagFromCode(code: string): string {
  // Normalize the code to lowercase
  const normalizedCode = code.toLowerCase();

  // Handle locale codes like 'pt_BR' or 'en-US'
  if (normalizedCode.includes("_") || normalizedCode.includes("-")) {
    // Extract the region part (after the underscore or hyphen)
    const regionPart = normalizedCode.split(/[_-]/)[1];

    // Return a flag based on the region code
    return getCountryFlag(regionPart);
  }

  // For language-only codes, map them to their most common country
  const countryCode = mapLanguageToCountry(normalizedCode);
  if (countryCode) {
    return getCountryFlag(countryCode);
  }

  // If we don't have a mapping, return a generic world globe
  return "🌐";
}

/**
 * Maps a language code to its most commonly associated country code
 * @param languageCode - The language code to map
 * @returns The two-letter country code, or undefined if no mapping exists
 */
function mapLanguageToCountry(languageCode: string): string | undefined {
  const languageToCountryMap: Record<string, string> = {
    // ISO 639-1 two-letter codes
    en: "gb", // English -> UK flag (more international)
    ar: "sa", // Arabic -> Saudi Arabia
    zh: "cn", // Chinese -> China
    cs: "cz", // Czech -> Czech Republic
    da: "dk", // Danish -> Denmark
    nl: "nl", // Dutch -> Netherlands
    fi: "fi", // Finnish -> Finland
    fr: "fr", // French -> France
    de: "de", // German -> Germany
    el: "gr", // Greek -> Greece
    he: "il", // Hebrew -> Israel
    hi: "in", // Hindi -> India
    hu: "hu", // Hungarian -> Hungary
    id: "id", // Indonesian -> Indonesia
    it: "it", // Italian -> Italy
    ja: "jp", // Japanese -> Japan
    ko: "kr", // Korean -> South Korea
    ms: "my", // Malay -> Malaysia
    no: "no", // Norwegian -> Norway
    fa: "ir", // Persian -> Iran
    pl: "pl", // Polish -> Poland
    pt: "pt", // Portuguese -> Portugal (default)
    ro: "ro", // Romanian -> Romania
    ru: "ru", // Russian -> Russia
    es: "es", // Spanish -> Spain
    sv: "se", // Swedish -> Sweden
    th: "th", // Thai -> Thailand
    tr: "tr", // Turkish -> Turkey
    uk: "ua", // Ukrainian -> Ukraine
    ur: "pk", // Urdu -> Pakistan
    vi: "vn", // Vietnamese -> Vietnam

    // ISO 639-2 three-letter codes (selected common ones)
    ara: "sa", // Arabic -> Saudi Arabia
    ben: "bd", // Bengali -> Bangladesh
    ces: "cz", // Czech -> Czech Republic
    cze: "cz", // Czech -> Czech Republic
    dan: "dk", // Danish -> Denmark
    deu: "de", // German -> Germany
    ger: "de", // German -> Germany
    ell: "gr", // Greek -> Greece
    gre: "gr", // Greek -> Greece
    eng: "gb", // English -> UK
    spa: "es", // Spanish -> Spain
    fin: "fi", // Finnish -> Finland
    fra: "fr", // French -> France
    fre: "fr", // French -> France
    hin: "in", // Hindi -> India
    hun: "hu", // Hungarian -> Hungary
    ind: "id", // Indonesian -> Indonesia
    ita: "it", // Italian -> Italy
    jpn: "jp", // Japanese -> Japan
    kor: "kr", // Korean -> South Korea
    nld: "nl", // Dutch -> Netherlands
    dut: "nl", // Dutch -> Netherlands
    nor: "no", // Norwegian -> Norway
    pol: "pl", // Polish -> Poland
    por: "pt", // Portuguese -> Portugal
    ron: "ro", // Romanian -> Romania
    rum: "ro", // Romanian -> Romania
    rus: "ru", // Russian -> Russia
    swe: "se", // Swedish -> Sweden
    tha: "th", // Thai -> Thailand
    tur: "tr", // Turkish -> Turkey
    ukr: "ua", // Ukrainian -> Ukraine
    urd: "pk", // Urdu -> Pakistan
    vie: "vn", // Vietnamese -> Vietnam
    zho: "cn", // Chinese -> China
    chi: "cn", // Chinese -> China
  };

  return languageToCountryMap[languageCode];
}

/**
 * Converts a two-letter country code to a flag emoji
 * @param countryCode - Two-letter country code
 * @returns The corresponding flag emoji
 */
function getCountryFlag(countryCode: string): string {
  // Convert country code to uppercase
  const code = countryCode.toUpperCase();

  try {
    // Each regional indicator symbol is formed by adding 127397 to the ASCII code point
    const firstLetter = code.charCodeAt(0) + 127397;
    const secondLetter = code.charCodeAt(1) + 127397;

    // Combine the regional indicator symbols to form the flag
    return String.fromCodePoint(firstLetter, secondLetter);
  } catch {
    // Return a globe if there's an error
    return "🌐";
  }
}
