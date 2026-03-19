<?php

$site = [
    'name' => 'Sierra Services',
    'author' => 'Santiago Sierra',
    'location' => 'Zurich, Switzerland',
    'email' => 'santiago@sierraservices.ch',
    'phone_display' => '+41 76 231 02 35',
    'phone_href' => '+41762310235',
    'whatsapp_url' => 'https://wa.me/41762310235?text=Hello%20Santiago%2C%20I%20would%20like%20to%20discuss%20my%20business%20systems.',
    'domain' => 'https://sierraservices.ch',
    'theme_color' => '#142232',
    'logo_src' => 'logo black.jpg',
    'social_image' => 'social-cover.jpg',
    'social_image_alt' => 'Mountain landscape representing clarity and direction for Sierra Services.',
];

$page = array_merge(
    [
        'id' => '',
        'body_data_page' => '',
        'title' => $site['name'],
        'description' => '',
        'robots' => 'index,follow',
        'canonical' => '/',
        'og_type' => 'website',
        'og_title' => null,
        'og_description' => null,
        'og_image' => $site['social_image'],
        'og_image_alt' => $site['social_image_alt'],
        'twitter_card' => 'summary_large_image',
        'structured_data' => null,
        'preload_images' => [],
        'show_whatsapp' => false,
        'footer_scripts' => [],
    ],
    $page ?? []
);

if ($page['body_data_page'] === '') {
    $page['body_data_page'] = $page['id'];
}

function site_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function site_absolute_url(string $path): string
{
    global $site;

    return rtrim($site['domain'], '/') . '/' . ltrim($path, '/');
}

function site_render_script_tag(array $script): void
{
    $src = $script['src'] ?? '';
    if ($src === '') {
        return;
    }

    $attributes = '';
    foreach (($script['attributes'] ?? []) as $name => $value) {
        if (is_bool($value)) {
            if ($value) {
                $attributes .= ' ' . site_escape((string) $name);
            }
            continue;
        }

        $attributes .= sprintf(
            ' %s="%s"',
            site_escape((string) $name),
            site_escape((string) $value)
        );
    }

    printf(
        "<script src=\"%s\"%s></script>\n",
        site_escape($src),
        $attributes
    );
}
