import Image from "next/image";

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__glow" />
      <div className="loading-screen__card">
        <div className="loading-screen__logo-wrap">
          <Image
            src="/images/logo.png"
            alt="BEST BOUTONS logo"
            fill
            priority
            sizes="140px"
            className="object-contain"
          />
        </div>
        <p className="loading-screen__brand">BEST BOUTONS</p>
        <p className="loading-screen__subtitle">Preparation de votre experience</p>
        <div className="loading-screen__bar">
          <span className="loading-screen__bar-fill" />
        </div>
      </div>
    </div>
  );
}
