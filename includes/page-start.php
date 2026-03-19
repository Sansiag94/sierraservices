<?php require __DIR__ . '/site.php'; ?>
<!DOCTYPE html>
<html lang="en-CH">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?= site_escape($page['description']); ?>">
  <meta name="author" content="<?= site_escape($site['author']); ?>">
  <meta name="robots" content="<?= site_escape($page['robots']); ?>">
  <meta name="theme-color" content="<?= site_escape($site['theme_color']); ?>">
  <meta property="og:site_name" content="<?= site_escape($site['name']); ?>">
  <meta property="og:type" content="<?= site_escape($page['og_type']); ?>">
  <meta property="og:title" content="<?= site_escape($page['og_title'] ?? $page['title']); ?>">
  <meta property="og:description" content="<?= site_escape($page['og_description'] ?? $page['description']); ?>">
  <meta property="og:url" content="<?= site_escape(site_absolute_url($page['canonical'])); ?>">
  <meta property="og:image" content="<?= site_escape(site_absolute_url($page['og_image'])); ?>">
  <meta property="og:image:alt" content="<?= site_escape($page['og_image_alt']); ?>">
  <meta name="twitter:card" content="<?= site_escape($page['twitter_card']); ?>">
  <meta name="twitter:title" content="<?= site_escape($page['og_title'] ?? $page['title']); ?>">
  <meta name="twitter:description" content="<?= site_escape($page['og_description'] ?? $page['description']); ?>">
  <meta name="twitter:image" content="<?= site_escape(site_absolute_url($page['og_image'])); ?>">
  <title><?= site_escape($page['title']); ?></title>
  <link rel="canonical" href="<?= site_escape(site_absolute_url($page['canonical'])); ?>">
  <?php foreach ($page['preload_images'] as $image): ?>
    <link rel="preload" as="image" href="<?= site_escape($image['href']); ?>"<?php if (!empty($image['imagesizes'])): ?> imagesizes="<?= site_escape($image['imagesizes']); ?>"<?php endif; ?>>
  <?php endforeach; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="<?= site_escape($site['logo_src']); ?>" type="image/jpeg">
  <script>document.documentElement.classList.add("js");</script>
  <?php if ($page['structured_data']): ?>
    <script type="application/ld+json">
<?= $page['structured_data']; ?>
    </script>
  <?php endif; ?>
</head>
<body data-page="<?= site_escape($page['body_data_page']); ?>">
<?php require __DIR__ . '/header.php'; ?>
