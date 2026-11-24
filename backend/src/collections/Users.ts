import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes lockout after 5 failed attempts
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
    description: 'System administrators and content editors for Dr. Netaji Karale Vidyalaya.',
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        placeholder: 'e.g., Shri. Netaji Karale',
        description: 'Staff member name used in audit trails and system logs.',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin (Full access to all settings, users, redirects and content)',
          value: 'admin',
        },
        { label: 'Editor (Content editing only: news, notices, gallery, pages)', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: {
        description:
          'Admins have complete control. Editors can only create and publish educational content.',
      },
    },
  ],
}
