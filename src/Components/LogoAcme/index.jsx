import Logo from "../../../public/ACME_Logo.png";

export default function LogoAcme(props) {
    return (
        <img 
            {...props}
            src={Logo} 
            alt="ACME Logo" 
            width="50" 
            height="50" 
            style={{ maxWidth: "100%", height: "auto", marginRight: "10px" }}
        />
    );
}
