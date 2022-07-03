import titleize from "titleize";

export default async function getCities() {
  const response = await fetch(`${process.env.API_ADDRESS}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { cities } = await response.json();
  return cities.map((c) => ({ value: c.original_name, label: titleize(c.name).replace(/-/g, "") }));
}
