import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-bottom-nav",
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/home" routerLinkActive="active">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        >
          <path
            d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"
          ></path>
        </svg>
        Home
      </a>
      <a routerLink="/statistics" routerLinkActive="active">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 20V10M10 20V4M16 20v-8M22 20H2"></path>
        </svg>
        Statistik
      </a>
      <a routerLink="/profile" routerLinkActive="active">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <circle cx="12" cy="8" r="4"></circle>
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6"></path>
        </svg>
        Profil
      </a>
    </nav>
  `,
  styles: [
    `
      .bottom-nav {
        position: fixed;
        left: 8px;
        right: 8px;
        bottom: 8px;
        z-index: 10;
        display: flex;
        gap: 4px;
        padding: 6px;
        background: #1b2531;
        border-radius: 22px;
      }

      a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: 8px 0;
        border-radius: 16px;
        color: #9aa7b4;
        font-size: 11px;
        font-weight: 500;
        text-decoration: none;
      }

      a.active {
        background: #2b3949;
        color: #5bd6a0;
        font-weight: 600;
      }
    `,
  ],
})
export class BottomNav {}
