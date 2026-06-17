<script setup lang="ts">
// East End Systems — single-page marketing site.
// Design ported from the Stitch "East End Technical" design system.

import { ref } from 'vue'
import { AsciiOverlay } from 'vue-ascii-overlay'

// Formspree form ID (see README → Contact form). Set back to 'your-form-id' to
// fall back to a plain mailto link instead of the live form.
// Typed as string so the placeholder comparison below stays valid.
const FORMSPREE_ID: string = 'meewndwd'
const formAction = `https://formspree.io/f/${FORMSPREE_ID}`
const usesFormspree = FORMSPREE_ID !== 'your-form-id'

// Submit via AJAX (Accept: application/json) so Formspree returns JSON instead
// of redirecting to its hosted /thanks page (customising that redirect is a paid
// feature). We render our own thank-you state in place — no redirect, no cost.
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<SubmitStatus>('idle')
const errorMsg = ref('')

async function onSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  status.value = 'submitting'
  errorMsg.value = ''
  try {
    const res = await fetch(formAction, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
    if (res.ok) {
      status.value = 'success'
      form.reset()
    } else {
      const data = await res.json().catch(() => null)
      errorMsg.value =
        data?.errors?.map((e: { message: string }) => e.message).join(', ') ||
        data?.error ||
        'Something went wrong. Please email info@eastendsystems.com.'
      status.value = 'error'
    }
  } catch {
    errorMsg.value = 'Network error. Please email info@eastendsystems.com directly.'
    status.value = 'error'
  }
}

const services = [
  {
    icon: 'account_tree',
    title: 'Enterprise Architecture & System Design',
    body: 'Scalable, resilient architectures for mission-critical applications. Emphasizing clear boundaries and robust data flow.',
  },
  {
    icon: 'smart_toy',
    title: 'AI-Integrated Systems & Agentic Workflows',
    body: 'Seamlessly embedding language models into existing pipelines. Deterministic execution for non-deterministic intelligence.',
  },
  {
    icon: 'terminal',
    title: 'Developer Tooling & Internal Platform Engineering',
    body: 'Accelerating velocity through bespoke CLI tools, immutable testing frameworks, and streamlined deployment paved roads.',
  },
  {
    icon: 'forum',
    title: 'Technical Advisory',
    body: 'Confidential engagements available for engineering leaders navigating high-stakes architectural pivots or technical due diligence.',
  },
]

const projects = [
  {
    category: 'Application',
    title: 'SpaceTag',
    body: 'macOS productivity suite. Swift menu bar app + open-source CLI. Surfaces LLM completion notifications (Claude Code, Codex) via color-coded per-space indicators.',
    tags: ['Swift', 'macOS', 'CLI'],
    href: 'https://github.com/notTag/Space-Tag-CLI',
  },
  {
    category: 'Framework',
    title: 'Golden Tests',
    body: 'Immutable testing framework preventing AI agents from gaming test suites during automated development workflows. Enforces structural integrity.',
    tags: ['Testing', 'DevTools'],
    href: '',
  },
  {
    category: 'Data Infrastructure',
    title: 'Vector Recommendation Engine',
    body: 'pgVector + Postgres + Nomic embeddings recommendation system seeded from structured public API data. Currently in active development.',
    tags: ['Postgres', 'pgVector', 'ML'],
    href: 'https://github.com/notTag/MTGRecSystem',
  },
  {
    category: 'Design System',
    title: 'Shared Design System',
    body: 'CSS-based theming system consumed across multiple production projects. Enforces strict visual hierarchy and token management. Open source.',
    tags: ['CSS', 'Architecture', 'Open Source'],
    href: 'https://github.com/notTag/DesignSystem',
  },
]
</script>

