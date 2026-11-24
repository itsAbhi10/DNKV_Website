import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access/roles'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'parentName',
      'mobile',
      'purpose',
      'classApplyingFor',
      'status',
      'createdAt',
    ],
    description:
      'Admissions and general contact inquiries submitted via the website enquiry form. Read-only for editors; admins can archive.',
  },
  access: {
    read: isAdminOrEditor,
    create: () => true, // Allows public form submission via Server Action
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Student / Enquirer Name',
      admin: { readOnly: true },
    },
    {
      name: 'parentName',
      type: 'text',
      required: true,
      label: 'Parent / Guardian Name',
      admin: { readOnly: true },
    },
    {
      name: 'mobile',
      type: 'text',
      required: true,
      label: 'Mobile Number',
      admin: { readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address (Optional)',
      admin: { readOnly: true },
    },
    {
      name: 'classApplyingFor',
      type: 'select',
      label: 'Class Applying For',
      admin: { readOnly: true },
      options: [
        'Nursery',
        'LKG',
        'UKG',
        'Class 1',
        'Class 2',
        'Class 3',
        'Class 4',
        'Class 5',
        'Class 6',
        'Class 7',
        'Class 8',
        'Class 9',
        'Class 10',
        'General Inquiry (Not class specific)',
      ],
    },
    {
      name: 'purpose',
      type: 'select',
      required: true,
      defaultValue: 'admission',
      label: 'Purpose of Enquiry',
      admin: { readOnly: true },
      options: [
        { label: 'Admission Enquiry', value: 'admission' },
        { label: 'General / Administrative Enquiry', value: 'general' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
      admin: { readOnly: true },
    },
    {
      name: 'consentGiven',
      type: 'checkbox',
      required: true,
      label: 'Parental Consent Given (DPDP Act Compliance)',
      admin: {
        readOnly: true,
        description:
          'Verified that applicant agreed to school communication under India DPDP Rules.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Application Status',
      options: [
        { label: 'New / Unreviewed', value: 'new' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Contacted Parent', value: 'contacted' },
        { label: 'Admitted / Resolved', value: 'admitted' },
        { label: 'Closed / Not Interested', value: 'closed' },
      ],
      admin: {
        description: 'Update the follow-up progress for this inquiry.',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Office Follow-up Notes (Internal Only)',
      admin: {
        description:
          'Staff notes regarding phone calls, document verification, or admission status.',
      },
    },
  ],
}
