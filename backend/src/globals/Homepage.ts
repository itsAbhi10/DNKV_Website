import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { revalidateGlobalAfterChange } from '../hooks/revalidate'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    description:
      'Dynamic homepage content: hero video and poster, headline, announcement strip, stage cards, principal welcome, why DNKV, results, and section toggles.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange('homepage', '/')],
  },
  fields: [
    {
      name: 'announcementStrip',
      type: 'group',
      label: '1. Top Announcement Strip',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Announcement Banner',
        },
        {
          name: 'text',
          type: 'text',
          localized: true,
          label: 'Banner Text',
          admin: {
            placeholder:
              'Admissions open for Academic Year 2026-27 (Nursery to Class X) - Apply today',
          },
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Banner Link URL',
          defaultValue: '/admissions/enquiry',
        },
        {
          name: 'linkLabel',
          type: 'text',
          localized: true,
          label: 'Banner Button Label',
          defaultValue: 'Enquire Now',
        },
        { name: 'startDate', type: 'date', label: 'Display Start Date' },
        { name: 'endDate', type: 'date', label: 'Display End Date (Auto-hides after)' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      label: '2. Hero Video & Banner Section',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Excellence in Education, Rooted in Values',
          label: 'Hero Main Headline',
        },
        {
          name: 'subheadline',
          type: 'textarea',
          required: true,
          localized: true,
          defaultValue:
            'Empowering Students for the Future. Providing holistic, modern learning from Nursery through Class X in Chinchgaon, Akulgaon.',
          label: 'Hero Sub-headline',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'videoDesktop',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Video - Desktop (1080p MP4/WebM, under 6 MB)',
              admin: {
                description: 'Landscape cinematic video loop. Silent, 15-20s duration.',
              },
            },
            {
              name: 'videoMobile',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Video - Mobile (720p MP4, under 3 MB)',
              admin: {
                description: 'Optimized lower-bitrate stream for 4G mobile devices.',
              },
            },
            {
              name: 'posterImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Poster Image (Fallback & Reduced Motion)',
              admin: {
                description:
                  'Displays immediately before video loads, or when user has Save-Data or Reduced-Motion enabled.',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'primaryButton',
              type: 'group',
              label: 'Primary Action Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Apply for Admission',
                },
                { name: 'url', type: 'text', defaultValue: '/admissions/process' },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              label: 'Secondary Action Button',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Explore Campus Life',
                },
                { name: 'url', type: 'text', defaultValue: '/about/school-story' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'stageCards',
      type: 'group',
      label: '3. Educational Stage Cards',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Stage Cards Section',
        },
        {
          name: 'sectionTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Our Academic Stages',
        },
        {
          name: 'sectionSubtitle',
          type: 'text',
          localized: true,
          defaultValue: 'A progressive learning path from early foundation to board excellence',
        },
        {
          name: 'stages',
          type: 'array',
          label: 'Stages',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'grades',
              type: 'text',
              required: true,
              label: 'Class Range (e.g. Nursery - UKG)',
            },
            { name: 'description', type: 'textarea', required: true, localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'linkUrl', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'principalWelcome',
      type: 'group',
      label: '4. Principal’s Welcome Message',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show Principal Welcome' },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          defaultValue: "Welcome from the Principal's Desk",
        },
        {
          name: 'principalName',
          type: 'text',
          localized: true,
          defaultValue: 'Shri. [Principal Name - TODO: Confirm]',
        },
        {
          name: 'principalDesignation',
          type: 'text',
          localized: true,
          defaultValue: 'Principal, Dr. Netaji Karale Vidyalaya',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          label: 'Welcome Statement',
          defaultValue:
            'At Dr. Netaji Karale Vidyalaya, we believe that education is not merely the accumulation of facts, but the formation of character and empowerment of future leaders.',
        },
        { name: 'photo', type: 'upload', relationTo: 'media', label: 'Principal Photograph' },
        { name: 'readMoreLink', type: 'text', defaultValue: '/about/principals-desk' },
      ],
    },
    {
      name: 'whyDnkv',
      type: 'group',
      label: '5. Why Choose DNKV',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show Why DNKV Section' },
        { name: 'heading', type: 'text', localized: true, defaultValue: 'Why Choose DNKV?' },
        {
          name: 'subheading',
          type: 'text',
          localized: true,
          defaultValue:
            'Distinct advantages that prepare every student for academic and life success',
        },
        {
          name: 'pillars',
          type: 'array',
          label: 'Key Pillars / Features (3 to 4 items)',
          minRows: 3,
          maxRows: 4,
          fields: [
            {
              name: 'icon',
              type: 'text',
              label: 'Icon identifier (e.g., book-open, award, users, shield)',
            },
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'textarea', required: true, localized: true },
          ],
        },
      ],
    },
    {
      name: 'resultsBlock',
      type: 'group',
      label: '6. Results & Achievements Highlight',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show Results Highlight' },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          defaultValue: 'Proven Track Record of Excellence',
        },
        {
          name: 'subheading',
          type: 'text',
          localized: true,
          defaultValue:
            'Our students consistently achieve stellar milestones in board examinations',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Key Metric Callouts',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Stat Value (e.g. 100%, 1000+, 25+)',
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: 'Stat Label (e.g. SSC Pass Rate, Students, Expert Teachers)',
            },
          ],
        },
      ],
    },
    {
      name: 'sectionVisibility',
      type: 'group',
      label: 'Section Toggles & Order Controls',
      fields: [
        { name: 'showAnnouncementStrip', type: 'checkbox', defaultValue: true },
        { name: 'showHero', type: 'checkbox', defaultValue: true },
        { name: 'showStageCards', type: 'checkbox', defaultValue: true },
        { name: 'showPrincipalWelcome', type: 'checkbox', defaultValue: true },
        { name: 'showWhyDnkv', type: 'checkbox', defaultValue: true },
        { name: 'showNoticesAndNews', type: 'checkbox', defaultValue: true },
        { name: 'showFacilitiesStrip', type: 'checkbox', defaultValue: true },
        { name: 'showResults', type: 'checkbox', defaultValue: true },
        { name: 'showGalleryPreview', type: 'checkbox', defaultValue: true },
        { name: 'showEnquiryForm', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
