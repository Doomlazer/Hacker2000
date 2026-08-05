function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function fillPattern(pattern) {
    return pattern.replace(/#/g, () => Math.floor(Math.random() * 10));
}

function generatePhoneNumber(country) {

    const data = PHONE_DATA[country];

    if (!data) {
        console.warn(`Unsupported country: ${country}`);
        return null;
    }

    return data.format
        .replace("{cc}", data.countryCode)
        .replace("{area}", randomItem(data.areaCodes))
        .replace("{subscriber}", fillPattern(data.subscriberPattern));
}


let PHONE_DATA = {
  "Andorra": {
    "countryCode": "376",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": [""]
  },
  "United Arab Emirates": {
    "countryCode": "971",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "3", "4", "6", "7", "9"]
  },
  "Afghanistan": {
    "countryCode": "93",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["20", "21", "30", "40", "50"]
  },
  "Antigua and Barbuda": {
    "countryCode": "1-268",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Anguilla": {
    "countryCode": "1-264",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Albania": {
    "countryCode": "355",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["4", "5", "6"]
  },
  "Armenia": {
    "countryCode": "374",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["10", "11", "22", "41"]
  },
  "Angola": {
    "countryCode": "244",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["9"]
  },
  "Argentina": {
    "countryCode": "54",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["11", "221", "261", "341", "351"]
  },
  "American Samoa": {
    "countryCode": "1-684",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Austria": {
    "countryCode": "43",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "316", "662", "732"]
  },
  "Australia": {
    "countryCode": "61",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["2", "3", "7", "8"]
  },
  "Aruba": {
    "countryCode": "297",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Åland Islands": {
    "countryCode": "358",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["18"]
  },
  "Azerbaijan": {
    "countryCode": "994",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["12", "20", "50", "70"]
  },
  "Bosnia and Herzegovina": {
    "countryCode": "387",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["33", "34", "35", "36"]
  },
  "Barbados": {
    "countryCode": "1-246",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Bangladesh": {
    "countryCode": "880",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["2", "31", "41", "51", "61"]
  },
  "Belgium": {
    "countryCode": "32",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "3", "9", "11"]
  },
  "Burkina Faso": {
    "countryCode": "226",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Bulgaria": {
    "countryCode": "359",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["2", "32", "52", "62", "82"]
  },
  "Bahrain": {
    "countryCode": "973",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Burundi": {
    "countryCode": "257",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-####",
    "areaCodes": [""]
  },
  "Benin": {
    "countryCode": "229",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-####",
    "areaCodes": [""]
  },
  "Saint Barthélemy": {
    "countryCode": "590",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Bermuda": {
    "countryCode": "1-441",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Brunei Darussalam": {
    "countryCode": "673",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Bolivia, Plurinational State of": {
    "countryCode": "591",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "3", "4"]
  },
  "Bonaire, Sint Eustatius and Saba": {
    "countryCode": "599",
    "format": "+{cc} {area} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["3", "4", "7"]
  },
  "Brazil": {
    "countryCode": "55",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["11", "21", "31", "41", "51", "61", "71"]
  },
  "Bahamas": {
    "countryCode": "1-242",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Bhutan": {
    "countryCode": "975",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Botswana": {
    "countryCode": "267",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Belarus": {
    "countryCode": "375",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["17", "21", "22", "23"]
  },
  "Belize": {
    "countryCode": "501",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Canada": {
    "countryCode": "1",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [
      "204",
      "403",
      "416",
      "514",
      "604",
      "613",
      "647",
      "780",
      "902"
    ]
  },
  "Cocos (Keeling) Islands": {
    "countryCode": "61",
    "format": "+{cc} {area} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["8"]
  },
  "Congo, The Democratic Republic of the": {
    "countryCode": "243",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Central African Republic": {
    "countryCode": "236",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-####",
    "areaCodes": [""]
  },
  "Congo": {
    "countryCode": "242",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Switzerland": {
    "countryCode": "41",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-##-##",
    "areaCodes": ["22", "31", "41", "44", "61"]
  },
  "Côte d'Ivoire": {
    "countryCode": "225",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": [""]
  },
  "Cook Islands": {
    "countryCode": "682",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-###",
    "areaCodes": [""]
  },
  "Chile": {
    "countryCode": "56",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "32", "41", "55", "65"]
  },
  "Cameroon": {
    "countryCode": "237",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "China": {
    "countryCode": "86",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["10", "20", "21", "22", "23", "28", "29"]
  },
  "Colombia": {
    "countryCode": "57",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "2", "4", "5", "6", "7"]
  },
  "Costa Rica": {
    "countryCode": "506",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Cuba": {
    "countryCode": "53",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["7", "21", "22", "24", "45"]
  },
  "Cabo Verde": {
    "countryCode": "238",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Curaçao": {
    "countryCode": "599",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Christmas Island": {
    "countryCode": "61",
    "format": "+{cc} {area} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["8"]
  },
  "Cyprus": {
    "countryCode": "357",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Czechia": {
    "countryCode": "420",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###-###",
    "areaCodes": [""]
  },
  "Germany": {
    "countryCode": "49",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["30", "40", "69", "89", "211", "221"]
  },
  "Djibouti": {
    "countryCode": "253",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Denmark": {
    "countryCode": "45",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "## ## ## ##",
    "areaCodes": [""]
  },
  "Dominica": {
    "countryCode": "1-767",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Dominican Republic": {
    "countryCode": "1-809",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["809", "829", "849"]
  },
  "Algeria": {
    "countryCode": "213",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "23", "31", "41"]
  },
  "Ecuador": {
    "countryCode": "593",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "3", "4", "5", "6", "7"]
  },
  "Estonia": {
    "countryCode": "372",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Egypt": {
    "countryCode": "20",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["2", "3", "40", "45"]
  },
  "Western Sahara": {
    "countryCode": "212",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": [""]
  },
  "Eritrea": {
    "countryCode": "291",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": [""]
  },
  "Spain": {
    "countryCode": "34",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###-###",
    "areaCodes": [""]
  },
  "Ethiopia": {
    "countryCode": "251",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["11", "22", "33", "46"]
  },
  "Finland": {
    "countryCode": "358",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["9", "13", "14", "16"]
  },
  "Fiji": {
    "countryCode": "679",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Falkland Islands (Malvinas)": {
    "countryCode": "500",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "#####",
    "areaCodes": [""]
  },
  "Micronesia, Federated States of": {
    "countryCode": "691",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Faroe Islands": {
    "countryCode": "298",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "France": {
    "countryCode": "33",
    "format": "+{cc} {area} {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": ["1", "2", "3", "4", "5"]
  },
  "Gabon": {
    "countryCode": "241",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "United Kingdom": {
    "countryCode": "44",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["20", "121", "131", "161", "191", "208"]
  },
  "Grenada": {
    "countryCode": "1-473",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Georgia": {
    "countryCode": "995",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["32", "341", "422"]
  },
  "French Guiana": {
    "countryCode": "594",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Guernsey": {
    "countryCode": "44",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["1481"]
  },
  "Ghana": {
    "countryCode": "233",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "30", "31", "32"]
  },
  "Gibraltar": {
    "countryCode": "350",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Greenland": {
    "countryCode": "299",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Gambia": {
    "countryCode": "220",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Guinea": {
    "countryCode": "224",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Guadeloupe": {
    "countryCode": "590",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Equatorial Guinea": {
    "countryCode": "240",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Greece": {
    "countryCode": "30",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["21", "23", "24", "25", "26"]
  },
  "South Georgia and the South Sandwich Islands": {
    "countryCode": "500",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "#####",
    "areaCodes": [""]
  },
  "Guatemala": {
    "countryCode": "502",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Guam": {
    "countryCode": "1-671",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Guinea-Bissau": {
    "countryCode": "245",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Guyana": {
    "countryCode": "592",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Hong Kong": {
    "countryCode": "852",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Honduras": {
    "countryCode": "504",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Croatia": {
    "countryCode": "385",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "20", "21", "31", "51"]
  },
  "Haiti": {
    "countryCode": "509",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Hungary": {
    "countryCode": "36",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "20", "30", "70"]
  },
  "Indonesia": {
    "countryCode": "62",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["21", "22", "31", "61", "71"]
  },
  "Ireland": {
    "countryCode": "353",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "21", "41", "61", "91"]
  },
  "Israel": {
    "countryCode": "972",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "3", "4", "8", "9"]
  },
  "Isle of Man": {
    "countryCode": "44",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["1624"]
  },
  "India": {
    "countryCode": "91",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["11", "22", "33", "44", "80", "120"]
  },
  "Iraq": {
    "countryCode": "964",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "40", "50", "60"]
  },
  "Iran, Islamic Republic of": {
    "countryCode": "98",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["21", "31", "41", "51"]
  },
  "Iceland": {
    "countryCode": "354",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Italy": {
    "countryCode": "39",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["02", "06", "081", "010", "011"]
  },
  "Jersey": {
    "countryCode": "44",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["1534"]
  },
  "Jamaica": {
    "countryCode": "1-876",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Jordan": {
    "countryCode": "962",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["6", "2", "3"]
  },
  "Japan": {
    "countryCode": "81",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["3", "6", "11", "52", "75", "92"]
  },
  "Kenya": {
    "countryCode": "254",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["20", "41", "51"]
  },
  "Kyrgyzstan": {
    "countryCode": "996",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["312", "331", "352"]
  },
  "Cambodia": {
    "countryCode": "855",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Kiribati": {
    "countryCode": "686",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Comoros": {
    "countryCode": "269",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Saint Kitts and Nevis": {
    "countryCode": "1-869",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Korea, Democratic People's Republic of": {
    "countryCode": "850",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Korea, Republic of": {
    "countryCode": "82",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["2", "31", "32", "42", "51"]
  },
  "Kuwait": {
    "countryCode": "965",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Cayman Islands": {
    "countryCode": "1-345",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Kazakhstan": {
    "countryCode": "7",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-##-##",
    "areaCodes": ["7172", "727", "724"]
  },
  "Lao People's Democratic Republic": {
    "countryCode": "856",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "31", "41"]
  },
  "Lebanon": {
    "countryCode": "961",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["1", "4", "6", "7", "8", "9"]
  },
  "Saint Lucia": {
    "countryCode": "1-758",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Liechtenstein": {
    "countryCode": "423",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Sri Lanka": {
    "countryCode": "94",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["11", "21", "31", "41", "81"]
  },
  "Liberia": {
    "countryCode": "231",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Lesotho": {
    "countryCode": "266",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Lithuania": {
    "countryCode": "370",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["5", "37", "41", "46"]
  },
  "Luxembourg": {
    "countryCode": "352",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": [""]
  },
  "Latvia": {
    "countryCode": "371",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Libya": {
    "countryCode": "218",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "23", "51", "61"]
  },
  "Morocco": {
    "countryCode": "212",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": ["5", "6"]
  },
  "Monaco": {
    "countryCode": "377",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": [""]
  },
  "Moldova, Republic of": {
    "countryCode": "373",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["22", "23", "29"]
  },
  "Montenegro": {
    "countryCode": "382",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["20", "30", "40", "50"]
  },
  "Saint Martin (French part)": {
    "countryCode": "590",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Madagascar": {
    "countryCode": "261",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-#####",
    "areaCodes": [""]
  },
  "Marshall Islands": {
    "countryCode": "692",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "North Macedonia": {
    "countryCode": "389",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["2", "31", "34", "42"]
  },
  "Mali": {
    "countryCode": "223",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-####",
    "areaCodes": [""]
  },
  "Myanmar": {
    "countryCode": "95",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "2", "9"]
  },
  "Mongolia": {
    "countryCode": "976",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Macao": {
    "countryCode": "853",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Northern Mariana Islands": {
    "countryCode": "1-670",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Martinique": {
    "countryCode": "596",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Mauritania": {
    "countryCode": "222",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-####",
    "areaCodes": [""]
  },
  "Montserrat": {
    "countryCode": "1-664",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Malta": {
    "countryCode": "356",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Mauritius": {
    "countryCode": "230",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Maldives": {
    "countryCode": "960",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Malawi": {
    "countryCode": "265",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "9"]
  },
  "Mexico": {
    "countryCode": "52",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["55", "33", "81", "222", "664"]
  },
  "Malaysia": {
    "countryCode": "60",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["3", "4", "5", "6", "7", "8"]
  },
  "Mozambique": {
    "countryCode": "258",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "23", "24"]
  },
  "Namibia": {
    "countryCode": "264",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["61", "62", "63"]
  },
  "New Caledonia": {
    "countryCode": "687",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-####",
    "areaCodes": [""]
  },
  "Niger": {
    "countryCode": "227",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-####",
    "areaCodes": [""]
  },
  "Norfolk Island": {
    "countryCode": "672",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": [""]
  },
  "Nigeria": {
    "countryCode": "234",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "2", "9"]
  },
  "Nicaragua": {
    "countryCode": "505",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Netherlands": {
    "countryCode": "31",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["10", "20", "30", "40", "50", "70"]
  },
  "Norway": {
    "countryCode": "47",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Nepal": {
    "countryCode": "977",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "21", "41", "51"]
  },
  "Nauru": {
    "countryCode": "674",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Niue": {
    "countryCode": "683",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####",
    "areaCodes": [""]
  },
  "New Zealand": {
    "countryCode": "64",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["3", "4", "6", "7", "9"]
  },
  "Oman": {
    "countryCode": "968",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Panama": {
    "countryCode": "507",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Peru": {
    "countryCode": "51",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "41", "44", "54", "61"]
  },
  "French Polynesia": {
    "countryCode": "689",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Papua New Guinea": {
    "countryCode": "675",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Philippines": {
    "countryCode": "63",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "32", "33", "34", "45"]
  },
  "Pakistan": {
    "countryCode": "92",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["21", "42", "51", "61"]
  },
  "Poland": {
    "countryCode": "48",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-##-##",
    "areaCodes": [""]
  },
  "Saint Pierre and Miquelon": {
    "countryCode": "508",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Pitcairn": {
    "countryCode": "64",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####",
    "areaCodes": [""]
  },
  "Puerto Rico": {
    "countryCode": "1-787",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["787", "939"]
  },
  "Palestine, State of": {
    "countryCode": "970",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "8", "9"]
  },
  "Portugal": {
    "countryCode": "351",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Palau": {
    "countryCode": "680",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Paraguay": {
    "countryCode": "595",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "61", "71"]
  },
  "Qatar": {
    "countryCode": "974",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Réunion": {
    "countryCode": "262",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Romania": {
    "countryCode": "40",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "31", "232", "256"]
  },
  "Serbia": {
    "countryCode": "381",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["11", "18", "21", "24"]
  },
  "Russian Federation": {
    "countryCode": "7",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-##-##",
    "areaCodes": ["495", "499", "812", "343"]
  },
  "Rwanda": {
    "countryCode": "250",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": [""]
  },
  "Saudi Arabia": {
    "countryCode": "966",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["11", "12", "13", "14"]
  },
  "Solomon Islands": {
    "countryCode": "677",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "#######",
    "areaCodes": [""]
  },
  "Seychelles": {
    "countryCode": "248",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Sudan": {
    "countryCode": "249",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Sweden": {
    "countryCode": "46",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["8", "31", "40", "46", "90"]
  },
  "Singapore": {
    "countryCode": "65",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Saint Helena, Ascension and Tristan da Cunha": {
    "countryCode": "290",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####",
    "areaCodes": [""]
  },
  "Slovenia": {
    "countryCode": "386",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": ["1", "2", "3", "4"]
  },
  "Svalbard and Jan Mayen": {
    "countryCode": "47",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Slovakia": {
    "countryCode": "421",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "31", "41", "48"]
  },
  "Sierra Leone": {
    "countryCode": "232",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "San Marino": {
    "countryCode": "378",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Senegal": {
    "countryCode": "221",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-###-##-##",
    "areaCodes": [""]
  },
  "Somalia": {
    "countryCode": "252",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-###-###",
    "areaCodes": [""]
  },
  "Suriname": {
    "countryCode": "597",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "South Sudan": {
    "countryCode": "211",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Sao Tome and Principe": {
    "countryCode": "239",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "El Salvador": {
    "countryCode": "503",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Sint Maarten (Dutch part)": {
    "countryCode": "1-721",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Syrian Arab Republic": {
    "countryCode": "963",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["11", "21", "31", "41"]
  },
  "Eswatini": {
    "countryCode": "268",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Turks and Caicos Islands": {
    "countryCode": "1-649",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Chad": {
    "countryCode": "235",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##-##",
    "areaCodes": [""]
  },
  "French Southern Territories": {
    "countryCode": "262",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Togo": {
    "countryCode": "228",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-####",
    "areaCodes": [""]
  },
  "Thailand": {
    "countryCode": "66",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["2", "38", "43", "53", "74"]
  },
  "Tajikistan": {
    "countryCode": "992",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Timor-Leste": {
    "countryCode": "670",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Turkmenistan": {
    "countryCode": "993",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Tunisia": {
    "countryCode": "216",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-###-###",
    "areaCodes": [""]
  },
  "Tonga": {
    "countryCode": "676",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "#######",
    "areaCodes": [""]
  },
  "Türkiye": {
    "countryCode": "90",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["212", "216", "232", "312", "322"]
  },
  "Trinidad and Tobago": {
    "countryCode": "1-868",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Tuvalu": {
    "countryCode": "688",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####",
    "areaCodes": [""]
  },
  "Taiwan, Province of China": {
    "countryCode": "886",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["2", "4", "7"]
  },
  "Tanzania, United Republic of": {
    "countryCode": "255",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["22", "23", "24", "26"]
  },
  "Ukraine": {
    "countryCode": "380",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["44", "48", "50", "56"]
  },
  "Uganda": {
    "countryCode": "256",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "United States": {
    "countryCode": "1",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [
      "202",
      "212",
      "305",
      "310",
      "312",
      "415",
      "408",
      "512",
      "617",
      "702",
      "713",
      "718",
      "805",
      "808",
      "917"
    ]
  },
  "Uruguay": {
    "countryCode": "598",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": [""]
  },
  "Uzbekistan": {
    "countryCode": "998",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["71", "72", "73", "74"]
  },
  "Holy See (Vatican City State)": {
    "countryCode": "39",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "06-698-#####",
    "areaCodes": [""]
  },
  "Saint Vincent and the Grenadines": {
    "countryCode": "1-784",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Venezuela, Bolivarian Republic of": {
    "countryCode": "58",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["212", "241", "251", "261"]
  },
  "Virgin Islands, British": {
    "countryCode": "1-284",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Virgin Islands, U.S.": {
    "countryCode": "1-340",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "Viet Nam": {
    "countryCode": "84",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "####-####",
    "areaCodes": ["24", "28", "236", "511"]
  },
  "Vanuatu": {
    "countryCode": "678",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "#######",
    "areaCodes": [""]
  },
  "Wallis and Futuna": {
    "countryCode": "681",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "##-##-##",
    "areaCodes": [""]
  },
  "Samoa": {
    "countryCode": "685",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "#######",
    "areaCodes": [""]
  },
  "XK": {
    "countryCode": "383",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-###",
    "areaCodes": [""]
  },
  "Yemen": {
    "countryCode": "967",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["1", "2", "3", "4"]
  },
  "Mayotte": {
    "countryCode": "262",
    "format": "+{cc} {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": [""]
  },
  "South Africa": {
    "countryCode": "27",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["10", "11", "12", "21", "31", "41"]
  },
  "Zambia": {
    "countryCode": "260",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["21", "95", "96", "97"]
  },
  "Zimbabwe": {
    "countryCode": "263",
    "format": "+{cc} ({area}) {subscriber}",
    "subscriberPattern": "###-####",
    "areaCodes": ["4", "54", "867"]
  }
}

/*console.log("Türkiye exists:", "Türkiye" in PHONE_DATA);
console.log(PHONE_DATA["Türkiye"]);
console.log(Object.keys(PHONE_DATA).length);*/
const fixed = {};

    for (const key in PHONE_DATA) {
        fixed[key.replace(/[’‘]/g, "'")] = PHONE_DATA[key];
    }

    PHONE_DATA = fixed;