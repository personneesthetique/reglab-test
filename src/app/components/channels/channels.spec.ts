import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { Channels } from './channels';

describe('Channels', () => {
  let component: Channels;
  let fixture: ComponentFixture<Channels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Channels],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              user: null,
              isAuthenticated: false,
              loginInAt: null,
            },
            chats: {
              messages: [],
            },
            channels: {
              selectedChannel: null,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Channels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
