import {
  AdMob,
  AdmobConsentStatus,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob';

async function iniciarAnuncios() {
  try {
    await AdMob.initialize();

    let consentInfo = await AdMob.requestConsentInfo();

    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      consentInfo = await AdMob.showConsentForm();
    }

    if (!consentInfo.canRequestAds) {
      console.log('AdMob: todavía no se pueden solicitar anuncios.');
      return;
    }

    await AdMob.showBanner({
      adId: 'ca-app-pub-8854680295966508/9223012145',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0
    });
  } catch (error) {
    console.error('Error de AdMob:', error);
  }
}

window.addEventListener('DOMContentLoaded', iniciarAnuncios);
