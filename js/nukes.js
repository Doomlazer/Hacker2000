class Nuke {
    constructor(city0, city1,launchtime) {
        this.launchTime = launchtime
        this.city0 = city0;
        this.city1 = city1;
        this.gotResponse = false;
        this.responseThreshold = getRandInt(50)+ 20;
        nukes.push(this)
    }
}

let nukeData = {
  "date": "2000-01-01",
  "countries": [
    {"country":"Afghanistan","iso3":"AFG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Albania","iso3":"ALB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Algeria","iso3":"DZA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Andorra","iso3":"AND","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Angola","iso3":"AGO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Antigua and Barbuda","iso3":"ATG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Argentina","iso3":"ARG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Armenia","iso3":"ARM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Australia","iso3":"AUS","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Austria","iso3":"AUT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Azerbaijan","iso3":"AZE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Bahrain","iso3":"BHR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Bangladesh","iso3":"BGD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Barbados","iso3":"BRB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Belarus","iso3":"BLR","nuclear_status":"FORMER_SOVIET_ARMS","warheads_est":0},
    {"country":"Belgium","iso3":"BEL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Belize","iso3":"BLZ","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Benin","iso3":"BEN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Bhutan","iso3":"BTN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Bolivia","iso3":"BOL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Bosnia and Herzegovina","iso3":"BIH","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Botswana","iso3":"BWA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Brazil","iso3":"BRA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Brunei","iso3":"BRN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Bulgaria","iso3":"BGR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Burkina Faso","iso3":"BFA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Burundi","iso3":"BDI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Cambodia","iso3":"KHM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Cameroon","iso3":"CMR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Canada","iso3":"CAN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Central African Republic","iso3":"CAF","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Chad","iso3":"TCD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Chile","iso3":"CHL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"China","iso3":"CHN","nuclear_status":"NWS","warheads_est":410},
    {"country":"Colombia","iso3":"COL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Comoros","iso3":"COM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Republic of the Congo","iso3":"COG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Costa Rica","iso3":"CRI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Ivory Coast","iso3":"CIV","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Croatia","iso3":"HRV","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Cuba","iso3":"CUB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Cyprus","iso3":"CYP","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Czechia","iso3":"CZE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Democratic Republic of the Congo","iso3":"COD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Denmark","iso3":"DNK","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Djibouti","iso3":"DJI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Dominica","iso3":"DMA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Dominican Republic","iso3":"DOM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Ecuador","iso3":"ECU","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Egypt","iso3":"EGY","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"El Salvador","iso3":"SLV","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Equatorial Guinea","iso3":"GNQ","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Eritrea","iso3":"ERI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"eSwatini","iso3":"SWZ","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Ethiopia","iso3":"ETH","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Fiji","iso3":"FJI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Finland","iso3":"FIN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"France","iso3":"FRA","nuclear_status":"NWS","warheads_est":464},
    {"country":"Gabon","iso3":"GAB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Gambia","iso3":"GMB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Georgia","iso3":"GEO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Germany","iso3":"DEU","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Ghana","iso3":"GHA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Greece","iso3":"GRC","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Grenada","iso3":"GRD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Guatemala","iso3":"GTM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Guinea","iso3":"GIN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Guinea-Bissau","iso3":"GNB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Guyana","iso3":"GUY","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Haiti","iso3":"HTI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Honduras","iso3":"HND","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Hungary","iso3":"HUN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Iceland","iso3":"ISL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"India","iso3":"IND","nuclear_status":"DE_FACTO_NWS","warheads_est":"25-40"},
    {"country":"Indonesia","iso3":"IDN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Iran","iso3":"IRN","nuclear_status":"LATENT_CIVILIAN_PROGRAM","warheads_est":0},
    {"country":"Iraq","iso3":"IRQ","nuclear_status":"FORMER_NUCLEAR_PROGRAM","warheads_est":0},
    {"country":"Ireland","iso3":"IRL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Israel","iso3":"ISR","nuclear_status":"UNDECLARED_NWS","warheads_est":"up_to_200"},
    {"country":"Italy","iso3":"ITA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Jamaica","iso3":"JAM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Japan","iso3":"JPN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Jordan","iso3":"JOR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Kazakhstan","iso3":"KAZ","nuclear_status":"FORMER_SOVIET_ARMS","warheads_est":0},
    {"country":"Kenya","iso3":"KEN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Kiribati","iso3":"KIR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Kuwait","iso3":"KWT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Kyrgyzstan","iso3":"KGZ","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Laos","iso3":"LAO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Latvia","iso3":"LVA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Lebanon","iso3":"LBN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Lesotho","iso3":"LSO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Liberia","iso3":"LBR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Libya","iso3":"LBY","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Liechtenstein","iso3":"LIE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Lithuania","iso3":"LTU","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Luxembourg","iso3":"LUX","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Madagascar","iso3":"MDG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Malawi","iso3":"MWI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Malaysia","iso3":"MYS","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Maldives","iso3":"MDV","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Mali","iso3":"MLI","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Malta","iso3":"MLT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Marshall Islands","iso3":"MHL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Mauritania","iso3":"MRT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Mauritius","iso3":"MUS","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Mexico","iso3":"MEX","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Micronesia","iso3":"FSM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Moldova","iso3":"MDA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Monaco","iso3":"MCO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Mongolia","iso3":"MNG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Montenegro","iso3":"MNE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Morocco","iso3":"MAR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Mozambique","iso3":"MOZ","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Myanmar","iso3":"MMR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Namibia","iso3":"NAM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Nauru","iso3":"NRU","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Nepal","iso3":"NPL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Netherlands","iso3":"NLD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"New Zealand","iso3":"NZL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Nicaragua","iso3":"NIC","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Niger","iso3":"NER","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Nigeria","iso3":"NGA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"North Korea","iso3":"PRK","nuclear_status":"SUSPECTED_PROGRAM","warheads_est":"0_confirmed"},
    {"country":"North Macedonia","iso3":"MKD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Norway","iso3":"NOR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Oman","iso3":"OMN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Pakistan","iso3":"PAK","nuclear_status":"DE_FACTO_NWS","warheads_est":"15-20"},
    {"country":"Palestine","iso3":"PSE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Palau","iso3":"PLW","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Panama","iso3":"PAN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Papua New Guinea","iso3":"PNG","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Paraguay","iso3":"PRY","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Peru","iso3":"PER","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Philippines","iso3":"PHL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Poland","iso3":"POL","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Portugal","iso3":"PRT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Qatar","iso3":"QAT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Republic of Serbia","iso3":"SRB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Romania","iso3":"ROU","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Russia","iso3":"RUS","nuclear_status":"NWS","warheads_est":"22000+"},
    {"country":"Rwanda","iso3":"RWA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Saint Kitts and Nevis","iso3":"KNA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Saint Lucia","iso3":"LCA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Saint Vincent and the Grenadines","iso3":"VCT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Samoa","iso3":"WSM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"San Marino","iso3":"SMR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"São Tomé and Principe","iso3":"STP","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Saudi Arabia","iso3":"SAU","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Senegal","iso3":"SEN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Seychelles","iso3":"SYC","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Sierra Leone","iso3":"SLE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Singapore","iso3":"SGP","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Slovakia","iso3":"SVK","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Slovenia","iso3":"SVN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Solomon Islands","iso3":"SLB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Somalia","iso3":"SOM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"South Africa","iso3":"ZAF","nuclear_status":"DISARMED_NWS","warheads_est":0},
    {"country":"South Korea","iso3":"KOR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"South Sudan","iso3":"SSD","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Spain","iso3":"ESP","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Sri Lanka","iso3":"LKA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Sudan","iso3":"SDN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Suriname","iso3":"SUR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Sweden","iso3":"SWE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Switzerland","iso3":"CHE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Syria","iso3":"SYR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Taiwan","iso3":"TWN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Tajikistan","iso3":"TJK","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Tanzania","iso3":"TZA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Thailand","iso3":"THA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"East Timor","iso3":"TLS","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Togo","iso3":"TGO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Tonga","iso3":"TON","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Trinidad and Tobago","iso3":"TTO","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Tunisia","iso3":"TUN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Turkey","iso3":"TUR","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Turkmenistan","iso3":"TKM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Tuvalu","iso3":"TUV","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Uganda","iso3":"UGA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Ukraine","iso3":"UKR","nuclear_status":"FORMER_SOVIET_ARMS","warheads_est":0},
    {"country":"United Arab Emirates","iso3":"ARE","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"United Kingdom","iso3":"GBR","nuclear_status":"NWS","warheads_est":185},
    {"country":"United Republic of Tanzania","iso3":"TZA","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"United States","iso3":"USA","nuclear_status":"NWS","warheads_est":12000},
    {"country":"Uruguay","iso3":"URY","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Uzbekistan","iso3":"UZB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Vanuatu","iso3":"VUT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Vatican","iso3":"VAT","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Venezuela","iso3":"VEN","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Vietnam","iso3":"VNM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Yemen","iso3":"YEM","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Zambia","iso3":"ZMB","nuclear_status":"NON_NUCLEAR","warheads_est":0},
    {"country":"Zimbabwe","iso3":"ZWE","nuclear_status":"NON_NUCLEAR","warheads_est":0}
  ]
}

let retaliationData = {
  "date": "2000-01-01",
  "retaliation_model": {
    "score_scale": "0-5",
    "threshold_scale": "0-5",
    "threshold_meaning": {
      "1": "very low",
      "2": "low",
      "3": "moderate",
      "4": "high",
      "5": "very high"
    },
    "score_meaning": "Overall game abstraction of ability to retaliate after a severe attack"
  },
  "countries": [
    {"country":"Indonesia","iso3":"IDN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Malaysia","iso3":"MYS","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Chile","iso3":"CHL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Bolivia","iso3":"BOL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Peru","iso3":"PER","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Argentina","iso3":"ARG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Cyprus","iso3":"CYP","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"India","iso3":"IND","retaliation_capable":true,"retaliation_score_0_5":2,"retaliation_threshold_0_5":5},
    {"country":"China","iso3":"CHN","retaliation_capable":true,"retaliation_score_0_5":3,"retaliation_threshold_0_5":5},
    {"country":"Israel","iso3":"ISR","retaliation_capable":true,"retaliation_score_0_5":3,"retaliation_threshold_0_5":3},
    {"country":"Palestine","iso3":"PSE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Lebanon","iso3":"LBN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Ethiopia","iso3":"ETH","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"South Sudan","iso3":"SSD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Somalia","iso3":"SOM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Kenya","iso3":"KEN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Malawi","iso3":"MWI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Syria","iso3":"SYR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"France","iso3":"FRA","retaliation_capable":true,"retaliation_score_0_5":4,"retaliation_threshold_0_5":3},
    {"country":"Suriname","iso3":"SUR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Guyana","iso3":"GUY","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"South Korea","iso3":"KOR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"North Korea","iso3":"PRK","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Morocco","iso3":"MAR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Costa Rica","iso3":"CRI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Nicaragua","iso3":"NIC","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Republic of the Congo","iso3":"COG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Democratic Republic of the Congo","iso3":"COD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Bhutan","iso3":"BTN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Ukraine","iso3":"UKR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Belarus","iso3":"BLR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Namibia","iso3":"NAM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"South Africa","iso3":"ZAF","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Oman","iso3":"OMN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Uzbekistan","iso3":"UZB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Kazakhstan","iso3":"KAZ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Tajikistan","iso3":"TJK","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Lithuania","iso3":"LTU","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Brazil","iso3":"BRA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Uruguay","iso3":"URY","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Mongolia","iso3":"MNG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Russia","iso3":"RUS","retaliation_capable":true,"retaliation_score_0_5":5,"retaliation_threshold_0_5":2},
    {"country":"Czechia","iso3":"CZE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Germany","iso3":"DEU","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Estonia","iso3":"EST","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Latvia","iso3":"LVA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Norway","iso3":"NOR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Sweden","iso3":"SWE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Finland","iso3":"FIN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Vietnam","iso3":"VNM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Cambodia","iso3":"KHM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Luxembourg","iso3":"LUX","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"United Arab Emirates","iso3":"ARE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Belgium","iso3":"BEL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Georgia","iso3":"GEO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"North Macedonia","iso3":"MKD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Albania","iso3":"ALB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Azerbaijan","iso3":"AZE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Kosovo","iso3":"XKX","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Turkey","iso3":"TUR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Spain","iso3":"ESP","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Laos","iso3":"LAO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Kyrgyzstan","iso3":"KGZ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Armenia","iso3":"ARM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Denmark","iso3":"DNK","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Libya","iso3":"LBY","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Tunisia","iso3":"TUN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Romania","iso3":"ROU","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Hungary","iso3":"HUN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Slovakia","iso3":"SVK","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Poland","iso3":"POL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Ireland","iso3":"IRL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"United Kingdom","iso3":"GBR","retaliation_capable":true,"retaliation_score_0_5":4,"retaliation_threshold_0_5":3},
    {"country":"Greece","iso3":"GRC","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Zambia","iso3":"ZMB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Sierra Leone","iso3":"SLE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Guinea","iso3":"GIN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Liberia","iso3":"LBR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Central African Republic","iso3":"CAF","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Sudan","iso3":"SDN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Djibouti","iso3":"DJI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Eritrea","iso3":"ERI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Austria","iso3":"AUT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Iraq","iso3":"IRQ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Italy","iso3":"ITA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Switzerland","iso3":"CHE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Iran","iso3":"IRN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Netherlands","iso3":"NLD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Liechtenstein","iso3":"LIE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Republic of Serbia","iso3":"SRB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Mali","iso3":"MLI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Senegal","iso3":"SEN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Nigeria","iso3":"NGA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Benin","iso3":"BEN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Angola","iso3":"AGO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Croatia","iso3":"HRV","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Slovenia","iso3":"SVN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Qatar","iso3":"QAT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Saudi Arabia","iso3":"SAU","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Botswana","iso3":"BWA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Zimbabwe","iso3":"ZWE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Pakistan","iso3":"PAK","retaliation_capable":true,"retaliation_score_0_5":3,"retaliation_threshold_0_5":2},
    {"country":"Bulgaria","iso3":"BGR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Thailand","iso3":"THA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"San Marino","iso3":"SMR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Haiti","iso3":"HTI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Dominican Republic","iso3":"DOM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Chad","iso3":"TCD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Kuwait","iso3":"KWT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"El Salvador","iso3":"SLV","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Guatemala","iso3":"GTM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"East Timor","iso3":"TLS","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Brunei","iso3":"BRN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Monaco","iso3":"MCO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Algeria","iso3":"DZA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Mozambique","iso3":"MOZ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"eSwatini","iso3":"SWZ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Burundi","iso3":"BDI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Rwanda","iso3":"RWA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Myanmar","iso3":"MMR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Bangladesh","iso3":"BGD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Andorra","iso3":"AND","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Afghanistan","iso3":"AFG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Montenegro","iso3":"MNE","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Bosnia and Herzegovina","iso3":"BIH","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Uganda","iso3":"UGA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Cuba","iso3":"CUB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Honduras","iso3":"HND","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Ecuador","iso3":"ECU","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Colombia","iso3":"COL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Portugal","iso3":"PRT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Moldova","iso3":"MDA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Turkmenistan","iso3":"TKM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Jordan","iso3":"JOR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Nepal","iso3":"NPL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Lesotho","iso3":"LSO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Cameroon","iso3":"CMR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Gabon","iso3":"GAB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Niger","iso3":"NER","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Burkina Faso","iso3":"BFA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Togo","iso3":"TGO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Ghana","iso3":"GHA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Guinea-Bissau","iso3":"GNB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"United States","iso3":"USA","retaliation_capable":true,"retaliation_score_0_5":5,"retaliation_threshold_0_5":3},
    {"country":"Canada","iso3":"CAN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Mexico","iso3":"MEX","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Belize","iso3":"BLZ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Panama","iso3":"PAN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Venezuela","iso3":"VEN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Papua New Guinea","iso3":"PNG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Egypt","iso3":"EGY","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Yemen","iso3":"YEM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Mauritania","iso3":"MRT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Equatorial Guinea","iso3":"GNQ","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Gambia","iso3":"GMB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Vatican","iso3":"VAT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Australia","iso3":"AUS","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Fiji","iso3":"FJI","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"New Zealand","iso3":"NZL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Madagascar","iso3":"MDG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Philippines","iso3":"PHL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Sri Lanka","iso3":"LKA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Seychelles","iso3":"SYC","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Kiribati","iso3":"KIR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Marshall Islands","iso3":"MHL","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Trinidad and Tobago","iso3":"TTO","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Grenada","iso3":"GRD","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Saint Vincent and the Grenadines","iso3":"VCT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Barbados","iso3":"BRB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Saint Lucia","iso3":"LCA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Dominica","iso3":"DMA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Antigua and Barbuda","iso3":"ATG","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Saint Kitts and Nevis","iso3":"KNA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Jamaica","iso3":"JAM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Mauritius","iso3":"MUS","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Comoros","iso3":"COM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"São Tomé and Principe","iso3":"STP","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Singapore","iso3":"SGP","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Tonga","iso3":"TON","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Samoa","iso3":"WSM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Solomon Islands","iso3":"SLB","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Tuvalu","iso3":"TUV","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Maldives","iso3":"MDV","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Nauru","iso3":"NRU","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Micronesia","iso3":"FSM","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Vanuatu","iso3":"VUT","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Palau","iso3":"PLW","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Bahrain","iso3":"BHR","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Taiwan","iso3":"TWN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Japan","iso3":"JPN","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"The Bahamas","iso3":"BHS","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"United Republic of Tanzania","iso3":"TZA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Ivory Coast","iso3":"CIV","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Moldova","iso3":"MDA","retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null},
    {"country":"Somaliland","iso3":null,"retaliation_capable":false,"retaliation_score_0_5":0,"retaliation_threshold_0_5":null}
  ]
}

let diplomacy = { 
    "Afghanistan": { "allies": ["Pakistan"], "enemies": [], "neutral": ["India", "Iran", "Russia", "United States"] }, 
    "Albania": { "allies": ["Turkey", "Italy"], "enemies": ["Serbia"], "neutral": ["Greece", "Russia", "United States"] }, 
    "Algeria": { "allies": ["Libya", "Tunisia"], "enemies": [], "neutral": ["France", "Morocco", "Egypt", "United States"] }, 
    "Argentina": { "allies": ["Brazil", "Chile"], "enemies": [], "neutral": ["United States", "United Kingdom", "France"] }, 
    "Armenia": { "allies": ["Russia"], "enemies": ["Azerbaijan", "Turkey"], "neutral": ["Iran", "United States", "France"] }, 
    "Australia": { "allies": ["United States", "United Kingdom", "New Zealand"], "enemies": [], "neutral": ["China", "Russia", "Japan", "Indonesia"] }, 
    "Austria": { "allies": ["Germany", "Italy"], "enemies": [], "neutral": ["Russia", "United States"] }, 
    "Azerbaijan": { "allies": ["Turkey"], "enemies": ["Armenia"], "neutral": ["Russia", "Iran", "United States"] }, 
    "Belarus": { "allies": ["Russia"], "enemies": [], "neutral": ["Ukraine", "Poland", "United States"] }, 
    "Belgium": { "allies": ["France", "Germany", "United Kingdom", "United States", "Netherlands"], "enemies": [], "neutral": ["Russia", "China"] }, 
    "Bosnia and Herzegovina": { "allies": ["Croatia", "United States", "Turkey"], "enemies": ["Serbia"], "neutral": ["Russia", "Germany", "France"] }, 
    "Brazil": { "allies": ["Argentina", "Chile"], "enemies": [], "neutral": ["United States", "Russia", "China", "France"] }, 
    "Bulgaria": { "allies": ["Greece", "Turkey"], "enemies": [], "neutral": ["Russia", "Romania", "United States"] }, 
    "Canada": { "allies": ["United States", "United Kingdom", "France"], "enemies": [], "neutral": ["Russia", "China"] }, 
    "Chile": { "allies": ["Argentina", "United States"], "enemies": [], "neutral": ["Peru", "Bolivia", "Brazil"] }, 
    "China": { "allies": ["Russia", "North Korea"], "enemies": ["United States", "Taiwan"], "neutral": ["India", "Japan", "France", "United Kingdom"] }, 
    "Colombia": { "allies": ["United States"], "enemies": ["FARC"], "neutral": ["Venezuela", "Brazil", "Ecuador"] }, 
    "Croatia": { "allies": ["Bosnia and Herzegovina", "United States", "Germany"], "enemies": ["Serbia"], "neutral": ["Russia", "Italy"] }, 
    "Cuba": { "allies": ["Russia", "North Korea"], "enemies": ["United States"], "neutral": ["China", "Mexico", "Canada"] }, 
    "Czech Republic": { "allies": ["Germany", "Poland", "United States"], "enemies": [], "neutral": ["Russia", "Slovakia"] }, 
    "Denmark": { "allies": ["Germany", "United Kingdom", "United States", "Norway", "Sweden"], "enemies": [], "neutral": ["Russia"] }, 
    "Egypt": { "allies": ["United States", "Saudi Arabia"], "enemies": [], "neutral": ["Israel", "Iran", "Russia"] }, 
    "Estonia": { "allies": ["Latvia", "Lithuania", "United States", "Sweden", "Finland"], "enemies": ["Russia"], "neutral": ["Germany", "Poland"] }, 
    "Finland": { "allies": ["Sweden", "Norway"], "enemies": [], "neutral": ["Russia", "United States", "Germany"] }, 
    "France": { "allies": ["Germany", "United Kingdom", "United States", "Belgium", "Italy"], "enemies": [], "neutral": ["Russia", "China"] }, 
    "Georgia": { "allies": ["United States", "Turkey"], "enemies": ["Russia"], "neutral": ["Armenia", "Azerbaijan", "Iran"] }, 
    "Germany": { "allies": ["France", "United Kingdom", "United States", "Italy", "Netherlands"], "enemies": [], "neutral": ["Russia", "China"] },
    "Greece": { "allies": ["United States", "France", "Cyprus"], "enemies": [], "neutral": ["Turkey", "Russia", "Egypt"] }, 
    "Hungary": { "allies": ["Germany", "Austria", "United States"], "enemies": [], "neutral": ["Russia", "Romania", "Slovakia"] }, 
    "India": { "allies": ["Russia"], "enemies": ["Pakistan"], "neutral": ["China", "United States", "Iran", "France"] }, 
    "Indonesia": { "allies": ["Malaysia", "Singapore"], "enemies": [], "neutral": ["Australia", "China", "United States"] }, 
    "Iran": { "allies": ["Russia", "Syria"], "enemies": ["United States", "Israel"], "neutral": ["China", "India", "Turkey"] }, 
    "Iraq": { "allies": [], "enemies": ["United States", "United Kingdom", "Kuwait", "Iran"], "neutral": ["Russia", "France", "Saudi Arabia"] }, 
    "Ireland": { "allies": ["United Kingdom", "United States"], "enemies": [], "neutral": ["France", "Germany", "Russia"] }, 
    "Israel": { "allies": ["United States", "United Kingdom"], "enemies": ["Iran", "Syria", "Iraq", "Lebanon"], "neutral": ["Russia", "Egypt", "Jordan"] }, 
    "Italy": { "allies": ["France", "Germany", "United States", "United Kingdom"], "enemies": [], "neutral": ["Russia", "Libya"] }, 
    "Japan": { "allies": ["United States", "South Korea", "Australia"], "enemies": ["North Korea"], "neutral": ["China", "Russia"] }, 
    "Jordan": { "allies": ["United States", "United Kingdom", "Egypt"], "enemies": [], "neutral": ["Israel", "Iraq", "Syria", "Saudi Arabia"] }, 
    "Kazakhstan": { "allies": ["Russia"], "enemies": [], "neutral": ["China", "Uzbekistan", "United States"] }, 
    "Kenya": { "allies": ["United States", "United Kingdom"], "enemies": [], "neutral": ["Uganda", "Tanzania", "Somalia"] }, 
    "Kuwait": { "allies": ["United States", "Saudi Arabia", "United Kingdom"], "enemies": ["Iraq"], "neutral": ["Iran", "Russia"] }, 
    "Kyrgyzstan": { "allies": ["Russia", "Kazakhstan"], "enemies": [], "neutral": ["China", "Uzbekistan", "United States"] }, 
    "Latvia": { "allies": ["Estonia", "Lithuania", "United States", "Sweden"], "enemies": ["Russia"], "neutral": ["Germany", "Poland"] }, 
    "Lebanon": { "allies": ["Syria"], "enemies": ["Israel"], "neutral": ["Iran", "France", "United States"] }, 
    "Libya": { "allies": ["Syria", "Algeria"], "enemies": [], "neutral": ["Egypt", "Italy", "France", "United States"] }, 
    "Lithuania": { "allies": ["Latvia", "Estonia", "Poland", "United States"], "enemies": ["Russia"], "neutral": ["Germany", "Belarus"] }, 
    "Luxembourg": { "allies": ["Belgium", "France", "Germany", "United States"], "enemies": [], "neutral": ["Russia"] }, 
    "Malaysia": { "allies": ["Indonesia", "Singapore"], "enemies": [], "neutral": ["China", "United States", "Thailand"] }, 
    "Mexico": { "allies": ["United States", "Canada"], "enemies": [], "neutral": ["Cuba", "Russia", "China"] }, 
    "Moldova": { "allies": ["Romania"], "enemies": [], "neutral": ["Russia", "Ukraine"] }, 
    "Mongolia": { "allies": ["Russia"], "enemies": [], "neutral": ["China", "United States"] }, 
    "Morocco": { "allies": ["United States", "France"], "enemies": ["Algeria"], "neutral": ["Spain", "Saudi Arabia"] }, 
    "Myanmar": { "allies": ["China"], "enemies": [], "neutral": ["India", "Thailand", "Russia"] }, 
    "Netherlands": { "allies": ["Belgium", "Germany", "France", "United Kingdom", "United States"], "enemies": [], "neutral": ["Russia", "China"] }, 
    "New Zealand": { "allies": ["Australia", "United Kingdom", "United States"], "enemies": [], "neutral": ["China", "Russia"] }, 
    "North Korea": { "allies": ["China", "Russia", "Cuba"], "enemies": ["United States", "South Korea", "Japan"], "neutral": ["India", "Iran"] }, 
    "North Macedonia": { "allies": ["United States", "Albania", "Greece"], "enemies": [], "neutral": ["Serbia", "Russia"] }, 
    "Norway": { "allies": ["United States", "United Kingdom", "Denmark", "Sweden"], "enemies": [], "neutral": ["Russia", "Finland"] }, 
    "Pakistan": { "allies": ["China", "Saudi Arabia", "United States"], "enemies": ["India"], "neutral": ["Russia", "Iran"] }, 
    "Poland": { "allies": ["United States", "Germany", "Czech Republic", "Lithuania"], "enemies": ["Russia"], "neutral": ["Ukraine", "Belarus"] }, 
    "Portugal": { "allies": ["United States", "United Kingdom", "Spain", "France"], "enemies": [], "neutral": ["Russia"] }, 
    "Romania": { "allies": ["United States", "Turkey", "Hungary"], "enemies": [], "neutral": ["Russia", "Ukraine", "Moldova"] }, 
    "Russia": { "allies": ["Belarus", "China", "Armenia", "Kazakhstan", "India", "North Korea"], "enemies": ["United States", "United Kingdom"], "neutral": ["France", "Germany", "Japan", "Turkey"] }, 
    "Saudi Arabia": { "allies": ["United States", "Pakistan", "Egypt", "Kuwait"], "enemies": ["Iran", "Iraq"], "neutral": ["Russia", "China"] }, 
    "Serbia": { "allies": ["Russia"], "enemies": ["Croatia", "Bosnia and Herzegovina", "Albania"], "neutral": ["Greece", "Romania"] }, 
    "Singapore": { "allies": ["Malaysia", "Australia", "United States"], "enemies": [], "neutral": ["China", "Indonesia"] }, 
    "Slovakia": { "allies": ["Czech Republic", "Poland", "Germany"], "enemies": [], "neutral": ["Russia", "Hungary"] }, 
    "Slovenia": { "allies": ["Croatia", "Italy", "Austria", "Germany"], "enemies": [], "neutral": ["Russia"] }, 
    "South Africa": { "allies": ["Namibia", "Zimbabwe", "Mozambique"], "enemies": [], "neutral": ["United States", "Russia", "United Kingdom"] }, 
    "South Korea": { "allies": ["United States", "Japan", "Australia"], "enemies": ["North Korea"], "neutral": ["China", "Russia"] }, 
    "Spain": { "allies": ["United States", "France", "Portugal", "United Kingdom"], "enemies": [], "neutral": ["Morocco", "Russia"] }, 
    "Sudan": { "allies": ["Egypt", "Libya"], "enemies": [], "neutral": ["United States", "Ethiopia", "Saudi Arabia"] }, 
    "Sweden": { "allies": ["Norway", "Finland", "Denmark"], "enemies": [], "neutral": ["Russia", "United States", "Germany"] }, 
    "Switzerland": { "allies": [], "enemies": [], "neutral": ["France", "Germany", "Italy", "United States", "Russia"] }, 
    "Syria": { "allies": ["Iran", "Russia", "Lebanon"], "enemies": ["Israel", "United States"], "neutral": ["Turkey", "Egypt", "Iraq"] }, 
    "Tajikistan": { "allies": ["Russia", "Uzbekistan"], "enemies": [], "neutral": ["Afghanistan", "China"] }, 
    "Thailand": { "allies": ["United States", "Malaysia", "Singapore"], "enemies": [], "neutral": ["China", "Myanmar"] }, 
    "Turkey": { "allies": ["United States", "Azerbaijan", "Pakistan"], "enemies": ["Armenia"], "neutral": ["Russia", "Iran", "Greece"] }, 
    "Turkmenistan": { "allies": [], "enemies": [], "neutral": ["Russia", "Iran", "Uzbekistan", "Afghanistan"] }, 
    "Ukraine": { "allies": ["United States", "Poland"], "enemies": [], "neutral": ["Russia", "Belarus"] }, 
    "United Arab Emirates": { "allies": ["United States", "Saudi Arabia"], "enemies": [], "neutral": ["Iran", "Russia"] }, 
    "United Kingdom": { "allies": ["United States", "France", "Canada", "Australia"], "enemies": [], "neutral": ["Russia", "China", "Iraq"] }, 
    "United States": { "allies": ["United Kingdom", "France", "Canada", "Australia", "Japan", "South Korea", "Germany", "Italy", "Turkey", "Israel"], "enemies": ["Iraq", "Iran", "North Korea"], "neutral": ["Russia", "China", "India"] }, 
    "Uruguay": { "allies": ["Argentina", "Brazil"], "enemies": [], "neutral": ["United States", "Chile"] }, 
    "Uzbekistan": { "allies": ["Russia", "Kazakhstan"], "enemies": [], "neutral": ["Afghanistan", "Tajikistan", "United States"] }, 
    "Venezuela": { "allies": ["Cuba"], "enemies": [], "neutral": ["United States", "Colombia", "Brazil", "Russia"] }, 
    "Vietnam": { "allies": ["Russia"], "enemies": [], "neutral": ["China", "United States", "Cambodia"] }, 
    "Yugoslavia": { "allies": ["Russia"], "enemies": ["United States", "United Kingdom", "Albania", "Croatia", "Bosnia and Herzegovina"], "neutral": ["Greece", "Romania"] }, 
    "Zimbabwe": { "allies": ["South Africa", "Namibia"], "enemies": [], "neutral": ["United Kingdom", "United States", "Russia"] }
}

function getCountryData(countryName) {
    return nukeData.countries.find(
        c => c.country.toLowerCase() === countryName.toLowerCase()
    );
}


function getDiplomaticRelation(countryA, countryB) {

    const data = diplomacy[countryA];

    if (!data) {
        return "neutral";
    }

    if (data.allies?.includes(countryB)) {
        return "ally";
    }

    if (data.enemies?.includes(countryB)) {
        return "enemy";
    }

    return "neutral";
}


function getWarheadNumber(value) {

    if (typeof value === "number") {
        return value;
    }

    if (typeof value !== "string") {
        return 0;
    }

    const numbers = value.match(/\d+/g);

    if (!numbers) {
        return 0;
    }

    // "25-40" -> 40
    // "22000+" -> 22000
    // "0_confirmed" -> 0
    return Math.max(...numbers.map(Number));
}


function getRetaliationOptions(attackerName) {

    const attacker = getCountryData(attackerName);

    if (!attacker) {
        console.warn("Unknown attacker:", attackerName);
        return [];
    }

    const nuclearStates = [
        "NWS",
        "DE_FACTO_NWS",
        "UNDECLARED_NWS"
    ];

    const results = [];

    for (const country of nukeData.countries) {

        // Don't retaliate against itself
        if (country.country === attacker.country) {
            continue;
        }

        // Must have nuclear capability
        if (!nuclearStates.includes(country.nuclear_status)) {
            continue;
        }

        const warheads = getWarheadNumber(country.warheads_est);

        // No usable nuclear arsenal
        if (warheads <= 0) {
            continue;
        }

        /*
         * IMPORTANT:
         * These are the actual names from your dataset.
         */

        const relevance = Number(
            country.game_relevance_0_5 ?? 0
        );

        const confidence = Number(
            country.intel_confidence_0_5 ?? 0
        );

        const relationship = getDiplomaticRelation(
            country.country,
            attacker.country
        );

        /*
         * RETALIATION SCORE
         */

        let score = 0;

        // Nuclear capability
        score += 40;

        // Arsenal size
        score += Math.min(30, warheads / 500);

        // Game relevance
        score += (relevance / 5) * 20;

        // Diplomatic relationship
        if (relationship === "enemy") {
            score += 20;
        }
        else if (relationship === "neutral") {
            score += 5;
        }
        else if (relationship === "ally") {
            score -= 20;
        }

        /*
         * Intelligence confidence.
         *
         * If confidence is missing, don't let it create NaN.
         */
        const confidenceMultiplier =
            confidence > 0 ? confidence / 5 : 1;

        score *= confidenceMultiplier;

        // Keep score between 0 and 100
        score = Math.max(
            0,
            Math.min(100, score)
        );

        results.push({
            country: country.country,
            iso3: country.iso3,

            nuclear_status: country.nuclear_status,

            warheads_est: country.warheads_est,
            warheads_numeric: warheads,

            relevance: relevance,
            intel_confidence: confidence,

            relationship: relationship,

            retaliation_score: Math.round(score)
        });
    }

    // Highest score first
    results.sort(
        (a, b) =>
            b.retaliation_score -
            a.retaliation_score
    );

    return results;
}

function nukeProgress(city0, city1, launchTime) {
    const x0 = city0.lon,
    y0 = city0.lat,
    x1 = city1.lon,
    y1 = city1.lat
    //console.log(x0,y0,x1,y1)
    const R = 6371;

    const lat0 = y0 * Math.PI / 180;
    const lat1 = y1 * Math.PI / 180;
    const dLat = (y1 - y0) * Math.PI / 180;
    const dLon = (x1 - x0) * Math.PI / 180;

    // Haversine distance
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat0) *
        Math.cos(lat1) *
        Math.sin(dLon / 2) ** 2;

    const distanceKm =
        R * 2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    // Game speed
    const speedKmPerSecond = 150;

    // Total simulated flight time
    const flightTimeMs =
        (distanceKm / speedKmPerSecond) * 1000;

    // Current elapsed game time
    const elapsedMs =
        Math.max(0, gameTimer.elapsed() - launchTime);

    // Calculate progress ONCE
    const rawProgress =
        (elapsedMs / flightTimeMs) * 100;

    const progress =
        Math.min(100, Math.max(0, rawProgress));

    // Calculate remaining time directly from progress.
    // This guarantees progress and ETA always agree.
    const remainingMs =
        progress >= 100
            ? 0
            : flightTimeMs * (1 - progress / 100);

    // dd:hh:mm:ss.cc
    const totalHundredths =
        Math.floor(remainingMs / 10);

    const days =
        Math.floor(totalHundredths / 8640000);

    const hours =
        Math.floor(
            (totalHundredths % 8640000) / 360000
        );

    const minutes =
        Math.floor(
            (totalHundredths % 360000) / 6000
        );

    const seconds =
        Math.floor(
            (totalHundredths % 6000) / 100
        );

    const centiseconds =
        totalHundredths % 100;

    const eta =
    //`${String(days).padStart(2, '0')}:` +
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(centiseconds).padStart(2, '0')}`;

    return {
        progress,
        eta
    };
}

function getCities(country) {
    let list = [];
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].country === country) {
            list.push(i)
        }
    }
    return list;
}

function processNukes() {
    for (let n of nukes) {
        //console.log(n, " nukeporgress: ", nukeProgress(n.city0, n.city1, n.launchTime))
        let p = nukeProgress(n.city0, n.city1, n.launchTime).progress
        let iso3 = getCountryData(n.city0.country).iso3;
        drawArch(
            n.city0,
            n.city1,
            iso3ToColor(iso3),
            0.3,
            p,
            n.launchTime
        );
        if (n.responseThreshold < p && !n.gotResponse) {
            n.gotResponse = true;
            // can the targeted city nuke? try
            barrage(n.city1, n.city0);

            // allies that will respond on target's behalf?
            const retaliation = getRetaliationOptions(n.city1.country);
            for (let c of retaliation) {
                if (c.relationship == "ally") {
                    barrage(c, n.city0);
                }
            }
        }
    }
}

function barrage(cityF, cityT) {
    // check if aggressor has nukes
    let cData = getCountryData(cityF.country);
    let nukeNumber;
    if (cData?.warheads_est !== undefined || cData?.warheads_est != null) {
        nukeNumber = getWarheadNumber(cData.warheads_est);
    } else {
        nukeNumber = 0;
    }

    let fromList = getCities(cityF.country);
    let toList = getCities(cityT.country);
    let num = Math.min(nukeNumber, fromList.length, toList.length, getRandInt(8)+1);
    //console.log(fromList.length, toList.length, num)
    
    for (let i = 0; i < num; i++) {
        let cityF = cities[fromList[getRandInt(fromList.length)]];
        let cityT = cities[toList[getRandInt(toList.length)]];
        //console.log(cityF, cityT)
        if (getRandInt(100) > nukes.length) {
            const n = new Nuke(cityF, cityT, gameTimer.elapsed());
            //cast[0].text = `${cityF.country} has retaliated against ${cityT.country}...`;
            //cast[0].setText(cast[0].text);
        }
    }
}

function iso3ToColor(iso3) {
  let hash = 0;

  for (let i = 0; i < iso3.length; i++) {
    hash = ((hash << 5) - hash) + iso3.charCodeAt(i);
    hash |= 0;
  }

  // Golden-angle hue distribution gives visually separated colors.
  const hue = Math.abs(hash * 137.508) % 360;

  // Keep saturation/lightness in a readable range.
  return `hsl(${hue.toFixed(2)}, 65%, 55%)`;
}
