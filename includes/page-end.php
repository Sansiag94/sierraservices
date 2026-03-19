<?php require __DIR__ . '/footer.php'; ?>
<?php foreach ($page['footer_scripts'] as $script): ?>
  <?php site_render_script_tag($script); ?>
<?php endforeach; ?>
<script src="script.js"></script>
</body>
</html>
