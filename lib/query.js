export function calculateQuery({ city, adType, minPrice, maxPrice, minMeters, maxMeters, includeWords, excludeWords }) {
  let errors = []
  if (city == null || city.length == 0 ) {
    errors = [`Citta' mancante`]
  }
  if (adType == null || adType.length == 0) {
    errors = [`Tipo annuncio mancante`]
  }
  
  if (minPrice && maxPrice && minPrice > maxPrice) {
    errors = [`Il prezzo minimo inserito e' maggiore del prezzo massimo`];
  }
  if (minMeters && maxMeters && minMeters > maxMeters) {
    errors = [`I metri minimi inseriti sono maggiori dei prezzi massimi`];
  }

  if (errors.length > 0) {
    return { success: null, errors };
  }

  const queryParts = ['/ricerca', city, adType]
  if (minPrice) queryParts.push(`min:${parseInt(minPrice)}`);
  if (maxPrice) queryParts.push(`max:${parseInt(maxPrice)}`);
  if (minMeters) queryParts.push(`min_metri:${parseInt(minMeters)}`);
  if (maxMeters) queryParts.push(`max_metri:${parseInt(maxMeters)}`);
  if (includeWords?.length > 0) {
    const sanitizedIncludeWords = includeWords.map((w) => w.replace(/[^\w\d\s]/g, ""));
    queryParts.push(`includi:[${sanitizedIncludeWords.join(",")}]`);
  }
  if (excludeWords?.length > 0) {
    const sanitizedExcludeWords = excludeWords.map((w) => w.replace(/[^\w\d\s]/g, ""));
    queryParts.push(`escludi:[${sanitizedExcludeWords.join(",")}]`);
  }
  
  const query = queryParts.join(" ");

  return { success: query, errors: []}
}