import { Component, effect, inject, resource } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface EducationEntry {
  degree: string;
  institution: string;
  years: string;
  detail: string;
}

interface ExperienceEntry {
  role: string;
  organization: string;
  years: string;
  description: string;
}

interface SiteContent {
  name: string;
  tagline: string;
  university: string;
  location: string;
  email: string;
  photoUrl: string;
  linkedinUrl: string;
  cvUrl: string;
  academiaUrl: string;
  blueskyUrl: string;
  about: string;
  education: EducationEntry[];
  researchSummary: string;
  thesisTitle: string;
  publications: string[];
  presentations: string[];
  experience: ExperienceEntry[];
  skills: {
    languages: string;
    methods: string;
    tools: string;
  };
}

type LoadedContent = SiteContent & { lastUpdated: string | null };

async function loadContent(): Promise<LoadedContent> {
  const res = await fetch('/content.json');
  if (!res.ok) {
    throw new Error(`Failed to load content.json: ${res.status}`);
  }
  const lastModified = res.headers.get('last-modified');
  const lastUpdated = lastModified
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
        new Date(lastModified),
      )
    : null;
  const data = (await res.json()) as SiteContent;
  return { ...data, lastUpdated };
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
})
export class App {
  private readonly titleService = inject(Title);
  protected readonly content = resource({ loader: loadContent });

  constructor() {
    effect(() => {
      if (this.content.hasValue()) {
        this.titleService.setTitle(`${this.content.value().name} | Linguistics`);
      }
    });
  }
}
