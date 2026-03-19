<?php
$page = [
    'id' => 'home',
    'title' => 'Sierra Services | Website, CRM & Operational Systems for Service Businesses',
    'description' => 'Sierra Services helps service businesses build clearer websites, CRM pipelines, and internal workflows so growth stays organized.',
    'canonical' => '/',
    'og_title' => 'Sierra Services | Website, CRM & Operational Systems for Service Businesses',
    'og_description' => 'Build a clearer website, CRM, and internal operating system so your service business can grow without unnecessary chaos.',
    'structured_data' => <<<'JSON'
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://sierraservices.ch/#business",
  "name": "Sierra Services",
  "url": "https://sierraservices.ch/",
  "image": "https://sierraservices.ch/social-cover.jpg",
  "description": "Sierra Services helps service businesses build clearer websites, CRM pipelines, and internal workflows so growth stays organized.",
  "founder": {
    "@type": "Person",
    "name": "Santiago Sierra"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Zurich",
    "addressCountry": "CH"
  },
  "telephone": "+41 76 231 02 35",
  "email": "santiago@sierraservices.ch",
  "areaServed": [
    "Switzerland",
    "International"
  ],
  "availableLanguage": [
    "English",
    "Spanish",
    "German"
  ],
  "serviceType": [
    "Website strategy",
    "CRM implementation",
    "Operational workflow design",
    "Reporting and analytics"
  ]
}
JSON,
    'preload_images' => [
        ['href' => 'portrait-home.jpg', 'imagesizes' => '(max-width: 900px) 92vw, 34vw'],
    ],
    'show_whatsapp' => true,
];

