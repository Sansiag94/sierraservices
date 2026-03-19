<?php
$page = [
    'id' => 'contact',
    'title' => 'Book a Conversation | Sierra Services',
    'description' => 'Book a consultation with Santiago Sierra to bring more structure to your website, CRM, and internal operations.',
    'canonical' => 'contact',
    'og_title' => 'Book a Conversation | Sierra Services',
    'og_description' => 'Get in touch with Sierra Services to discuss website structure, CRM setup, and operational systems for your business.',
    'structured_data' => <<<'JSON'
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Sierra Services",
  "url": "https://sierraservices.ch/contact",
  "description": "Contact Sierra Services to discuss website structure, CRM implementation, and operational systems.",
  "about": {
    "@type": "ProfessionalService",
    "name": "Sierra Services",
    "url": "https://sierraservices.ch/"
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
      <p class="section-kicker">Contact</p>
      <h1>Book a Conversation</h1>
      <p>If your business is growing but the systems behind it feel disorganized, we can review where the friction is coming from and what to fix first.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <article class="contact-card" data-reveal>
        <h2>Send Me Your Context</h2>
        <p>I review enquiries personally and usually reply within two business days with practical next steps.</p>
        <p class="contact-note">If your request is urgent, mention that in your message or send a WhatsApp message as well.</p>
        <form class="contact-form" action="https://formspree.io/f/mjkryqje" method="POST" accept-charset="UTF-8" data-formspree-form>
          <div class="field">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" autocomplete="tel">
          </div>
          <div class="field">
            <label for="company">Company</label>
            <input type="text" id="company" name="company" autocomplete="organization">
          </div>
          <div class="field field-full">
            <label for="website">Website</label>
            <input type="url" id="website" name="website" inputmode="url" placeholder="https://">
          </div>
          <div class="field field-full">
            <label for="challenge">What challenge are you currently facing?</label>
            <textarea id="challenge" name="challenge" rows="5" required></textarea>
          </div>
          <div class="field field-full">
            <label for="preferred-contact">Preferred contact method</label>
            <select id="preferred-contact" name="preferred_contact" required>
              <option value="">Select one</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary field-full">Send Message</button>
          <p class="form-status field-full" data-form-status aria-live="polite" role="status"></p>
          <p class="contact-note field-full">By sending this form, you agree that I may use your details to reply to your enquiry.</p>
          <a href="<?= site_escape($site['whatsapp_url']); ?>" class="btn btn-secondary field-full" target="_blank" rel="noopener noreferrer">Send WhatsApp Message</a>
        </form>
      </article>

      <aside class="contact-card calendly-box" data-reveal>
        <h2>Book Directly in My Calendar</h2>
        <p class="contact-note">Choose a time that works for you. The booking calendar loads only when you request it, and after booking you will be taken to a confirmation page on this site with the next steps.</p>
        <div class="calendly-shell" data-calendly-shell data-url="https://calendly.com/sierra-services/20min">
          <button type="button" class="btn btn-primary calendly-load-button" data-calendly-load>Load booking calendar</button>
          <p class="calendly-status" data-calendly-status aria-live="polite">The calendar is available on demand to keep this page lighter.</p>
          <div class="calendly-inline-host" data-calendly-inline></div>
          <noscript>
            <p class="contact-note">JavaScript is required to load the embedded calendar. You can still book directly on <a href="https://calendly.com/sierra-services/20min" target="_blank" rel="noopener noreferrer">Calendly</a>.</p>
          </noscript>
        </div>
        <p class="contact-note calendly-note">If no suitable time appears, email me directly at <a href="mailto:santiago@sierraservices.ch">santiago@sierraservices.ch</a>.</p>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="section-kicker">Next Step</p>
        <h2>What Happens After You Reach Out</h2>
      </div>
      <div class="process-grid">
        <article class="process-card" data-reveal>
          <span class="process-step">1</span>
          <h3>I Review the Situation</h3>
          <p>I look at the context you provide and identify the area where better structure would have the most immediate value.</p>
        </article>
        <article class="process-card" data-reveal>
          <span class="process-step">2</span>
          <h3>We Clarify Priorities</h3>
          <p>During the first conversation, we define the bottlenecks, current tools, and the most sensible starting point.</p>
        </article>
        <article class="process-card" data-reveal>
          <span class="process-step">3</span>
          <h3>You Leave With Direction</h3>
          <p>Even if we do not start a project immediately, the goal is that you leave the discussion with clearer priorities and next actions.</p>
        </article>
      </div>
    </div>
  </section>
</main>
<?php require __DIR__ . '/includes/page-end.php'; ?>
