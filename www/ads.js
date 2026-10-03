import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents
} from '@capacitor-community/admob';

async function iniciarAnuncios() {
  const estado = document.getElementById('adBottom');

  try {
    await AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      if (estado) estado.textContent = 'BANNER CARGADO';
    });

    await AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
      if (estado) estado.textContent = 'ERROR ADMOB: ' + JSON.stringify(error);
    });

    await AdMob.initialize();

    await AdMob.showBanner({
      adId: 'ca-app-pub-3940256099942544/6300978111',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0
    });

  } catch (error) {
    if (estado) estado.textContent = 'ERROR ADMOB: ' + JSON.stringify(error);
  }
}

window.addEventListener('DOMContentLoaded', iniciarAnuncios);
