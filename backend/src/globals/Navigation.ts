import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access/roles'
import { revalidateGlobalAfterChange } from '../hooks/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    description:
      'Header menus, top utility bar links, dropdown navigation tree, and call-to-action buttons.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange('navigation', '/')],
  },
  fields: [
    {
      name: 'utilityBarLinks',
      type: 'array',
      label: 'Top Utility Bar Quick Links',
      defaultValue: [
        { label: 'Admissions 2026', url: '/admissions/process', icon: 'graduation' },
        { label: 'Parent Login', url: '#parent-portal', icon: 'user' },
        { label: 'Pay Fees', url: '#pay-fees', icon: 'credit-card' },
        { label: 'Contact Us', url: '/contact', icon: 'phone' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
        { name: 'icon', type: 'text' },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'menuItems',
      type: 'array',
      label: 'Primary Navigation Menu',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Menu Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Destination URL (e.g., /about or #)',
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Dropdown Sub-menu Items',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'url', type: 'text', required: true },
            { name: 'description', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'admissionCta',
      type: 'group',
      label: 'Main Header CTA Button',
      fields: [
        { name: 'label', type: 'text', localized: true, defaultValue: 'Apply for Admission' },
        { name: 'url', type: 'text', defaultValue: '/admissions/enquiry' },
      ],
    },
  ],
}
