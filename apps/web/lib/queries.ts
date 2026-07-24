export const pageQuery = `*[_type == "page" && slug.current == $slug][0]`;

export const portfolioQuery = `*[_type == "fashionProject"] | order(year desc){ title, slug, year, category, summary, coverImage }`;

export const fashionProjectQuery = `*[_type == "fashionProject" && slug.current == $slug][0]`;

export const collectionsQuery = `*[_type == "collection"] | order(publishedAt desc){ title, slug, season, coverImage }`;

export const collectionQuery = `*[_type == "collection" && slug.current == $slug][0]`;

export const journalListQuery = `*[_type == "journalPost"] | order(publishedAt desc){ title, slug, excerpt, coverImage, publishedAt }`;

export const journalPostQuery = `*[_type == "journalPost" && slug.current == $slug][0]`;

export const mediaQuery = `*[_type == "mediaItem"] | order(publishedAt desc){ title, outlet, outletLogo, url, thumbnail, publishedAt }`;

export const awardsQuery = `*[_type == "award"] | order(year desc){ title, issuer, year, description, image }`;

export const researchQuery = `*[_type == "researchPublication"] | order(publishedAt desc){ title, slug, abstract, publication, publishedAt, externalUrl }`;

export const brandSettingsQuery = `*[_type == "brandSettings"][0]`;
