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
    title: 'Golden Lock',
    body: 'Immutable testing framework preventing AI agents from gaming test suites during automated development workflows. Enforces structural integrity.',
    tags: ['Testing', 'DevTools'],
    href: 'https://www.goldenlock.dev/',
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
  <nav class="border-slate-gray bg-background fixed top-0 z-50 w-full border-b">
    <div
      class="px-margin-mobile md:px-gutter mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between"
    >
      <a class="font-headline-lg text-headline-lg text-on-surface tracking-tighter" href="#">
        East End Systems
      </a>
      <div class="font-label-caps text-label-caps hidden items-center gap-8 md:flex">
        <a
          class="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-150"
          href="#services"
          >Services</a
        >
        <a
          class="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-150"
          href="#projects"
          >Projects</a
        >
        <a
          class="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-150"
          href="#contact"
          >Contact</a
        >
        <a
          class="border-muted-teal text-on-surface hover:bg-muted-teal/10 border px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors duration-150"
          href="#contact"
          >Get in Touch</a
        >
      </div>
      <a class="text-on-surface md:hidden" href="#contact" aria-label="Contact">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"
          >mail</span
        >
      </a>
    </div>
  </nav>

  <main class="pt-20">
    <!-- Hero -->
    <section
      class="border-slate-gray relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b"
    >
      <div class="technical-grid absolute inset-0 opacity-20"></div>
      <div class="wave-pattern absolute inset-0 opacity-50"></div>
      <!-- Interactive ASCII fluid overlay (vue-ascii-overlay). Fills the hero;
           content sits above it via z-10. -->
      <div class="absolute inset-0 z-0">
        <AsciiOverlay color="#4a7075" />
      </div>
      <div
        class="px-margin-mobile md:px-gutter pointer-events-none relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 lg:grid-cols-12"
      >
        <div class="flex flex-col items-start lg:col-span-8">
          <p
            class="font-mono-technical text-mono-technical text-muted-teal mb-4 tracking-widest uppercase"
          >
            Precision Engineering
          </p>
          <h1
            class="font-headline-xl text-headline-xl text-on-surface mb-6 max-w-4xl font-semibold md:text-[64px] md:leading-[1.1] md:tracking-[-0.03em]"
          >
            East End Systems
          </h1>
          <p
            class="font-body-md text-body-md text-on-surface-variant mb-10 max-w-2xl leading-relaxed md:text-xl"
          >
            Software engineering consultancy specializing in enterprise architecture, developer
            tooling, and AI-integrated systems.
          </p>
          <div class="pointer-events-auto flex flex-col gap-4 sm:flex-row">
            <a
              class="border-muted-teal font-label-caps text-label-caps text-on-surface hover:bg-muted-teal inline-block border px-8 py-4 text-center uppercase transition-all duration-150 hover:text-white"
              href="#contact"
              >Get in Touch</a
            >
            <a
              class="border-slate-gray font-label-caps text-label-caps text-on-surface-variant hover:border-on-surface hover:text-on-surface inline-block border px-8 py-4 text-center uppercase transition-all duration-150"
              href="#services"
              >View Methodology</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="border-slate-gray bg-surface-dim py-stack-lg relative border-b">
      <div class="px-margin-mobile md:px-gutter mx-auto w-full max-w-[1200px]">
        <div class="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <h2
              class="font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg mb-2"
            >
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
            class="group border-slate-gray hover:border-muted-teal relative flex h-full flex-col border bg-[#151515] p-8 transition-colors duration-150"
          >
            <span
              class="material-symbols-outlined text-muted-teal mb-6 text-3xl"
              style="font-variation-settings: 'FILL' 0"
              >{{ service.icon }}</span
            >
            <h3 class="font-headline-lg text-on-surface mb-4 text-xl font-medium md:text-2xl">
              {{ service.title }}
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {{ service.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="border-slate-gray bg-background py-stack-lg relative border-b">
      <div class="px-margin-mobile md:px-gutter mx-auto w-full max-w-[1200px]">
        <div class="mb-16">
          <h2
            class="font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg mb-2"
          >
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
            :aria-label="project.href ? `Open ${project.title} website` : undefined"
            class="group border-slate-gray hover:border-muted-teal relative flex h-full flex-col border bg-[#151515] p-8 transition-colors duration-150"
          >
            <div class="mb-6 flex items-start justify-between">
              <span
                class="border-muted-teal/30 bg-muted-teal/5 font-label-caps text-label-caps text-muted-teal border px-2 py-1 tracking-widest uppercase"
                >{{ project.category }}</span
              >
              <span
                v-if="project.href"
                class="text-on-surface-variant group-hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0"
                  >arrow_outward</span
                >
              </span>
            </div>
            <h3 class="font-headline-lg text-on-surface mb-3 text-2xl font-medium">
              {{ project.title }}
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
              {{ project.body }}
            </p>
            <div class="mt-auto flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="border-slate-gray font-mono-technical border bg-black/50 px-2 py-1 text-xs text-slate-400"
                >{{ tag }}</span
              >
            </div>
            <a
              v-if="!project.href"
              href="#contact"
              class="border-muted-teal font-label-caps text-label-caps text-on-surface hover:bg-muted-teal mt-6 inline-block self-start border px-6 py-3 uppercase transition-all duration-150 hover:text-white"
            >
              Request Details →
            </a>
          </component>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="border-slate-gray bg-surface-dim py-stack-lg relative overflow-hidden border-b"
    >
      <div class="pointer-events-none absolute right-0 bottom-0 opacity-5">
        <span
          class="material-symbols-outlined text-[300px]"
          style="font-variation-settings: 'FILL' 0"
          >my_location</span
        >
      </div>
      <div class="px-margin-mobile md:px-gutter relative z-10 mx-auto w-full max-w-[1200px]">
        <div class="max-w-2xl">
          <h2
            class="font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg mb-4"
          >
            Initiate Dialogue
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant mb-10">
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
                <label
                  class="font-label-caps text-label-caps text-on-surface-variant mb-2 block"
                  for="name"
                  >Name</label
                >
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter name"
                  class="border-slate-gray font-mono-technical text-on-surface focus:border-muted-teal w-full border-0 border-b bg-transparent px-0 py-2 transition-colors placeholder:text-slate-600 focus:ring-0"
                />
              </div>
              <div>
                <label
                  class="font-label-caps text-label-caps text-on-surface-variant mb-2 block"
                  for="email"
                  >Email</label
                >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="address@domain.com"
                  class="border-slate-gray font-mono-technical text-on-surface focus:border-muted-teal w-full border-0 border-b bg-transparent px-0 py-2 transition-colors placeholder:text-slate-600 focus:ring-0"
                />
              </div>
            </div>
            <div>
              <label
                class="font-label-caps text-label-caps text-on-surface-variant mb-2 block"
                for="message"
                >Inquiry</label
              >
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Describe the engagement..."
                class="border-slate-gray font-mono-technical text-on-surface focus:border-muted-teal w-full resize-none border-0 border-b bg-transparent px-0 py-2 transition-colors placeholder:text-slate-600 focus:ring-0"
              ></textarea>
            </div>
            <p v-if="status === 'error'" class="font-mono-technical text-mono-technical text-error">
              {{ errorMsg }}
            </p>
            <div class="pt-4">
              <button
                type="submit"
                :disabled="status === 'submitting'"
                class="border-muted-teal font-label-caps text-label-caps text-on-surface hover:bg-muted-teal w-full border px-8 py-4 uppercase transition-all duration-150 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                {{ status === 'submitting' ? 'Sending…' : 'Send Transmission' }}
              </button>
            </div>
          </form>

          <!-- Our own thank-you state — replaces Formspree's hosted redirect. -->
          <div
            v-else-if="usesFormspree && status === 'success'"
            class="border-muted-teal bg-muted-teal/5 border p-8"
          >
            <p
              class="font-mono-technical text-mono-technical text-muted-teal mb-3 tracking-widest uppercase"
            >
              Transmission received
            </p>
            <h3 class="font-headline-lg text-on-surface mb-4 text-2xl font-medium">Thank you.</h3>
            <p class="font-body-md text-body-md text-on-surface-variant mb-6">
              Your inquiry reached East End Systems. We’ll respond from
              <span class="text-on-surface">info@eastendsystems.com</span> shortly.
            </p>
            <button
              type="button"
              class="font-label-caps text-label-caps text-muted-teal hover:text-on-surface uppercase transition-colors"
              @click="status = 'idle'"
            >
              Send another →
            </button>
          </div>

          <!-- Fallback until a Formspree ID is configured. -->
          <div v-else class="pt-2">
            <a
              href="mailto:info@eastendsystems.com"
              class="border-muted-teal font-label-caps text-label-caps text-on-surface hover:bg-muted-teal inline-block border px-8 py-4 uppercase transition-all duration-150 hover:text-white"
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
    class="border-slate-gray bg-surface-container px-margin-mobile py-stack-sm md:px-gutter mx-auto flex w-full flex-col items-center justify-between gap-4 border-t md:flex-row"
  >
    <div class="font-label-caps text-label-caps text-on-surface">East End Systems</div>
    <div class="font-body-sm text-body-sm text-on-surface-variant text-center">
      © 2026 East End Systems. Precision Engineering for Sag Harbor and Beyond.
    </div>
    <div class="font-body-sm text-body-sm flex gap-6">
      <a
        class="text-on-surface-variant hover:text-muted-teal transition-colors duration-150"
        href="https://github.com/notTag"
        target="_blank"
        rel="noopener"
        >Github</a
      >
    </div>
  </footer>
</template>
