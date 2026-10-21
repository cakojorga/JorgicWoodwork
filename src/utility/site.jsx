// Business details shared by metadata, structured data and the sitemap
export const SITE_URL = "https://www.jorgicwoodwork.com";
export const SITE_NAME = "Jorgić Woodwork";

export const business = {
  name: SITE_NAME,
  // Other names people type into Google for this business (with and without "ć")
  alternateName: [
    "Jorgic Woodwork",
    "Jorgić",
    "Jorgic",
    "Stolarija Jorgić",
    "Stolarija Jorgic",
    "Jorgić stolarija Banja Luka",
  ],
  description:
    "Stolarska radionica iz Banja Luke sa više od 30 godina iskustva. Izrada kuhinja, ormara, vrata, stepenica, kreveta i ostalog namještaja po mjeri.",
  logo: `${SITE_URL}/logonav.png`,
  email: "dgjorgicbl@gmail.com",
  phones: ["+38765564232", "+38766531274"],
  address: {
    streetAddress: "Bistrica BB",
    addressLocality: "Banja Luka",
    addressCountry: "BA",
  },
  map: "https://maps.app.goo.gl/FJtjCJqRa6UcNHvW6",
  instagram: "https://www.instagram.com/jorgic_woodwork/",
};

// "+38765564232" -> "+387 65 564 232"
export const formatPhone = (phone) =>
  phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
