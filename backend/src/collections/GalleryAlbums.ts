import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const GalleryAlbums: CollectionConfig = {
  slug: 'gallery-albums',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'eventDate', 'updatedAt'],
    description:
      'Photo albums from campus life, annual functions, sports day, and student exhibitions.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange('gallery', () => '/gallery')],
    afterDelete: [revalidateCollectionAfterDelete('gallery', () => '/gallery')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Album Title',
      admin: {
        placeholder: 'e.g., Annual Cultural Gathering 2026',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Album Description',
      admin: {
        placeholder: 'Brief background context on this event or ceremony.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Album Cover Photo',
      admin: {
        description: 'Selected highlight photo representing this album.',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      label: 'Date of Event',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'celebrations',
      options: [
        { label: 'Campus & Architecture', value: 'campus' },
        { label: 'Sports & Athletics', value: 'sports' },
        { label: 'Arts & Culture', value: 'arts' },
        { label: 'School Celebrations & Festivals', value: 'celebrations' },
        { label: 'Academic & Labs', value: 'academic' },
      ],
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Album Photos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Photo',
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          label: 'Photo Caption',
        },
      ],
    },
  ],
}
