import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { Channels } from './channels';
import { LOCAL_STORAGE, POLLING_INTERVAL } from '../../app.config';

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
        {
          provide: POLLING_INTERVAL,
          useValue: () => {},
        },
        {
          provide: LOCAL_STORAGE,
          useValue: {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {},
          },
        },
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
