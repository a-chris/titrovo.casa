export function calculateQuery({ city, adType, minPrice, maxPrice, minMeter, maxMeter, includeWords, excludeWords }) {
  if (city == null || city.length == 0 ) {
    return { success: null, errors: [`Citta' mancante`] };
  }
  if (adType == null || adType.length == 0) {
    return { success: null, errors: [`Tipo annuncio mancante`] };
  }
  
  const queryParts = ['/ricerca', city, adType]
  if (minPrice) queryParts.push(`min:${parseInt(minPrice)}`);
  if (maxPrice) queryParts.push(`max:${parseInt(maxPrice)}`);
  if (minMeter) queryParts.push(`min_metri:${parseInt(minMeter)}`);
  if (maxMeter) queryParts.push(`max_metri:${parseInt(maxMeter)}`);
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