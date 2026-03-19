<?php
$page = [
    'id' => 'about',
    'title' => 'About Santiago Sierra | Sierra Services',
    'description' => 'Meet Santiago Sierra, Zurich-based consultant helping service businesses create clearer websites, CRM systems, and operational workflows.',
    'canonical' => 'about',
    'og_type' => 'profile',
    'og_title' => 'About Santiago Sierra | Sierra Services',
    'og_description' => 'Meet Santiago Sierra, Zurich-based consultant helping service businesses create clearer websites, CRM systems, and operational workflows.',
    'structured_data' => <<<'JSON'
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Santiago Sierra",
  "url": "https://sierraservices.ch/about",
  "jobTitle": "Operational Systems Consultant",
  "worksFor": {
    "@type": "ProfessionalService",
    "name": "Sierra Services",
    "url": "https://sierraservices.ch/"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Zurich",
    "addressCountry": "CH"
  },
  "email": "santiago@sierraservices.ch",
  "telephone": "+41 76 231 02 35",
  "knowsLanguage": [
    "English",
    "Spanish",
    "German"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Hochschule Luzern"
  }
}
JSON,
    'show_whatsapp' => true,
];

require __DIR__ . '/includes/page-start.php';
?>
<main id="main-content">
  <section class="page-hero">
    <div class="container" data-reveal>
      <p class="section-kicker">About</p>
      <h1>A practical, structured approach to improving service businesses</h1>
      <p>Sierra Services is led by Santiago Sierra in Zurich. I work with businesses that need clearer systems behind the way they present themselves, manage opportunities, and run the day-to-day operation.</p>
    </div>
  </section>

  <section class="section">
    <div class="container about-intro">
      <article class="about-copy" data-reveal>
        <p>I am based in Zurich and hold a Master&apos;s degree in Business Administration from Hochschule Luzern. My background spans operations management, digital systems, marketing, and business development.</p>
        <p>Most of my work begins when a service business has grown to the point where the structure behind it needs to catch up. The website may no longer support the service offer clearly, the CRM may be underused, or important internal processes may still depend too heavily on memory and informal habits.</p>
        <p>I focus on making those areas clearer and easier to run. That can mean improving website structure and messaging, organising a CRM pipeline, documenting workflows, or making reporting more useful for day-to-day decisions.</p>
        <p>The approach is practical and direct. I prefer clear priorities, realistic scope, and systems that are designed to be used after the project is finished.</p>
      </article>
      <aside class="about-photo-wrap" data-reveal aria-label="Professional portrait">
        <img src="portrait-about.jpg" alt="Professional portrait of Santiago Sierra" class="about-photo" width="960" height="1200" loading="lazy" decoding="async">
      </aside>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container split-section">
      <div class="split-copy" data-reveal>
        <p class="section-kicker">How I Work</p>
        <h2>The focus is clarity, not unnecessary complexity</h2>
        <p>I am usually brought in to make a business easier to run, not to create a larger project than it needs. That means keeping the work grounded in what is useful, realistic, and maintainable.</p>
      </div>
      <div class="approach-list">
        <article class="approach-item" data-reveal>
          <p class="approach-step">Practical</p>
          <div>
            <h3>Useful before impressive</h3>
            <p>I prioritise changes that improve everyday execution, lead handling, and operational visibility rather than adding unnecessary complexity.</p>
          </div>
        </article>
        <article class="approach-item" data-reveal>
          <p class="approach-step">Clear</p>
          <div>
            <h3>Structure people can actually use</h3>
            <p>The systems and documentation need to make sense in daily work, otherwise they quickly become shelf material.</p>
          </div>
        </article>
        <article class="approach-item" data-reveal>
          <p class="approach-step">Direct</p>
          <div>
            <h3>Straightforward communication</h3>
            <p>I work in a direct, businesslike way and focus on clarifying priorities early so the project stays grounded and useful.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container note-columns">
      <div data-reveal>
        <p class="section-kicker">Clients Usually Come To Me For</p>
        <h2>Typical starting points</h2>
        <ul class="simple-list">
          <li>a website that needs clearer messaging or a stronger enquiry path</li>
          <li>a CRM that exists but is not being used consistently</li>
          <li>internal workflows that are unclear or difficult to hand over</li>
          <li>reporting that does not yet support confident decision-making</li>
        </ul>
      </div>
      <div data-reveal>
        <p class="section-kicker">What To Expect</p>
        <h2>Working relationship</h2>
        <ul class="simple-list">
          <li>clear communication and realistic recommendations</li>
          <li>a structured scope based on current priorities</li>
          <li>practical implementation rather than abstract strategy alone</li>
          <li>documentation that helps the business carry the work forward</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <div class="cta-block" data-reveal>
        <p class="section-kicker">Contact</p>
        <h2>Discuss your project or ask about availability</h2>
        <p>If you would like to talk through your current setup and whether I would be a good fit, get in touch.</p>
        <div class="cta-actions">
          <a href="contact" class="btn btn-primary">Discuss your project</a>
          <a href="<?= site_escape($site['whatsapp_url']); ?>" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Send WhatsApp Message</a>
        </div>
      </div>
    </div>
  </section>
</main>
<?php require __DIR__ . '/includes/page-end.php'; ?>
