import "../home.scss";
const ExploreButton = () => {
    return (
        <div>
            <div className="about_exp">
                <a className="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank">
                    <span className="icon_exp"></span>
                </a>
                <a className="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank">
                    <span className="icon_exp"></span>
                </a>
                <a className="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank">
                    <span className="icon_exp"></span>
                </a>
                <a className="bg_links logo"></a>
            </div>

            <div className="button_exp">

                <a className="link_exp">Explore</a>

            </div>
        </div>
    )
}
export default ExploreButton;