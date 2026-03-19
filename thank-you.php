<?php
$page = [
    'id' => 'thank-you',
    'title' => 'Thank You | Sierra Services',
    'description' => 'Thank you for contacting Sierra Services.',
    'canonical' => 'thank-you',
    'robots' => 'noindex,nofollow',
];

require __DIR__ . '/includes/page-start.php';
?>
<main id="main-content">
  <section class="page-hero">
    <div class="container" data-reveal>
      <p class="section-kicker">Thank You</p>
      <h1 data-thank-you-title>Your enquiry has been received</h1>
      <p data-thank-you-message>Thank you for getting in touch.</p>
    </div>
  </section>

  <section class="section">
    <div class="container thank-you-grid">
      <article class="thank-you-card" data-reveal>
        <h2>What Happens Next</h2>
        <p data-thank-you-detail>I will review the information and follow up with next steps.</p>
        <p>If you would like to add context before we speak, you can send your website, current tools, or the main process you want to improve.</p>
        <div class="cta-panel__actions">
          <a href="mailto:santiago@sierraservices.ch" class="btn btn-primary">Email Additional Details</a>
          <a href="contact" class="btn btn-secondary">Back to Contact</a>
        </div>
      </article>
      <article class="thank-you-card" data-reveal>
        <h2>Helpful to Prepare</h2>
        <ul>
          <li>your website URL and core service offer</li>
          <li>the tools you currently use for leads or operations</li>
          <li>the bottleneck that feels most urgent right now</li>
        </ul>
      </article>
    </div>
  </section>
</main>
<?php require __DIR__ . '/includes/page-end.php'; ?>
