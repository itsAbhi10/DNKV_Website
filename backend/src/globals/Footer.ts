import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { revalidateGlobalAfterChange } from '../hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    description: 'Footer portal links, legal notices, address summary, and copyright text.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange('footer', '/')],
  },
  fields: [
    {
      name: 'aboutText',
      type: 'textarea',
      localized: true,
      label: 'Short About Blurb (Footer Column 1)',
      defaultValue:
        'Dr. Netaji Karale Vidyalaya, Chinchgaon, is committed to holistic, value-based rural education empowering young minds with modern curriculum and character building.',
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Explore DNKV Links',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'academicLinks',
      type: 'array',
      label: 'Academics & Life Links',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'portalLinks',
      type: 'array',
      label: 'Portals & Services',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal & Policy Links',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      defaultValue: '© 2026 Dr. Netaji Karale Vidyalaya, Chinchgaon. All rights reserved.',
      label: 'Copyright Notice',
    },
    {
      name: 'complianceText',
      type: 'text',
      localized: true,
      defaultValue:
        'Compliant with India DPDP Act 2023. Student records published strictly with parental consent.',
      label: 'DPDP Privacy Note',
    },
  ],
}
