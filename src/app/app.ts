import { Component, effect, inject, resource } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface EducationEntry {
  degree: string;
  institution: string;
  years: string;
  detail: string;
}

interface TeachingEntry {
  title: string;
  institution: string;
  years: string;
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
  about: string[];
  education: EducationEntry[];
  researchInterests: string[];
  publications: {
    peerReviewed: string[];
    other: string[];
  };
  selectedPresentations: string[];
  teaching: TeachingEntry[];
  teachingNote: string;
  fellowships: string[];
  languages: {
    modern: string;
    historical: string;
  };
}

type LoadedContent = SiteContent & { lastUpdated: string | null };

async function loadContent(): Promise<LoadedContent> {
  const res = await fetch('content.json');
  if (!res.ok) {
    throw new Error(`Failed to load content.json: ${res.status}`);
  }
  const lastModified = res.headers.get('last-modified');
  const lastModifiedDate = lastModified ? new Date(lastModified) : null;
  const lastUpdated =
    lastModifiedDate && !isNaN(lastModifiedDate.getTime())
      ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
          lastModifiedDate,
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