require __DIR__ . '/includes/page-start.php';
?>
<main id="main-content">
  <section class="hero-home">
    <div class="container hero-layout">
      <div class="hero-copy" data-reveal>
        <p class="section-kicker">Sierra Services | Zurich</p>
        <h1>Websites, CRM systems, and operational structure for service businesses</h1>
        <p>I help service-based businesses organise how enquiries are generated, how opportunities are followed up, and how internal work is structured so growth feels more controlled.</p>
        <p class="hero-support">Most projects focus on clarifying the website, improving the CRM, and building a more reliable workflow behind day-to-day operations.</p>
        <div class="hero-actions">
          <a href="contact" class="btn btn-primary">Request a consultation</a>
          <a href="<?= site_escape($site['whatsapp_url']); ?>" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Send WhatsApp Message</a>
        </div>
      </div>
      <aside class="hero-portrait-wrap" data-reveal aria-label="Portrait of Santiago Sierra">
        <img src="portrait-home.jpg" alt="Santiago Sierra portrait" class="hero-portrait" width="960" height="1200" fetchpriority="high" decoding="async">
      </aside>
    </div>
    <div class="container" data-reveal>
      <ul class="proof-strip">
        <li>Based in Zurich</li>
        <li>MSc Business Administration</li>
        <li>Operations, CRM, and digital systems</li>
        <li>Projects in Switzerland and internationally</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container split-section">
      <div class="split-copy" data-reveal>
        <p class="section-kicker">Why Clients Get In Touch</p>
        <h2>Most enquiries start when the business has outgrown its current structure</h2>
        <p>The issue is rarely just one tool. More often, the website, CRM, and internal workflow have developed separately and no longer support the business in a clear way.</p>
        <p>The goal of the work is to make those parts more coherent, more usable, and easier to manage.</p>
      </div>
      <ul class="divider-list" data-reveal>
        <li>Leads come in, but follow-up is inconsistent.</li>
        <li>The CRM exists, but pipeline stages or ownership are unclear.</li>
        <li>The website does not clearly support enquiries or credibility.</li>
        <li>Important processes depend too much on memory and improvisation.</li>
        <li>Reporting exists, but it is not helping with day-to-day decisions.</li>
      </ul>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="section-kicker">Core Services</p>
        <h2>Where I usually help</h2>
        <p>I focus on the parts of the business that most directly affect credibility, lead handling, and operational clarity.</p>
      </div>
      <div class="service-list">
        <article class="service-row" data-reveal>
          <div>
            <span class="muted-label">01</span>
            <h3>Website structure and messaging</h3>
          </div>
          <div>
            <p>Clarify the service offer, page structure, and conversion path so the website supports real enquiries instead of only looking presentable.</p>
            <p>Typical focus: homepage structure, service pages, contact flow, and analytics basics.</p>
          </div>
        </article>
        <article class="service-row" data-reveal>
          <div>
            <span class="muted-label">02</span>
            <h3>CRM and lead management</h3>
          </div>
          <div>
            <p>Improve pipeline structure, lifecycle stages, reporting, and follow-up routines so opportunities are tracked more consistently.</p>
            <p>Typical focus: HubSpot setup, stage design, lead handover, and clearer reporting.</p>
          </div>
        </article>
        <article class="service-row" data-reveal>
          <div>
            <span class="muted-label">03</span>
            <h3>Operational workflow and reporting</h3>
          </div>
          <div>
            <p>Organise the internal workflow behind delivery, handovers, and reporting so the business runs with less friction as workload grows.</p>
            <p>Typical focus: process mapping, workflow clarification, dashboards, and documentation.</p>
          </div>
        </article>
      </div>
      <p class="section-cta" data-reveal><a href="services" class="btn btn-secondary">View Services</a></p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="section-kicker">Process</p>
        <h2>A practical way of working</h2>
        <p>I keep projects focused and grounded in what the business actually needs, rather than turning everything into a larger transformation than necessary.</p>
      </div>
      <div class="approach-list">
        <article class="approach-item" data-reveal>
          <p class="approach-step">Review</p>
          <div>
            <h3>Assess the current setup</h3>
            <p>We start by understanding where the process is unclear, where the handovers are weak, and which tools are underperforming.</p>
          </div>
        </article>
        <article class="approach-item" data-reveal>
          <p class="approach-step">Prioritise</p>
          <div>
            <h3>Decide what matters first</h3>
            <p>The first priority is usually the area that most directly affects enquiries, follow-up quality, or operational visibility.</p>
          </div>
        </article>
        <article class="approach-item" data-reveal>
          <p class="approach-step">Implement</p>
          <div>
            <h3>Build a clearer operating structure</h3>
            <p>The result should be easier to use and easier to maintain, with documentation and structure that support the team after the project ends.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container note-columns">
      <div data-reveal>
        <p class="section-kicker">Best Suited For</p>
        <h2>Who this is usually for</h2>
        <ul class="simple-list">
          <li>service businesses that want a clearer digital and operational setup</li>
          <li>founders or small teams who need more structure without extra bureaucracy</li>
          <li>businesses where the website, CRM, and internal workflow no longer feel aligned</li>
          <li>teams that need better follow-up, reporting, or process consistency</li>
        </ul>
      </div>
      <div data-reveal>
        <p class="section-kicker">What Clients Value</p>
        <h2>What the work is meant to create</h2>
        <ul class="simple-list">
          <li>clearer priorities instead of too many parallel improvements</li>
          <li>more consistent handling of enquiries and opportunities</li>
          <li>better visibility into what is working and where the friction is</li>
          <li>systems that feel practical to run once the project is complete</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="section-kicker">Insights</p>
        <h2>Recent topics</h2>
      </div>
      <div class="insight-list-min">
        <article class="insight-link-row" data-reveal>
          <div>
            <h3>Why many small businesses struggle with CRM systems</h3>
            <p>Clear stages, ownership, and habits matter more than the software alone.</p>
          </div>
          <a href="insights#crm-systems" class="text-link">Read article</a>
        </article>
        <article class="insight-link-row" data-reveal>
          <div>
            <h3>When growing service firms need better operational systems</h3>
            <p>Most operational friction comes from unclear processes, scattered information, and weak handovers.</p>
          </div>
          <a href="insights#operational-systems" class="text-link">Read article</a>
        </article>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <div class="cta-block" data-reveal>
        <p class="section-kicker">Next Step</p>
        <h2>Discuss your project</h2>
        <p>If you are reviewing your website, CRM, or internal processes and want a clearer structure, get in touch to discuss the scope and current availability.</p>
        <div class="cta-actions">
          <a href="contact" class="btn btn-primary">Request a consultation</a>
          <a href="<?= site_escape($site['whatsapp_url']); ?>" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Send WhatsApp Message</a>
        </div>
      </div>
    </div>
  </section>
</main>
<?php require __DIR__ . '/includes/page-end.php'; ?>
