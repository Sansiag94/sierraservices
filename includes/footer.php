<?php if ($page['show_whatsapp']): ?>
  <a class="whatsapp-float" href="<?= site_escape($site['whatsapp_url']); ?>" target="_blank" rel="noopener noreferrer" aria-label="Send WhatsApp message">
    WhatsApp
  </a>
<?php endif; ?>

<footer class="site-footer">
  <div class="container footer-wrap">
    <p>&copy; <span id="year"></span> <?= site_escape($site['name']); ?></p>
    <a href="mailto:<?= site_escape($site['email']); ?>"><?= site_escape($site['email']); ?></a>
    <a href="tel:<?= site_escape($site['phone_href']); ?>"><?= site_escape($site['phone_display']); ?></a>
    <span><?= site_escape($site['location']); ?></span>
    <a href="privacy">Privacy Policy</a>
    <button type="button" class="footer-link-button" data-open-cookie-settings>Cookie Settings</button>
  </div>
</footer>
