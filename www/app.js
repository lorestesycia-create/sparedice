import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

const P={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
let count=2,rolling=false,vals=[1,1];
const dice=document.querySelector('#dice');

function draw(){
  dice.innerHTML=vals.map(v=>`<div class="die ${rolling?'rolling':''}">${[0,1,2,3,4,5,6,7,8].map(i=>`<span class="${P[v].includes(i)?'pip':'empty'}"></span>`).join('')}</div>`).join('')
}

function roll(){
  if(rolling)return;
  rolling=true;
  let n=0;
  let id=setInterval(()=>{
    vals=Array.from({length:count},()=>1+Math.floor(Math.random()*6));
    draw();
    if(++n===7){
      clearInterval(id);
      rolling=false;
      draw()
    }
  },70)
}

document.querySelector('#table').onclick=roll;

for(const [id,n] of [['one',1],['two',2]]){
  document.querySelector('#'+id).onclick=e=>{
    e.stopPropagation();
    count=n;
    vals=Array(n).fill(1);
    document.querySelector('#one').classList.toggle('active',n===1);
    document.querySelector('#two').classList.toggle('active',n===2);
    draw()
  }
}

draw();

async function iniciarAnuncios(){
  await AdMob.initialize();

  await AdMob.showBanner({
    adId: 'ca-app-pub-8854680295966508/9223012145',
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0
  });
}

iniciarAnuncios().catch(console.error);
