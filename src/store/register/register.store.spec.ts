import { UserRegister } from "src/app/model/user/UserRegister";
import { AppInitialState } from "../AppInitialState"
import { registerReducer } from "./register.reducers";
import { register, registerFail, registerSuccess } from "./register.actions";

describe('Register store', () => {
  it('register', () => {
    const initialState = {
      ...AppInitialState.register
    };
    const newState = registerReducer(initialState, register({userRegister: new UserRegister()}));

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRegistering: true,
      isRegistered: false
  })
})
it('registerSuccess', () => {
  const initialState = {
      ...AppInitialState.register,
      isRegistering: true
  };
  const newState = registerReducer(initialState, registerSuccess());
  expect(newState).toEqual({
      ...initialState,
      isRegistering: false,
      isRegistered: true
  });
});

it('registerFail', () => {
  const initialState = {
      ...AppInitialState.register,
      isRegistering: true
  };

  const error = "any error";  // Update to match the expected error type (string)
  const newState = registerReducer(initialState, registerFail({ error }));
  expect(newState).toEqual({
      ...initialState,
      error,
      isRegistering: false,
      isRegistered: false
  });
});
})
