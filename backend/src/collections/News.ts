import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', '_status'],
    description:
      'School news articles, student achievements, event recaps, and stories from campus.',
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
    afterChange: [revalidateCollectionAfterChange('news', () => '/news-and-notices')],
    afterDelete: [revalidateCollectionAfterDelete('news', () => '/news-and-notices')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Article Title',
      admin: {
        placeholder: 'e.g., DNKV Students Excel at District Level Science Exhibition',
        description: 'Compelling headline displayed on the homepage news carousel and inner pages.',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Publish Date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'academics',
      label: 'Article Category',
      options: [
        { label: 'Academic Highlights', value: 'academics' },
        { label: 'Sports & Athletics', value: 'sports' },
        { label: 'Cultural & Arts', value: 'cultural' },
        { label: 'Awards & Achievements', value: 'achievements' },
        { label: 'Community & Environment', value: 'community' },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Photo',
      admin: {
        description: 'Landscape photo (16:9 ratio, min 1200x675 px recommended).',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Short Summary',
      admin: {
        description: '1-2 sentence preview shown on homepage cards and search results.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Full Article Story',
      admin: {
        description: 'Full write-up detailing the event or achievement.',
      },
    },
  ],
}
