//import Intl from "intl/lib/core";
//import 'intl/locale-data/jsonp/en-US'

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFactionDigits: 0
})