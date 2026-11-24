import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const Staff: CollectionConfig = {
  slug: 'staff',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'department', 'qualification', 'order'],
    description: 'Faculty, school leadership, and administrative staff profiles.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange('staff', () => '/about/leadership')],
    afterDelete: [revalidateCollectionAfterDelete('staff', () => '/about/leadership')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Staff Member Full Name',
      admin: {
        placeholder: 'e.g., Shri. R. B. Karale',
      },
    },
    {
      name: 'designation',
      type: 'text',
      required: true,
      localized: true,
      label: 'Designation / Role',
      admin: {
        placeholder: 'e.g., Principal / Senior Science Teacher',
      },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      defaultValue: 'secondary',
      label: 'Department / Section',
      options: [
        { label: 'School Leadership & Management', value: 'leadership' },
        { label: 'Secondary Section (Classes 8-10)', value: 'secondary' },
        { label: 'Primary Section (Classes 1-7)', value: 'primary' },
        { label: 'Pre-Primary Section (Nursery-UKG)', value: 'pre_primary' },
        { label: 'Sports & Physical Education', value: 'sports' },
        { label: 'Administration & Office Staff', value: 'administrative' },
      ],
    },
    {
      name: 'qualification',
      type: 'text',
      label: 'Educational Qualifications',
      admin: {
        placeholder: 'e.g., M.Sc., B.Ed.',
      },
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Years of Experience',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Staff Photograph',
      admin: {
        description: 'Professional portrait photo (3:4 ratio recommended).',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      label: 'Short Biography / Message',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers display first (e.g. 1 for Principal, 2 for Vice Principal).',
      },
    },
  ],
}
