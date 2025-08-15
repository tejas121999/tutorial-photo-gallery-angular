import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddItemDeliveryNoteComponent } from './add-item-delivery-note.component';

describe('AddItemDeliveryNoteComponent', () => {
  let component: AddItemDeliveryNoteComponent;
  let fixture: ComponentFixture<AddItemDeliveryNoteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemDeliveryNoteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemDeliveryNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
