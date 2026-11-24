import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import {
  revalidateCollectionAfterChange,
  revalidateCollectionAfterDelete,
} from '../hooks/revalidate'

export const Results: CollectionConfig = {
  slug: 'results',
  admin: {
    useAsTitle: 'academicYear',
    defaultColumns: ['academicYear', 'className', 'passPercentage', 'totalStudents', 'updatedAt'],
    description:
      'Academic board exam results and student merit toppers. Privacy note: Parental consent flag is strictly mandatory before displaying student records under India DPDP Act 2023.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange('results', () => '/academics/results')],
    afterDelete: [revalidateCollectionAfterDelete('results', () => '/academics/results')],
  },
  fields: [
    {
      name: 'academicYear',
      type: 'text',
      required: true,
      label: 'Academic Year',
      admin: {
        placeholder: 'e.g., 2024-2025',
      },
    },
    {
      name: 'className',
      type: 'select',
      required: true,
      defaultValue: 'Class X',
      label: 'Class / Examination Level',
      options: [
        { label: 'Class X (SSC / Secondary)', value: 'Class X' },
        { label: 'Class XII (HSC / Higher Secondary)', value: 'Class XII' },
        { label: 'Class VIII (Middle School)', value: 'Class VIII' },
        { label: 'Class V (Primary Scholarship)', value: 'Class V' },
      ],
    },
    {
      name: 'passPercentage',
      type: 'number',
      required: true,
      label: 'Overall Pass Percentage (%)',
      admin: {
        placeholder: 'e.g., 98.5',
      },
    },
    {
      name: 'totalStudents',
      type: 'number',
      label: 'Total Students Appeared',
    },
    {
      name: 'distinctionCount',
      type: 'number',
      label: 'Students Scoring Distinction / Grade A+',
    },
    {
      name: 'toppers',
      type: 'array',
      label: 'Merit List / Toppers',
      fields: [
        {
          name: 'studentName',
          type: 'text',
          required: true,
          label: 'Student Name',
        },
        {
          name: 'percentage',
          type: 'number',
          required: true,
          label: 'Percentage / Marks Obtained (%)',
        },
        {
          name: 'rank',
          type: 'text',
          label: 'Rank / Distinction (e.g., School 1st Rank)',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Student Photograph (Optional)',
        },
        {
          name: 'parentalConsentGiven',
          type: 'checkbox',
          required: true,
          defaultValue: false,
          label: 'Parental Consent Verified (India DPDP Act Compliance)',
          admin: {
            description:
              "MANDATORY: You must obtain and file written parental consent prior to displaying a minor student's name or photo on the public website.",
          },
        },
      ],
    },
  ],
}
