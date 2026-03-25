'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/nery-silva',
    },
  ]

  return (
    <footer
      className="border-t border-white/10 bg-black/80 backdrop-blur-sm"
      aria-label="Site footer"
    >
      <div className="max-w-4xl mx-auto py-12 px-6 text-center space-y-6">

        {/* Creator + year */}
        <div className="space-y-3">
          <p className="text-white font-medium tracking-wide">
            Nery
            <span className="text-gray-500 font-normal"> · {new Date().getFullYear()}</span>
          </p>

          {/* Email */}
          <a
            href="mailto:guilherme.rp93@hotmail.com"
            className="block text-gray-400 hover:text-white transition-colors hover:underline underline-offset-2"
            aria-label="Send email to Nery"
          >
            guilherme.rp93@hotmail.com
          </a>

          {/* Social links */}
          <nav aria-label="Social links" className="flex items-center justify-center gap-2 text-gray-400">
            {socialLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-gray-600">·</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline underline-offset-2"
                  aria-label={`${link.label} profile`}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06]" />

        {/* Memorial phrase + credits */}
        <div className="space-y-3">
          <p className="text-gray-500 italic text-sm tracking-widest">
            {t('neverForget')}
          </p>
          <p className="text-gray-600 text-xs leading-relaxed">
            {t('credits')}
          </p>
        </div>

      </div>
    </footer>
  )
}
