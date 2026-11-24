import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access/roles'
import { revalidateGlobalAfterChange } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    description:
      'School institutional identity, phone numbers, email, physical address, and government board information.',
  },
  access: {
    read: () => true,
    update: isAdmin, // Only Admins can modify legal/institutional site settings
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange('site-settings', '/')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Dr. Netaji Karale Vidyalaya',
      label: 'Official School Name',
    },
    {
      name: 'shortName',
      type: 'text',
      required: true,
      defaultValue: 'DNKV',
      label: 'Short Name / Acronym',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Empowering Students for the Future.',
      label: 'School Motto / Tagline',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'School Crest / Logo',
          admin: {
            description: 'Transparent SVG or high-resolution PNG format.',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Browser Favicon / App Icon',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+91-9545541454',
          label: 'Primary Contact Number',
        },
        {
          name: 'alternatePhone',
          type: 'text',
          label: 'Secondary Contact Number (Optional)',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'dnkvchinchgaon@gmail.com',
          label: 'Official School Email',
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: 'Chinchgaon, Akulgaon, Maharashtra 413208',
      label: 'Campus Physical Address (Legacy Summary)',
    },
    {
      name: 'location',
      type: 'group',
      label: 'Location & Map Details',
      admin: {
        description: 'Structured school address, GPS coordinates, and Google Maps links.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'addressLine1',
              type: 'text',
              required: true,
              defaultValue: 'Dr. Netaji Karale Vidyalaya',
              label: 'Address Line 1',
              admin: {
                description: 'Building, campus, or institution name.',
              },
            },
            {
              name: 'addressLine2',
              type: 'text',
              defaultValue: 'Near Gram Panchayat',
              label: 'Address Line 2',
              admin: {
                description: 'Street name, landmark, or local area.',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'village',
              type: 'text',
              required: true,
              defaultValue: 'Chinchgaon, Akulgaon',
              label: 'Village / Town',
              admin: {
                description: 'Village, town, or locality name.',
              },
            },
            {
              name: 'district',
              type: 'text',
              required: true,
              defaultValue: 'Solapur',
              label: 'District',
              admin: {
                description: 'District name (e.g., Solapur).',
              },
            },
            {
              name: 'state',
              type: 'text',
              required: true,
              defaultValue: 'Maharashtra',
              label: 'State',
              admin: {
                description: 'State name (e.g., Maharashtra).',
              },
            },
            {
              name: 'pincode',
              type: 'text',
              required: true,
              defaultValue: '413208',
              label: 'PIN Code',
              admin: {
                description: '6-digit postal PIN code.',
              },
            },
          ],
        },
        {
          name: 'plusCode',
          type: 'text',
          defaultValue: '4F62+JQG',
          label: 'Google Plus Code (Optional)',
          admin: {
            description: 'Digital location code (e.g., 4F62+JQG Chinchgaon).',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'latitude',
              type: 'number',
              defaultValue: 18.0673,
              label: 'Latitude (Optional)',
              admin: {
                description: 'Geographic latitude coordinate (decimal degrees, e.g., 18.0673).',
              },
            },
            {
              name: 'longitude',
              type: 'number',
              defaultValue: 75.3857,
              label: 'Longitude (Optional)',
              admin: {
                description: 'Geographic longitude coordinate (decimal degrees, e.g., 75.3857).',
              },
            },
          ],
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
          label: 'Google Maps URL (Optional)',
          admin: {
            description:
              'Paste the Share link from Google Maps. If empty, one is built from the coordinates or the address.',
            placeholder: 'https://maps.app.goo.gl/... or https://maps.google.com/...',
          },
          validate: (val: string | null | undefined) => {
            if (!val || typeof val !== 'string' || !val.trim()) return true
            try {
              const url = new URL(val.trim())
              if (url.protocol !== 'https:') {
                return 'Google Maps URL must start with https://'
              }
              const allowedHosts = [
                'google.com',
                'www.google.com',
                'maps.google.com',
                'maps.app.goo.gl',
                'goo.gl',
              ]
              const hostname = url.hostname.toLowerCase()
              if (!allowedHosts.includes(hostname)) {
                return 'Invalid domain. The link host must be google.com, www.google.com, maps.google.com, maps.app.goo.gl, or goo.gl'
              }
              return true
            } catch {
              return 'Please enter a valid URL starting with https://'
            }
          },
        },
        {
          name: 'directionsLabel',
          type: 'text',
          defaultValue: 'Get directions',
          label: 'Directions Link Label',
          admin: {
            description: 'Text shown on the directions link (default: "Get directions").',
          },
        },
      ],
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps Location Link or Embed URL',
      admin: {
        placeholder: 'https://maps.google.com/?q=Chinchgaon+Akulgaon+Maharashtra',
      },
    },
    {
      name: 'officeHours',
      type: 'text',
      localized: true,
      defaultValue: 'Monday – Saturday: 9:00 AM – 4:30 PM (Closed on Sundays & Public Holidays)',
      label: 'Administrative Office Hours',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Official Social Media Profiles',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook Page URL' },
        { name: 'youtube', type: 'text', label: 'YouTube Channel URL' },
        { name: 'instagram', type: 'text', label: 'Instagram Profile URL' },
        { name: 'twitter', type: 'text', label: 'X / Twitter Profile URL' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'parentPortalUrl',
          type: 'text',
          defaultValue: '#portal',
          label: 'Parent Portal Login URL',
          admin: {
            description: 'External link to student management / attendance portal.',
          },
        },
        {
          name: 'feePaymentUrl',
          type: 'text',
          defaultValue: '#fees',
          label: 'Online Fee Payment Portal URL',
          admin: {
            description: 'Direct link to bank payment gateway or fees system.',
          },
        },
      ],
    },
    {
      name: 'institutionalFacts',
      type: 'group',
      label: 'Key School Facts (Subject to School Confirmation)',
      fields: [
        {
          name: 'board',
          type: 'text',
          defaultValue: 'Maharashtra State Board [TODO: Confirm CBSE / State Board]',
          label: 'Affiliation Board',
        },
        {
          name: 'classesOffered',
          type: 'text',
          defaultValue: 'Nursery to Class X [TODO: Confirm Classes]',
          label: 'Classes Range',
        },
        {
          name: 'mediumOfInstruction',
          type: 'text',
          defaultValue: 'Semi-English & Marathi [TODO: Confirm English / Semi-English / Marathi]',
          label: 'Medium of Instruction',
        },
        {
          name: 'approxStudentCount',
          type: 'number',
          defaultValue: 1000,
          label: 'Approximate Students Enrolled',
        },
        {
          name: 'approxStaffCount',
          type: 'number',
          defaultValue: 50,
          label: 'Approximate Faculty & Staff Count',
        },
      ],
    },
  ],
}
