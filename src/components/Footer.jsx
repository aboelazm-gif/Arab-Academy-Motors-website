import {Button} from '@chakra-ui/react';
import '../styles/footer.css';
import FooterModal from "./FooterModal.jsx"
import arrowR from '../assets/svg/right-arrow.svg';
import linkedinIcon from "../assets/svg/linkedin-icon.svg";
import instaIcon from "../assets/svg/instagram-icon.svg";
import facebookIcon from "../assets/svg/facebook-icon.svg";
import tiktokIcon from "../assets/svg/tiktok-icon.svg";
const Footer = () => {
  return (
    <footer className="footer">
        <p className='footer-title'>© 2025 Arab Academy Motors. All rights reserved.</p>
        <ul className='footer-list'>
            <FooterModal trigger={
              <li>
                <div className="faq f-list-item">FAQ</div>
                <img className='arrow-r' src={arrowR} alt="" />
              </li>}
              headertitle={"Frequently Asked Questions"}
              content={
              <>
                <h4 className='Q'>What year of study should I be in to join?</h4>
                  <p className='A'>While we tend to prefer younger students, year 1 to 3 range, we do not restrict older students from joining</p>
                  <h4 className='Q'>Is it only for mechanical students?</h4>
                  <p className='A'>Not at all, we welcome all students from all faculties, however engineering is preffered for mechanical sub-teams</p>
                  <h4 className='Q'>Where have you competed before?</h4>
                  <p className='A'>Italy and UK</p>
                  <h4 className='Q'>Are there any prerequisites?</h4>
                  <p className='A'>Nope. Just basic physics and a passion for innovating</p>
                  <h4 className='Q'>How can I register?</h4>
                  <p className='A'>From the Join Us tab on the top of the page</p>
                  <h4 className='Q'>Where can I find you?</h4>
                  <p className='A'>Lab G003,Building G, Abou Keer campus</p>
              </>}
              />
              <FooterModal
              trigger={<li><div className="socials f-list-item">Socials</div><img className='arrow-r' src={arrowR} alt="" /></li>}
              headertitle={"Socials"}
              content={<>
                <ul className='socials-list'>
                  <a href="https://www.linkedin.com/company/arab-academy-motors/" target="_blank" rel="noopener noreferrer">
                    <li><img src={linkedinIcon} alt="linkedin-icon"/>LinkedIn</li>
                  </a>
                  <a href="https://www.instagram.com/arabacademymotors_racingteam/" target="_blank" rel="noopener noreferrer">
                    <li><img src={instaIcon} alt="instagram-icon"/>Instagram</li>
                  </a>
                  <a href="https://www.facebook.com/AAM.FSAE" target="_blank" rel="noopener noreferrer">
                    <li><img src={facebookIcon} alt="facebook-icon"/>Facebook</li>
                  </a>
                  <a href="https://www.tiktok.com/@aam_fs" target="_blank" rel="noopener noreferrer">
                    <li><img src={tiktokIcon} alt="tiktok-icon"/>TikTok</li>
                  </a>
                </ul>
              </>}
              />
            <Button 
            variant="unstyled" 
            maxW="100vw"
            margin={0}
            padding={0}
            border={0} 
            backgroundColor="transparent"
            >
            <a href="mailto:AAMRACINGTEAM@aast.edu" target='_blank'><li><div className="contact-us f-list-item">Contact us</div><img className='arrow-r' src={arrowR} alt="" /></li></a>  
            </Button>
            
        </ul>           
    </footer>
  )
}
export default Footer;