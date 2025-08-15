import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLedgersDeliveryNoteComponent } from './add-ledgers-delivery-note.component';

describe('AddLedgersDeliveryNoteComponent', () => {
  let component: AddLedgersDeliveryNoteComponent;
  let fixture: ComponentFixture<AddLedgersDeliveryNoteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLedgersDeliveryNoteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLedgersDeliveryNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
