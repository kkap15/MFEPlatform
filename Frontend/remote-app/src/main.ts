import { initFederation } from "@angular-architects/native-federation";

initFederation({})
    .catch((err) => console.log(err))
    .then((_) => import('./bootstrap'))
    .catch((err) => console.log(err));