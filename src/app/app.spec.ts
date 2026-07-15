import { TestBed } from '@angular/core/testing';
import { App } from './app';

const mockContent = {
  name: 'Test Name',
  tagline: 'M.A. Candidate in Linguistics',
  university: 'Test University',
  location: 'Test City',
  email: 'test@example.com',
  photoUrl: '/profile.jpeg',
  linkedinUrl: '#',
  cvUrl: '#',
  academiaUrl: '#',
  blueskyUrl: '#',
  about: ['About text.'],
  education: [{ degree: 'M.A.', institution: 'Test University', years: '2024 - 2026', detail: '' }],
  researchInterests: ['A research interest.'],
  publications: {
    peerReviewed: ['A. Author. (2026). A paper. A journal.'],
    other: ['A. Author. (2026). Another paper. Another venue.'],
  },
  selectedPresentations: ['A. Author. (2026). A talk. A conference.'],
  teaching: [{ title: 'A Course', institution: 'Test University', years: '2026' }],
  teachingNote: 'Also taught elsewhere.',
  fellowships: ['A Fellowship, Test University, 2026.'],
  languages: { modern: 'English (native).', historical: 'Latin.' },
};

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create the app', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'last-modified': 'Tue, 14 Jul 2026 00:00:00 GMT' }),
        json: () => Promise.resolve(mockContent),
      }),
    );
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render fetched content', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'last-modified': 'Tue, 14 Jul 2026 00:00:00 GMT' }),
        json: () => Promise.resolve(mockContent),
      }),
    );
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Test Name');
    expect(document.title).toBe('Test Name | Linguistics');
  });

  it('should show an error message when content.json fails to load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("Couldn't load page content.");
  });
});
