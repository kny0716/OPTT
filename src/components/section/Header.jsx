import Menu from "../header/Menu";

const Header = ({ openModal }) => {
  return (
    <div id="header" role="banner">
      <Menu openModal={openModal} />
    </div>
  );
};

export default Header;
