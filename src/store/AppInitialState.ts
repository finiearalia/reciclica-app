import { AppState } from "./AppState";
import { show } from "./loading/loading.actions";

export const AppinitialState: AppState = {
  loading: {
    show: false
  },
  login: {
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false
  }
}
