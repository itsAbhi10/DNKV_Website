import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const Facilities: CollectionConfig = {
  slug: 'facilities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
    description:
      'School infrastructure, laboratories, playgrounds, digital classrooms, and libraries.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange('facilities', () => '/facilities')],
    afterDelete: [revalidateCollectionAfterDelete('facilities', () => '/facilities')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Facility Name',
      admin: {
        placeholder: 'e.g., Modern Science Laboratories / Digital Smart Classrooms',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Facility Overview',
      admin: {
        placeholder: 'Detailed description of the equipment, purpose, and student access.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'academic',
      label: 'Facility Category',
      options: [
        { label: 'Academic & Smart Classrooms', value: 'academic' },
        { label: 'Science & Computer Laboratories', value: 'science_tech' },
        { label: 'Library & Reading Room', value: 'library' },
        { label: 'Sports Complex & Playground', value: 'sports' },
        { label: 'Safety, Hygiene & Medical Room', value: 'safety' },
        { label: 'School Transport & Bus Service', value: 'transport' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Facility High-Res Photo',
      admin: {
        description: 'Landscape photo (16:9 ratio recommended).',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Key Feature Points',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
          label: 'Highlight Point',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers display first.',
      },
    },
  ],
}
