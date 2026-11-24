import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'fromPath',
    defaultColumns: ['fromPath', 'toPath', 'statusCode', 'updatedAt'],
    description:
      '301 permanent redirects for legacy URLs (e.g. /principle_desk, /acadmics, /gallary). Admin only.',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'fromPath',
      type: 'text',
      required: true,
      unique: true,
      label: 'Original / Legacy URL Path',
      admin: {
        placeholder: '/principle_desk',
        description: 'The old URL path to redirect from (must start with /).',
      },
    },
    {
      name: 'toPath',
      type: 'text',
      required: true,
      label: 'New Destination URL Path',
      admin: {
        placeholder: '/about/principals-desk',
        description: 'The correct clean URL path to redirect visitors to.',
      },
    },
    {
      name: 'statusCode',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 - Permanent Redirect (SEO Recommended)', value: '301' },
        { label: '302 - Temporary Redirect', value: '302' },
      ],
      admin: {
        description: 'Use 301 for permanent site migrations so search engines transfer rankings.',
      },
    },
  ],
}