<template>
  <!-- Navigation -->
  <nav class="fixed top-0 z-50 w-full border-b border-slate-gray bg-background">
    <div
      class="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-margin-mobile md:px-gutter"
    >
      <a class="font-headline-lg text-headline-lg tracking-tighter text-on-surface" href="#">
        East End Systems
      </a>
      <div class="hidden items-center gap-8 font-label-caps text-label-caps md:flex">
        <a
          class="cursor-pointer text-on-surface-variant transition-colors duration-150 hover:text-primary"
          href="#services"
          >Services</a
        >
        <a
          class="cursor-pointer text-on-surface-variant transition-colors duration-150 hover:text-primary"
          href="#projects"
          >Projects</a
        >
        <a
          class="cursor-pointer text-on-surface-variant transition-colors duration-150 hover:text-primary"
          href="#contact"
          >Contact</a
        >
        <a
          class="border border-muted-teal px-6 py-3 text-xs font-semibold uppercase tracking-widest text-on-surface transition-colors duration-150 hover:bg-muted-teal/10"
          href="#contact"
          >Get in Touch</a
        >
      </div>
      <a class="text-on-surface md:hidden" href="#contact" aria-label="Contact">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">mail</span>
      </a>
    </div>
  </nav>

  <main class="pt-20">
    <!-- Hero -->
    <section
      class="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-slate-gray"
    >
      <div class="technical-grid absolute inset-0 opacity-20"></div>
      <div class="wave-pattern absolute inset-0 opacity-50"></div>
      <!-- Interactive ASCII fluid overlay (vue-ascii-overlay). Fills the hero;
           content sits above it via z-10. -->
      <div class="absolute inset-0 z-0">
        <AsciiOverlay color="#4a7075" />
      </div>
      <div
        class="pointer-events-none relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-margin-mobile md:px-gutter lg:grid-cols-12"
      >
        <div class="flex flex-col items-start lg:col-span-8">
          <p class="mb-4 font-mono-technical text-mono-technical uppercase tracking-widest text-muted-teal">
            Precision Engineering
          </p>
          <h1
            class="mb-6 max-w-4xl font-headline-xl text-headline-xl font-semibold text-on-surface md:text-[64px] md:leading-[1.1] md:tracking-[-0.03em]"
          >
            East End Systems
          </h1>
          <p class="mb-10 max-w-2xl font-body-md text-body-md leading-relaxed text-on-surface-variant md:text-xl">
            Software engineering consultancy specializing in enterprise architecture, developer
            tooling, and AI-integrated systems.
          </p>
          <div class="pointer-events-auto flex flex-col gap-4 sm:flex-row">
            <a
              class="inline-block border border-muted-teal px-8 py-4 text-center font-label-caps text-label-caps uppercase text-on-surface transition-all duration-150 hover:bg-muted-teal hover:text-white"
              href="#contact"
              >Get in Touch</a
            >
            <a
              class="inline-block border border-slate-gray px-8 py-4 text-center font-label-caps text-label-caps uppercase text-on-surface-variant transition-all duration-150 hover:border-on-surface hover:text-on-surface"
              href="#services"
              >View Methodology</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="relative border-b border-slate-gray bg-surface-dim py-stack-lg">
      <div class="mx-auto w-full max-w-[1200px] px-margin-mobile md:px-gutter">
        <div class="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <h2 class="mb-2 font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg">
              Core Competencies
            </h2>
            <p class="font-mono-technical text-mono-technical text-on-surface-variant">
              Structured approaches to complex systems.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div
            v-for="service in services"
            :key="service.title"
            class="group relative flex h-full flex-col border border-slate-gray bg-[#151515] p-8 transition-colors duration-150 hover:border-muted-teal"
          >
            <span
              class="material-symbols-outlined mb-6 text-3xl text-muted-teal"
              style="font-variation-settings: 'FILL' 0"
              >{{ service.icon }}</span
            >
            <h3 class="mb-4 font-headline-lg text-xl font-medium text-on-surface md:text-2xl">
              {{ service.title }}
            </h3>
            <p class="font-body-md text-body-md leading-relaxed text-on-surface-variant">
              {{ service.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="relative border-b border-slate-gray bg-background py-stack-lg">
      <div class="mx-auto w-full max-w-[1200px] px-margin-mobile md:px-gutter">
        <div class="mb-16">
          <h2 class="mb-2 font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg">
            Selected Work
          </h2>
          <p class="font-mono-technical text-mono-technical text-on-surface-variant">
            Production systems and open-source contributions.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <component
            :is="project.href ? 'a' : 'div'"
            v-for="project in projects"
            :key="project.title"
            :href="project.href || undefined"
            :target="project.href ? '_blank' : undefined"
            :rel="project.href ? 'noopener' : undefined"
            :aria-label="project.href ? `Open ${project.title} on GitHub` : undefined"
            class="group relative flex h-full flex-col border border-slate-gray bg-[#151515] p-8 transition-colors duration-150 hover:border-muted-teal"
          >
            <div class="mb-6 flex items-start justify-between">
              <span
                class="border border-muted-teal/30 bg-muted-teal/5 px-2 py-1 font-label-caps text-label-caps uppercase tracking-widest text-muted-teal"
                >{{ project.category }}</span
              >
              <span
                v-if="project.href"
                class="text-on-surface-variant transition-colors group-hover:text-primary"
              >
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"
                  >arrow_outward</span
                >
              </span>
            </div>
            <h3 class="mb-3 font-headline-lg text-2xl font-medium text-on-surface">
              {{ project.title }}
            </h3>
            <p class="mb-6 flex-grow font-body-md text-body-md text-on-surface-variant">
              {{ project.body }}
            </p>
            <div class="mt-auto flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="border border-slate-gray bg-black/50 px-2 py-1 font-mono-technical text-xs text-slate-400"
                >{{ tag }}</span
              >
            </div>
            <a
              v-if="!project.href"
              href="#contact"
              class="mt-6 inline-block self-start border border-muted-teal px-6 py-3 font-label-caps text-label-caps uppercase text-on-surface transition-all duration-150 hover:bg-muted-teal hover:text-white"
            >
              Request Details →
            </a>
          </component>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="relative overflow-hidden border-b border-slate-gray bg-surface-dim py-stack-lg">
      <div class="pointer-events-none absolute bottom-0 right-0 opacity-5">
        <span class="material-symbols-outlined text-[300px]" style="font-variation-settings: 'FILL' 0"
          >my_location</span
        >
      </div>
      <div class="relative z-10 mx-auto w-full max-w-[1200px] px-margin-mobile md:px-gutter">
        <div class="max-w-2xl">
          <h2 class="mb-4 font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg">
            Initiate Dialogue
          </h2>
          <p class="mb-10 font-body-md text-body-md text-on-surface-variant">
            Available for select technical advisory and architectural engagements. Located in Sag
            Harbor, New York. Remote-friendly globally.
          </p>

          <form
            v-if="usesFormspree && status !== 'success'"
            class="space-y-6"
            :action="formAction"
            method="POST"
            @submit.prevent="onSubmit"
          >
            <!-- Honeypot: bots fill this; Formspree silently drops those. Hidden
                 from humans and screen readers. Replaces reCAPTCHA spam defence. -->
            <input
              type="text"
              name="_gotcha"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="hidden"
            />
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="mb-2 block font-label-caps text-label-caps text-on-surface-variant" for="name"
                  >Name</label
                >
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter name"
                  class="w-full border-0 border-b border-slate-gray bg-transparent px-0 py-2 font-mono-technical text-on-surface transition-colors placeholder:text-slate-600 focus:border-muted-teal focus:ring-0"
                />
              </div>
              <div>
                <label class="mb-2 block font-label-caps text-label-caps text-on-surface-variant" for="email"
                  >Email</label
                >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="address@domain.com"
                  class="w-full border-0 border-b border-slate-gray bg-transparent px-0 py-2 font-mono-technical text-on-surface transition-colors placeholder:text-slate-600 focus:border-muted-teal focus:ring-0"
                />
              </div>
            </div>
            <div>
              <label class="mb-2 block font-label-caps text-label-caps text-on-surface-variant" for="message"
                >Inquiry</label
              >
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Describe the engagement..."
                class="w-full resize-none border-0 border-b border-slate-gray bg-transparent px-0 py-2 font-mono-technical text-on-surface transition-colors placeholder:text-slate-600 focus:border-muted-teal focus:ring-0"
              ></textarea>
            </div>
            <p
              v-if="status === 'error'"
              class="font-mono-technical text-mono-technical text-error"
            >
              {{ errorMsg }}
            </p>
            <div class="pt-4">
              <button
                type="submit"
                :disabled="status === 'submitting'"
                class="w-full border border-muted-teal px-8 py-4 font-label-caps text-label-caps uppercase text-on-surface transition-all duration-150 hover:bg-muted-teal hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                {{ status === 'submitting' ? 'Sending…' : 'Send Transmission' }}
              </button>
            </div>
          </form>

          <!-- Our own thank-you state — replaces Formspree's hosted redirect. -->
          <div
            v-else-if="usesFormspree && status === 'success'"
            class="border border-muted-teal bg-muted-teal/5 p-8"
          >
            <p
              class="mb-3 font-mono-technical text-mono-technical uppercase tracking-widest text-muted-teal"
            >
              Transmission received
            </p>
            <h3 class="mb-4 font-headline-lg text-2xl font-medium text-on-surface">Thank you.</h3>
            <p class="mb-6 font-body-md text-body-md text-on-surface-variant">
              Your inquiry reached East End Systems. We’ll respond from
              <span class="text-on-surface">info@eastendsystems.com</span> shortly.
            </p>
            <button
              type="button"
              class="font-label-caps text-label-caps uppercase text-muted-teal transition-colors hover:text-on-surface"
              @click="status = 'idle'"
            >
              Send another →
            </button>
          </div>

          <!-- Fallback until a Formspree ID is configured. -->
          <div v-else class="pt-2">
            <a
              href="mailto:info@eastendsystems.com"
              class="inline-block border border-muted-teal px-8 py-4 font-label-caps text-label-caps uppercase text-on-surface transition-all duration-150 hover:bg-muted-teal hover:text-white"
            >
              info@eastendsystems.com
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer
    class="mx-auto flex w-full flex-col items-center justify-between gap-4 border-t border-slate-gray bg-surface-container px-margin-mobile py-stack-sm md:flex-row md:px-gutter"
  >
    <div class="font-label-caps text-label-caps text-on-surface">East End Systems</div>
    <div class="text-center font-body-sm text-body-sm text-on-surface-variant">
      © 2026 East End Systems. Precision Engineering for Sag Harbor and Beyond.
    </div>
    <div class="flex gap-6 font-body-sm text-body-sm">
      <a
        class="text-on-surface-variant transition-colors duration-150 hover:text-muted-teal"
        href="https://github.com/notTag"
        target="_blank"
        rel="noopener"
        >Github</a
      >
    </div>
  </footer>
</template>
