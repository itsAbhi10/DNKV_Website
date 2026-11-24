import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Notices } from './collections/Notices'
import { News } from './collections/News'
import { GalleryAlbums } from './collections/GalleryAlbums'
import { Staff } from './collections/Staff'
import { Facilities } from './collections/Facilities'
import { Results } from './collections/Results'
import { Enquiries } from './collections/Enquiries'
import { Redirects } from './collections/Redirects'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const plugins = []

// Configure Object Storage (AWS S3, Cloudflare R2, or Vercel Blob)
if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  )
} else if (process.env.S3_ENABLED === 'true' && process.env.S3_ACCESS_KEY_ID) {
  plugins.push(
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || 'dnkv-media',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— DNKV Admin Panel',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
    components: {},
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
        if (collectionConfig?.slug === 'pages') {
          return `${frontendUrl}/${data.slug === 'home' ? '' : data.slug}`
        }
        return frontendUrl
      },
      collections: ['pages', 'news', 'notices'],
    },
  },
  collections: [
    Pages,
    Notices,
    News,
    GalleryAlbums,
    Staff,
    Facilities,
    Results,
    Enquiries,
    Redirects,
    Media,
    Users,
  ],
  globals: [SiteSettings, Navigation, Footer, Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dnkv-super-secret-key-at-least-32-characters-long-2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres@localhost:5433/dnkv',
    },
  }),
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'मराठी (Marathi)',
        code: 'mr',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  sharp,
  plugins,
})
