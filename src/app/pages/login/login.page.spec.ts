import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };
  let store: Store<AppState>;
  let toastController: ToastController;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
    page = fixture.debugElement.nativeElement;
  }));

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  });


  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/pw on forgot emal/pw', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@email.com");
    page.querySelector("#recoverPasswordButton").click();

    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
  })
  store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeTruthy();
});


  it('give user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });
});

it('give user is recovering password, when fail, then hide loading and show error message', () => {
  spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
  fixture.detectChanges();
  store.dispatch(recoverPassword({email: "any@email.com"}));
  store.dispatch(recoverPasswordFail({error: "error"}));
  store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
  })
  expect(toastController.create).toHaveBeenCalledTimes(1);
  });

it('should show loading and start login when logging in', () => {
  fixture.detectChanges();
  component.form.get('email')?.setValue("valid@email.com");
  component.form.get('password')?.setValue("anyPassword");
  page.querySelector("#loginButton").click();

  store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeTruthy();
})

  store.select('login').subscribe(loginState => {
    expect(loginState.isLoggingIn).toBeTruthy();
})
})

it('give user is logging in, when success, than hide loading and send user to home page', async () => {
  spyOn(router, 'navigate');

  fixture.detectChanges();
  store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
  store.dispatch(loginSuccess({user: new User()}));
  store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
  })
  store.select('login').subscribe(loginState => {
    expect(loginState.isLoggedIn).toBeTruthy();
  })
  expect(router.navigate).toHaveBeenCalledWith(['home']);
})
it ('give user is logging in, when fail, than hide loading and show error message', () => {
  spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
  fixture.detectChanges();
  store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
  store.dispatch(loginFail({error: {message: 'error message'}}));
  store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
  })
  expect(toastController.create).toHaveBeenCalledTimes(1);
})
});

