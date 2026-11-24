# Dr. Netaji Karale Vidyalaya (DNKV) — Project Action Plan & Content Verification (TODO)

## School Verification Checklist (Pending Official School Confirmation)

- [ ] **Affiliation Board**: Currently set to `Maharashtra State Board [TODO: Confirm CBSE / State Board]`. Verify if the school has CBSE affiliation or is strictly Maharashtra State Board (SSC).
- [ ] **Classes Offered**: Currently set to `Nursery to Class X [TODO: Confirm Classes]`. Confirm if Class XI-XII (Junior College / HSC) is offered.
- [ ] **Medium of Instruction**: Currently set to `Semi-English & Marathi [TODO: Confirm English / Semi-English / Marathi]`.
- [ ] **Student & Faculty Headcount**: Currently recorded as `approx 1000 students` and `50 staff`. Confirm exact current counts.
- [ ] **Leadership Personnel**:
  - Principal Name & Educational Qualifications
  - Vice Principal Name & Educational Qualifications
  - Sanstha President Name & Message
  - Sanstha Vice President Name & Message
- [ ] **Official Media**:
  - Official high-resolution SVG crest/logo
  - 4 to 6 landscape photographs of DNKV campus for the hero video pipeline
  - Staff portraits
  - Campus laboratory & sports ground photos
- [ ] **Portals & Online Payments**:
  - URL for the School ERP / Parent Attendance Portal
  - URL for the Bank Fee Payment Gateway
- [ ] **Social Links**: Confirm official YouTube, Facebook, and Instagram URLs.

---

## Phase Execution Status

| Phase       | Description                                                                                                                                                                                                                                   | Status        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Phase 0** | Repo structure (decoupled `frontend` and `backend` workspaces), tooling, CI, Next.js 16.x + React 19, Payload CMS 3 installed, PostgreSQL database connection, all 11 collections, 4 globals, roles (Admin/Editor), comprehensive seed script | **COMPLETED** |
| **Phase 1** | Design tokens (Tailwind CSS v4 + Devanagari fonts), utility bar, header navigation, footer, hero video pipeline (/scripts/hero-video with KenBurnsProvider, ManualProvider, HttpProvider), accessible Hero component                          | **COMPLETED** |
| **Phase 2** | Homepage blocks wired to CMS, on-demand revalidation hooks                                                                                                                                                                                    | Next Up       |
| **Phase 3** | Block-based inner pages, Notices, News, Gallery, Staff, Results                                                                                                                                                                               | Queued        |
| **Phase 4** | Enquiry form with Server Actions, Zod, honeypot, rate limiting, Resend email, DPDP compliance, 301 redirects, SEO, a11y & Lighthouse pass                                                                                                     | Queued        |
| **Phase 5** | Plain-language English & Marathi ADMIN_GUIDE.md, deployment guide, backup & restore guide                                                                                                                                                     | Queued        |
