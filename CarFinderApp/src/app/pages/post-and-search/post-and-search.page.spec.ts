import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostAndSearchPage } from './post-and-search.page';

describe('PostAndSearchPage', () => {
  let component: PostAndSearchPage;
  let fixture: ComponentFixture<PostAndSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAndSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
