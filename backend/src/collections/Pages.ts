import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Dynamic block-based pages (About, Curriculum, Student Life, Admissions, Contact, etc.).',
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
    afterChange: [
      revalidateCollectionAfterChange('pages', (doc) =>
        doc.slug === 'home' ? '/' : `/${doc.slug}`,
      ),
    ],
    afterDelete: [
      revalidateCollectionAfterDelete('pages', (doc) =>
        doc.slug === 'home' ? '/' : `/${doc.slug}`,
      ),
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Page Title',
      admin: {
        placeholder: 'e.g., Curriculum & Academic Approach',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
      admin: {
        placeholder: 'e.g., academics/curriculum or about/principals-desk',
        description:
          'Clean path without leading slash (e.g. "academics" or "about/principals-desk").',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: 'Page Subtitle / Tagline',
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Header Banner Image',
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Content Blocks',
      blocks: [
        {
          slug: 'richText',
          labels: { singular: 'Rich Text Block', plural: 'Rich Text Blocks' },
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              required: true,
            },
          ],
        },
        {
          slug: 'cardGrid',
          labels: { singular: 'Card Grid Block', plural: 'Card Grid Blocks' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
            },
            {
              name: 'cards',
              type: 'array',
              required: true,
              fields: [
                { name: 'icon', type: 'text', label: 'Icon Name or Emoji' },
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'textarea', required: true, localized: true },
                { name: 'linkUrl', type: 'text' },
                { name: 'linkLabel', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          slug: 'imageText',
          labels: { singular: 'Image & Text Split', plural: 'Image & Text Splits' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'content', type: 'richText', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Image on Left', value: 'left' },
                { label: 'Image on Right', value: 'right' },
              ],
            },
          ],
        },
        {
          slug: 'staffGrid',
          labels: { singular: 'Staff / Faculty Showcase', plural: 'Staff Showcases' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            {
              name: 'departmentFilter',
              type: 'select',
              defaultValue: 'all',
              options: [
                { label: 'All Departments', value: 'all' },
                { label: 'Leadership', value: 'leadership' },
                { label: 'Secondary Section', value: 'secondary' },
                { label: 'Primary Section', value: 'primary' },
              ],
            },
          ],
        },
        {
          slug: 'galleryBlock',
          labels: { singular: 'Photo Gallery Preview', plural: 'Gallery Previews' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            {
              name: 'selectedAlbum',
              type: 'relationship',
              relationTo: 'gallery-albums',
            },
          ],
        },
        {
          slug: 'faqBlock',
          labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            {
              name: 'items',
              type: 'array',
              required: true,
              fields: [
                { name: 'question', type: 'text', required: true, localized: true },
                { name: 'answer', type: 'textarea', required: true, localized: true },
              ],
            },
          ],
        },
        {
          slug: 'downloadsBlock',
          labels: { singular: 'Downloads / Circulars List', plural: 'Downloads Lists' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            {
              name: 'files',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'description', type: 'text', localized: true },
                { name: 'file', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          slug: 'formBlock',
          labels: { singular: 'Enquiry / Contact Form Block', plural: 'Form Blocks' },
          fields: [
            {
              name: 'formType',
              type: 'select',
              defaultValue: 'enquiry',
              options: [{ label: 'Admissions Enquiry Form', value: 'enquiry' }],
            },
            { name: 'heading', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
          ],
        },
        {
          slug: 'videoBlock',
          labels: { singular: 'Video Embed / Player Block', plural: 'Video Blocks' },
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'videoFile', type: 'upload', relationTo: 'media' },
            { name: 'youtubeUrl', type: 'text' },
            { name: 'caption', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: 'Meta Title',
          admin: {
            placeholder: 'Dr. Netaji Karale Vidyalaya - ...',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Meta Description',
          admin: {
            placeholder: '150-160 characters describing the page content for search engines.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Social Sharing Image',
        },
      ],
    },
  ],
}
