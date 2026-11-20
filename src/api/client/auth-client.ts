import axios from "axios";

import { CLIENT_CONFIG } from "./base";

export const AuthClient = axios.create(CLIENT_CONFIG);
