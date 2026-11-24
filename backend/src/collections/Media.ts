import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description:
      'School photos, document PDFs, and video assets. Alt text is mandatory for accessibility (WCAG 2.2 AA).',
  },
  access: {
    read: () => true, // Publicly readable
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'public/media'),
    focalPoint: true,
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/svg+xml',
      'application/pdf',
      'video/mp4',
      'video/webm',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'wide',
        width: 1200,
        height: 675,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: 'Alternative Text (Screen Readers & SEO)',
      admin: {
        description:
          'Plain English / Marathi description of what is in this image. Required for screen readers (e.g., "Students participating in annual science exhibition").',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      label: 'Visible Caption (Optional)',
      admin: {
        description: 'Short caption shown below the photo in galleries and articles.',
      },
    },
  ],
}
