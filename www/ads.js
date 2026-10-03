import {
  AdMob,
  AdmobConsentStatus,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents
} from '@capacitor-community/admob';

function mostrarEstado(texto) {
  const zona = document.getElementById('adBottom');
  if (zona) zona.textContent = texto;
}

async function iniciarAnuncios() {
  try {
    await AdMob.addListener(
      BannerAdPluginEvents.Loaded,
      () => mostrarEstado('ANUNCIO CARGADO')
    );

    await AdMob.addListener(
      BannerAdPluginEvents.FailedToLoad,
      (error) => mostrarEstado(
        'ERROR ADMOB: ' +
        (error?.code ?? '') + ' ' +
        (error?.message ?? JSON.stringify(error))
      )
    );

    await AdMob.initialize();

    let consentInfo = await AdMob.requestConsentInfo();

    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      consentInfo = await AdMob.showConsentForm();
    }

    if (!consentInfo.canRequestAds) {
      mostrarEstado('ADMOB BLOQUEADO POR CONSENTIMIENTO');
      return;
    }

    mostrarEstado('SOLICITANDO ANUNCIO...');

    await AdMob.showBanner({
      adId: 'ca-app-pub-8854680295966508/9223012145',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0
    });

  } catch (error) {
    mostrarEstado(
      'ERROR ADMOB: ' +
      (error?.code ?? '') + ' ' +
      (error?.message ?? String(error))
    );
  }
}

window.addEventListener('DOMContentLoaded', iniciarAnuncios);
