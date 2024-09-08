import { AppState } from "./AppState";
import { show } from "./loading/loading.actions";

export const AppInitialState: AppState = {
  loading: {
    show: false
  },
  login: {
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false
  },
  register: {
    error: null,
    isRegistering: false,
    isRegistered: false
  }
}
