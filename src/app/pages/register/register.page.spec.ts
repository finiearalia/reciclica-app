import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { registerReducer } from 'src/store/register/register.reducers';
import { register, registerFail, registerSuccess } from 'src/store/register/register.actions';
import { UserRegister } from 'src/app/model/user/UserRegister';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports : [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        RegisterPageModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        StoreModule.forFeature("register", registerReducer),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should cretae register form on page init', () => {
    fixture.detectChanges();
    expect(component.registerForm).not.toBeUndefined();
  })

  it('should go to home page on register', () => {
    fixture.detectChanges();
    spyOn(router, 'navigate');
    fillForm();
    page.querySelector('ion-button').click();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();
    spyOn(router, 'navigate');
    clickOnRegisterButton();
    expect(router.navigate).toHaveBeenCalledTimes(0);
})
it ('given form is valid, when user clicks on register button, then register', () => {
  fixture.detectChanges();
    fillForm();
    clickOnRegisterButton();
    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
    })
})

it('should hide loading component when registration successful', () => {
  fixture.detectChanges();

  store.dispatch(register({ userRegister: new UserRegister() }));
  store.dispatch(registerSuccess());

  store.select('loading').subscribe(state => {
    expect(state.show).toBeFalsy();
  });
});

it('should login when registration successful', () => {
  fixture.detectChanges();

  store.dispatch(register({ userRegister: new UserRegister() }));
  store.dispatch(registerSuccess());

  store.select('login').subscribe(state => {
    expect(state.isLoggingIn).toBeTruthy();
  })
})

it('should hide loading component when registration fails', () => {
  fixture.detectChanges();

  store.dispatch(register({ userRegister: new UserRegister() }));
  store.dispatch(registerFail({ error: { message: 'any message' } }));

  store.select('loading').subscribe(state => {
    expect(state.show).toBeFalsy();
  });
});

it('should show error when registration fails', () => {
  fixture.detectChanges();

  spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

  store.dispatch(register({ userRegister: new UserRegister() }));
  store.dispatch(registerFail({ error: { message: 'any message' } }));

  expect(toastController.create).toHaveBeenCalled();
});

function clickOnRegisterButton(){
  page.querySelector('ion-button').click();
}

function fillForm(){
  component.registerForm.getForm().get('name')?.setValue('anyName');

  component.registerForm.getForm().get('email')?.setValue('any@email.com');

  component.registerForm.getForm().get('password')?.setValue('anyPassword');

  component.registerForm.getForm().get('repeatPassword')?.setValue('anyPassword');

  component.registerForm.getForm().get('phone')?.setValue('anyPhone');

  component.registerForm.getForm().get('address')?.get('street')?.setValue('anyStreet');

  component.registerForm.getForm().get('address')?.get('number')?.setValue('anyNumber');

  component.registerForm.getForm().get('address')?.get('complement')?.setValue('anyNeighorhood');

  component.registerForm.getForm().get('address')?.get('neighorhood')?.setValue('anyNeighorhood');

  component.registerForm.getForm().get('address')?.get('zip code')?.setValue('anyZipCode');

  component.registerForm.getForm().get('address')?.get('state')?.setValue('anyState');

  component.registerForm.getForm().get('address')?.get('city')?.setValue('anyCity');
}

});
