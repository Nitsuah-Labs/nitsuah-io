// FIXME : Spline doesnt load? SSR? 

import dynamic from 'next/dynamic';
// import Spline from '@splinetool/react-spline';
const SplineComponent = dynamic(() => import('@splinetool/react-spline'), {ssr: false, loading: () => <p>Loading...</p>});

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/I53VLJ6OCdGVN8lr/scene.splinecode`;

export function SplineScene() {

return (
  <SplineComponent scene={SPLINE_SCENE} />
    );
}