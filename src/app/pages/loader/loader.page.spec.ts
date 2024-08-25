import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { compileComponentClassMetadata } from '@angular/compiler';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderPage ],
      imports: [
        IonicModule.forRoot(),
          AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to login page after load', fakeAsync(() =>{
    spyOn(router, 'navigate');
    component.ngOnInit();

    tick(1500);
    
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }))
});
function compileComponents() {
  throw new Error('Function not implemented.');
}

