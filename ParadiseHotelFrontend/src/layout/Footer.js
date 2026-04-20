import { NavLink } from "react-router-dom";
import "../App.css";

const Footer = () => {
    return (<footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <strong>NovaPets</strong><br/>
        <span>Adoption support, shelter partners, and happy endings.</span>
      </div>

      <div class="footer-links" aria-label="Footer links">
        <a href="index.html">Home</a>
        <a href="about.html">How it works</a>
        <a href="pets.html">Pets</a>
        <a href="contact.html">Contact</a>
      </div>

      <div>
        <span>© 2026 NovaPets</span>
      </div>
    </div>
  </footer>)
}

export default Footer;