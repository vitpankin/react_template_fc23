import logoImage from "./logo.svg";
import "./Header.scss";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

function Header() {
  const comp = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          repeat: -1,
          defaults: { duration: 1, ease: "power1.inOut" },
        })
        .to(logo.current, { rotateX: 40, rotateY: -180, rotateZ: 10 })
        .to(logo.current, { rotateX: -30, rotateY: 50, rotateZ: -50 })
        .to(logo.current, { rotateX: 90, rotateY: -270, rotateZ: 0 })
        .to(logo.current, { rotateX: -10, rotateY: -160 })
        .to(logo.current, { rotateX: 140, rotateY: -310, rotateZ: 40 })
        .to(logo.current, { rotateX: 0, rotateY: -360, rotateZ: 0 });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <header className="header" ref={comp}>
      <div className="logo" ref={logo}>
        <img src={logoImage} alt="logo" className="front" />
        <img src={logoImage} alt="logo" className="back" />
        <div className="side left"></div>
        <div className="side right"></div>
        <div className="side top"></div>
        <div className="side bottom"></div>
      </div>
    </header>
  );
}

export default Header;
