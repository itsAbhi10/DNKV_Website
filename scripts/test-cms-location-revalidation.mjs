/**
 * Test script to verify changing location in Payload CMS and reverting it.
 */
async function testCmsLocationUpdate() {
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

  console.log('1. Logging in as admin...')
  const loginRes = await fetch(`${BACKEND_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@dnkv.in',
      password: 'Admin@DNKV2026!',
    }),
  })
  const loginData = await loginRes.json()
  if (!loginData.token) {
    throw new Error('Login failed: ' + JSON.stringify(loginData))
  }
  const token = loginData.token
  console.log('   Logged in successfully.')

  console.log('2. Fetching current SiteSettings location...')
  const getRes = await fetch(`${BACKEND_URL}/api/globals/site-settings?locale=en`)
  const currentSettings = await getRes.json()
  const originalVillage = currentSettings.location?.village || 'Chinchgaon, Akulgaon'
  console.log('   Original village:', originalVillage)

  console.log('3. Updating location with test village value...')
  const testVillage = 'Chinchgaon, TestAkulgaon'
  const updateRes = await fetch(`${BACKEND_URL}/api/globals/site-settings?locale=en`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      location: {
        ...currentSettings.location,
        village: testVillage,
      },
    }),
  })
  const updateData = await updateRes.json()
  console.log('   Update response village:', updateData.result?.location?.village || updateData.location?.village)

  // Verify updated
  const verifyRes = await fetch(`${BACKEND_URL}/api/globals/site-settings?locale=en`)
  const verifyData = await verifyRes.json()
  console.log('   Verified GET village:', verifyData.location?.village)
  if (verifyData.location?.village !== testVillage) {
    throw new Error(`Expected village to be "${testVillage}", got "${verifyData.location?.village}"`)
  }
  console.log('   ✓ Live backend updated without code change!')

  console.log('4. Reverting village back to original value...')
  const revertRes = await fetch(`${BACKEND_URL}/api/globals/site-settings?locale=en`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      location: {
        ...currentSettings.location,
        village: originalVillage,
      },
    }),
  })
  const revertData = await revertRes.json()
  console.log('   Reverted village:', revertData.result?.location?.village || revertData.location?.village)

  // Verify reverted
  const finalRes = await fetch(`${BACKEND_URL}/api/globals/site-settings?locale=en`)
  const finalData = await finalRes.json()
  console.log('   Final GET village:', finalData.location?.village)
  if (finalData.location?.village !== originalVillage) {
    throw new Error(`Expected village to be restored to "${originalVillage}", got "${finalData.location?.village}"`)
  }
  console.log('   ✓ Location cleanly restored!')
}

testCmsLocationUpdate().catch((err) => {
  console.error('Test failed:', err)
  process.exit(1)
})
