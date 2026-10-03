import {
  AdMob,
  AdmobConsentStatus,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob';

async function iniciarAnuncios() {
  try {
    await AdMob.initialize();

    try {
      let consentInfo = await AdMob.requestConsentInfo();

      if (
        consentInfo.isConsentFormAvailable &&
        consentInfo.status === AdmobConsentStatus.REQUIRED
      ) {
        await AdMob.showConsentForm();
      }
    } catch (error) {
      console.error('Consentimiento AdMob:', error);
    }

    await AdMob.showBanner({
      adId: 'ca-app-pub-8854680295966508/9223012145',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      npa: true
    });

  } catch (error) {
    console.error('Error AdMob:', error);
  }
}

window.addEventListener('DOMContentLoaded', iniciarAnuncios);
