import { TestBed } from '@angular/core/testing';
import { App } from './app';

const mockContent = {
  name: 'Test Name',
  tagline: 'M.A. Candidate in Linguistics',
  university: 'Test University',
  location: 'Test City',
  email: 'test@example.com',
  linkedinUrl: '#',
  cvUrl: '#',
  about: 'About text.',
  education: [{ degree: 'M.A.', institution: 'Test University', years: '2024 - 2026', detail: '' }],
  researchSummary: 'Research summary.',
  thesisTitle: 'Thesis Title',
  publications: ['A. Author. (2026). A paper. A venue.'],
  experience: [
    { role: 'Role', organization: 'Org', years: '2023 - 2024', description: 'Description.' },
  ],
  skills: { languages: 'English', methods: 'Methods', tools: 'Tools' },
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
