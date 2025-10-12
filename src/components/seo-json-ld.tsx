export function SEOJsonLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EXO digital studio",
    "url": "https://exo.digital",
    "logo": "https://exo.digital/logo.svg",
    "description": "Creamos productos digitales elegantes y veloces para diferenciar tu marca.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+51925475680",
      "contactType": "customer service",
      "availableLanguage": ["Spanish"]
    },
    "sameAs": [
      "https://www.instagram.com/exo_digitalstudio/",
      "https://www.tiktok.com/@exodigitalstudio",
      "https://www.facebook.com/profile.php?id=61581476738289"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PE"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}