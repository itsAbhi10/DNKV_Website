import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'expiryDate', 'isPinned', '_status'],
    description:
      'School circulars, exam dates, fee deadlines, and official announcements. Notices auto-retire past their expiry date.',
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange('notices', () => '/news-and-notices')],
    afterDelete: [revalidateCollectionAfterDelete('notices', () => '/news-and-notices')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Notice Title',
      admin: {
        placeholder: 'e.g., Annual Sports Day 2026 Schedule & Guidelines',
        description: 'Clear, concise headline displayed on the notice board and homepage.',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Notice Issue Date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Publication date shown to parents and students.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'academic',
      label: 'Category',
      options: [
        { label: 'Academic & Curriculum', value: 'academic' },
        { label: 'Admissions 2026-27', value: 'admissions' },
        { label: 'Examinations & Results', value: 'examinations' },
        { label: 'Events & Celebrations', value: 'events' },
        { label: 'Urgent / Alert', value: 'urgent' },
        { label: 'General Announcement', value: 'general' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Attached Document (PDF circular or image notice)',
      admin: {
        description: 'Upload the scanned official letterhead PDF or circular image.',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      label: 'External Link / Form URL (Optional)',
      admin: {
        placeholder: 'https://...',
        description: 'Link to external government portals, registration forms, or syllabus links.',
      },
    },
    {
      name: 'expiryDate',
      type: 'date',
      label: 'Notice Expiry Date (Optional)',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Notice will automatically be hidden from the active board after this date.',
      },
    },
    {
      name: 'isPinned',
      type: 'checkbox',
      defaultValue: false,
      label: 'Pin to Top of Notice Board',
      admin: {
        description:
          'Pinned notices appear prominently at the top of the homepage and notice board.',
      },
    },
  ],
}
