import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagemNovaComponent } from './postagem-nova.component';

describe('PostagemNovaComponent', () => {
  let component: PostagemNovaComponent;
  let fixture: ComponentFixture<PostagemNovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostagemNovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostagemNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
