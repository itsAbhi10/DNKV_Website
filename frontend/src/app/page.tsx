import React from 'react'
import { Hero } from '../components/Hero'
import { StageCards } from '../components/StageCards'
import { PrincipalWelcome } from '../components/PrincipalWelcome'
import { WhyDnkv } from '../components/WhyDnkv'
import { CampusVideoTour } from '../components/CampusVideoTour'
import { NoticesAndNews } from '../components/NoticesAndNews'
import { FacilitiesStrip } from '../components/FacilitiesStrip'
import { ResultsHighlight } from '../components/ResultsHighlight'
import { GalleryPreview } from '../components/GalleryPreview'
import { EnquiryTeaser } from '../components/EnquiryTeaser'
import {
  fetchCmsGlobal,
  fetchCmsCollection,
  defaultHomepage,
  fallbackNotices,
  fallbackNews,
  fallbackFacilities,
  fallbackResults,
  type HomepageGlobal,
  type Notice,
  type NewsItem,
  type Facility,
  type ResultDoc,
} from '../lib/cms'

export default async function HomePage() {
  // Fetch homepage global and collections concurrently
  const [homepageRes, noticesRes, newsRes, facilitiesRes, resultsRes] = await Promise.all([
    fetchCmsGlobal<HomepageGlobal>('homepage'),
    fetchCmsCollection<Notice>('notices', { limit: '4', sort: '-date' }),
    fetchCmsCollection<NewsItem>('news', { limit: '2', sort: '-date' }),
    fetchCmsCollection<Facility>('facilities', { limit: '3', sort: 'order' }),
    fetchCmsCollection<ResultDoc>('results', { limit: '1', sort: '-academicYear' }),
  ])

  const homepage = homepageRes || defaultHomepage
  const hero = homepage.hero || defaultHomepage.hero
  const vis = homepage.sectionVisibility || defaultHomepage.sectionVisibility

  const notices = noticesRes.docs.length > 0 ? noticesRes.docs : fallbackNotices
  const news = newsRes.docs.length > 0 ? newsRes.docs : fallbackNews
  const facilities = facilitiesRes.docs.length > 0 ? facilitiesRes.docs : fallbackFacilities
  const results = resultsRes.docs.length > 0 ? resultsRes.docs[0] : fallbackResults

  // Extract video and poster URLs
  const desktopVideo =
    typeof hero.videoDesktop === 'object' && hero.videoDesktop?.url
      ? hero.videoDesktop.url
      : '/media/hero-1080.mp4'

  const mobileVideo =
    typeof hero.videoMobile === 'object' && hero.videoMobile?.url
      ? hero.videoMobile.url
      : '/media/hero-720.mp4'

  const poster =
    typeof hero.posterImage === 'object' && hero.posterImage?.url
      ? hero.posterImage.url
      : '/media/hero-poster.jpg'

  return (
    <>
      {/* 1. Hero Full-width Video Section */}
      {vis.showHero && (
        <Hero
          headline={hero.headline}
          subheadline={hero.subheadline}
          videoDesktopUrl={desktopVideo}
          videoMobileUrl={mobileVideo}
          posterUrl={poster}
          primaryButton={hero.primaryButton}
          secondaryButton={hero.secondaryButton}
        />
      )}

      {/* 2. Academic Stage Cards */}
      {vis.showStageCards && (
        <StageCards
          title={homepage.stageCards?.sectionTitle}
          subtitle={homepage.stageCards?.sectionSubtitle}
          stages={homepage.stageCards?.stages}
        />
      )}

      {/* 3. Welcome from the Principal's Desk */}
      {vis.showPrincipalWelcome && (
        <PrincipalWelcome
          heading={homepage.principalWelcome?.heading}
          principalName={homepage.principalWelcome?.principalName}
          principalDesignation={homepage.principalWelcome?.principalDesignation}
          message={homepage.principalWelcome?.message}
          readMoreLink={homepage.principalWelcome?.readMoreLink}
        />
      )}

      {/* 4. Why DNKV Chinchgaon */}
      {vis.showWhyDnkv && (
        <WhyDnkv
          heading={homepage.whyDnkv?.heading}
          subheading={homepage.whyDnkv?.subheading}
          pillars={homepage.whyDnkv?.pillars}
        />
      )}

      {/* 5. Virtual Campus Demo Video Tour */}
      <CampusVideoTour />

      {/* 6. Notices and Latest News */}
      {vis.showNoticesAndNews && <NoticesAndNews notices={notices} news={news} />}

      {/* 7. Campus Infrastructure Facilities */}
      {vis.showFacilitiesStrip && <FacilitiesStrip facilities={facilities} />}

      {/* 8. Board Examination Results & Stats */}
      {vis.showResults && (
        <ResultsHighlight stats={homepage.resultsBlock?.stats} results={results} />
      )}

      {/* 9. Campus Life Photo Gallery Preview */}
      {vis.showGalleryPreview && <GalleryPreview />}

      {/* 10. Admissions Call to Action */}
      {vis.showEnquiryForm && <EnquiryTeaser />}
    </>
  )
}
