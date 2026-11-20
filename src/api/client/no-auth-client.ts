import axios from "axios";

import { CLIENT_CONFIG } from "./base";

export const NoAuthClient = axios.create(CLIENT_CONFIG);
