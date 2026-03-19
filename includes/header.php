<?php
$navItems = [
    ['id' => 'home', 'href' => './', 'label' => 'Home', 'is_cta' => false],
    ['id' => 'services', 'href' => 'services', 'label' => 'Services', 'is_cta' => false],
    ['id' => 'insights', 'href' => 'insights', 'label' => 'Insights', 'is_cta' => false],
    ['id' => 'about', 'href' => 'about', 'label' => 'About', 'is_cta' => false],
    ['id' => 'contact', 'href' => 'contact', 'label' => 'Get in touch', 'is_cta' => true],
];
?>
<a class="skip-link" href="#main-content">Skip to main content</a>
<header class="site-header" id="top">
  <div class="container nav-wrap">
    <a href="./" class="brand" aria-label="<?= site_escape($site['name']); ?> home">
      <img src="<?= site_escape($site['logo_src']); ?>" alt="<?= site_escape($site['name']); ?> logo" class="brand-logo" width="48" height="48" decoding="async">
      <span class="brand-text">
        <strong><?= site_escape($site['name']); ?></strong>
        <small><?= site_escape($site['location']); ?></small>
      </span>
    </a>
    <button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <?php foreach ($navItems as $item): ?>
        <?php
        $isCurrentPage = $page['id'] === $item['id'];
        $classes = [];
        if ($item['is_cta']) {
            $classes[] = 'nav-cta';
        }
        if ($isCurrentPage) {
            $classes[] = 'active';
        }
        ?>
        <a
          href="<?= site_escape($item['href']); ?>"
          data-page="<?= site_escape($item['id']); ?>"
          <?php if ($classes): ?>class="<?= site_escape(implode(' ', $classes)); ?>"<?php endif; ?>
          <?php if ($isCurrentPage): ?>aria-current="page"<?php endif; ?>
        ><?= site_escape($item['label']); ?></a>
      <?php endforeach; ?>
    </nav>
  </div>
</header>
