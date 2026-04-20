import { NavLink } from "react-router-dom";
import "../App.css"

const Header = () => {
    return (
        <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="NovaPets home">
        <span class="brand-badge" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M12 2l8.5 4.8v10.4L12 22l-8.5-4.8V6.8L12 2z" stroke="white" stroke-width="1.8" opacity="0.95"/>
  <path d="M7.4 8.8L12 6.2l4.6 2.6v6.4L12 17.8l-4.6-2.6V8.8z" fill="white" opacity="0.22"/>
  <path d="M9.2 12h5.6" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M12 9.2v5.6" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
</svg>
        </span>
        <span>NovaPets</span>
      </a>

      <nav class="nav" aria-label="Primary">
          <a href="index.html" class="active">Home</a>
          <a href="about.html" class="">How it works</a>
          <a href="pets.html" class="">Pets</a>
          <a href="contact.html" class="">Contact</a>
      </nav>

      <div class="header-cta">
        <a class="btn" href="pets.html">Browse pets</a>
        <a class="btn primary" href="contact.html">Adoption help</a>
      </div>
    </div>
  </header>
    )
}

export default Header;